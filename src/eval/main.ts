import { readFileSync } from 'fs';
import PlanNodeSerDes from '../semantic-diff/io/impl/PlanNodeSerDes';
import { defaultDiffOptions } from '../semantic-diff/index';
import { QP_GRAMMAR } from '../ui/model/meta/QpGrammar';
import computeSimilarity from '../ui/state/ComputeSimilarity';
import { DagEdgeTreatment } from '../ui/state/Parameters';
import { compareAgainstBaseline } from '../ui/model/meta/BenchmarkResult';

const qprRaw = readFileSync('test/qpr/batch_plans_tpcdsSf10.json').toString();

const options = defaultDiffOptions;
const serdes = new PlanNodeSerDes(QP_GRAMMAR, options);

const qprs = serdes.queryPlanResultCollectionFromJson(qprRaw);
computeSimilarity(qprs, DagEdgeTreatment.COPY_SUBTREE);

const allQueries = [...new Set(qprs.map((qpr) => qpr.query))];

const baseline = 'umbra [2022-11-03]';
const comp = 'duck';
console.log('diff,sim');
for (const query of allQueries) {
  const compQpr = qprs.find((qpr) => qpr.query === query && qpr.system === comp);
  const baselineQpr = qprs.find((qpr) => qpr.query === query && qpr.system === baseline);
  if (!compQpr || !baselineQpr) {
    continue;
  }

  const diff = compareAgainstBaseline(
    compQpr.benchmarkResult.total,
    baselineQpr.benchmarkResult.total
  );

  const sim = compQpr.similarity.get(baselineQpr);

  console.log(diff + ',' + sim);
}
