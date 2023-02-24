import { readFileSync, writeFileSync } from 'fs';
import PlanNodeSerDes from '../semantic-diff/io/impl/PlanNodeSerDes';
import { defaultDiffOptions } from '../semantic-diff/index';
import { QP_GRAMMAR } from '../ui/model/meta/QpGrammar';
import computeSimilarity, { cmm, SimilarityMetric } from '../ui/state/ComputeSimilarity';
import { DagEdgeTreatment } from '../ui/state/Parameters';
import { compareAgainstBaseline } from '../ui/model/meta/BenchmarkResult';

const serdes = new PlanNodeSerDes(QP_GRAMMAR, defaultDiffOptions);

const definitions = [
  [
    'test/qpr/batch_plans_tpchSf10.json',
    'umbra [2023-01-13]',
    'hyper',
    SimilarityMetric.EDIT_SCRIPT_COST,
    'umbra_tpch_hyper_esc.csv'
  ],
  [
    'test/qpr/batch_plans_tpchSf10.json',
    'umbra [2023-01-13]',
    'hyper',
    SimilarityMetric.MATCH_ONLY,
    'umbra_tpch_hyper_mo.csv'
  ],
  [
    'test/qpr/batch_plans_tpchSf10.json',
    'umbra [2023-01-13]',
    'umbra [2022-11-03]',
    SimilarityMetric.EDIT_SCRIPT_COST,
    'umbra_tpch_umbra_esc.csv'
  ],
  [
    'test/qpr/batch_plans_tpcdsSf10.json',
    'umbra [2023-01-13]',
    'umbra [2022-11-03]',
    SimilarityMetric.EDIT_SCRIPT_COST,
    'umbra_tpcds_umbra_esc.csv'
  ],
  [
    'test/qpr/batch_plans_tpcdsSf10.json',
    'umbra [2023-01-13]',
    'duck',
    SimilarityMetric.EDIT_SCRIPT_COST,
    'umbra_tpcds_duck_esc.csv'
  ]
] as [string, string, string, SimilarityMetric, string][];

for (const [file, baseline, comp, similarityMetric, resultFile] of definitions) {
  const qprRaw = readFileSync(file).toString();
  const qprs = serdes.queryPlanResultCollectionFromJson(qprRaw);
  const allQueries = [...new Set(qprs.map((qpr) => qpr.query))];

  computeSimilarity(qprs, DagEdgeTreatment.COPY_SUBTREE, similarityMetric);

  const lines = [];
  lines.push('label,totalDiff,planSim,costSimAct,mul,costSimEst');
  for (const query of allQueries) {
    const compQpr = qprs.find((qpr) => qpr.query === query && qpr.system === comp);
    const baselineQpr = qprs.find((qpr) => qpr.query === query && qpr.system === baseline);

    if (!compQpr || !baselineQpr) {
      console.warn('missing qpr for query ' + query);
      continue;
    }

    const basePlan = serdes.transformParsedJsonObj(baselineQpr.queryPlan);
    const compPlan = serdes.transformParsedJsonObj(compQpr.queryPlan);

    const baseCostAct = cmm(basePlan, false);
    const compCostAct = cmm(compPlan, false);

    const baseCostEst = cmm(basePlan, false, true);
    const compCostEst = cmm(compPlan, false, true);

    const totalDiff = compareAgainstBaseline(
      compQpr.benchmarkResult.total,
      baselineQpr.benchmarkResult.total
    );
    const costSimAct =
      (Math.min(baseCostAct, compCostAct) + 1) / (Math.max(baseCostAct, compCostAct) + 1);
    const costSimEst =
      (Math.min(baseCostEst, compCostEst) + 1) / (Math.max(baseCostEst, compCostEst) + 1);
    const planSim = compQpr.similarity.get(baselineQpr);

    lines.push(
      [
        totalDiff > 0 ? 'speedup' : 'slowdown',
        totalDiff,
        planSim,
        costSimAct,
        planSim! * costSimAct,
        costSimEst
      ].join(',')
    );
  }
  writeFileSync(resultFile, lines.join('\n'));
}
