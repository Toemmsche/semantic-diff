import QueryPlanResult from '../model/meta/QueryPlanResult';
import { MatchPipeline } from '../../semantic-diff/match/MatchPipeline';
import { defaultDiffOptions, PlanNodeBrowserSerDes } from '../../semantic-diff/index';
import { QP_GRAMMAR } from '../model/meta/QpGrammar';
import { Comparator } from '../../semantic-diff/compare/Comparator';
import { DagEdgeTreatment } from './ParameterStore';
import { treatDagEdges } from '../components/QueryPlanDiff';

export default function computeSimilarity(
  queryPlanResults: QueryPlanResult[],
  dagEdgeTreatment: DagEdgeTreatment
): void {
  console.time('compute_sim');

  // compute similarities
  [...new Set(queryPlanResults.map((qpr) => qpr.query))].forEach((query) => {
    const qprs = queryPlanResults.filter((qpr) => qpr.query === query);

    qprs.forEach((qpr) => (qpr.similarity = new Map()));

    // compute similarity
    qprs.forEach((first, i) => {
      qprs.slice(i + 1).forEach((second) => {
        const planSerdes = new PlanNodeBrowserSerDes(QP_GRAMMAR, defaultDiffOptions);
        const plans = [first, second].map((qpr) => {
          const plan = planSerdes.transformParsedJsonObj(qpr.queryPlan);
          treatDagEdges(plan, dagEdgeTreatment);
          return plan;
        });

        // use semantic diff
        MatchPipeline.fromMode(defaultDiffOptions).execute(
          plans[0],
          plans[1],
          new Comparator(defaultDiffOptions)
        );

        // advanced similarity measure
        // compute commonality for all matched nodes and weight it by cardinality
        const cvs: number[] = [];
        const weights: number[] = [];

        // treat unmatched inners
        [
          ...plans[0].toPreOrderUnique(),
          ...plans[1].toPreOrderUnique()
        ].filter(n => !n.isMatched() && !n.isLeaf())
         .forEach(n => {
           let cardinality = n.data.exactCardinality;
           if (cardinality === 0) {
             cardinality = 1;
           }
           cvs.push(0);
           // use half the weight since unmatched nodes appear in both trees
           weights.push(Math.log2(cardinality) / 2);
         });

        // treat matched inners
        plans[0]
          .toPreOrderUnique()
          .filter((n) => n.isMatched() && !n.isLeaf())
          .forEach((n) => {
            let avgCardinality =
              (n.data.exactCardinality + n.getSingleMatch().data.exactCardinality) / 2;
            if (avgCardinality === 0) {
              avgCardinality = 1;
            }
            cvs.push(1);
            weights.push(Math.log2(avgCardinality)
            );
          });

        let similarity = new Comparator(defaultDiffOptions).weightedAverage(
          cvs,
          weights,
          1
        );
        first.similarity.set(second, similarity);
        second.similarity.set(first, similarity);
      });
    });
  });

  console.timeEnd('compute_sim');
}
