import { readFileSync, writeFileSync } from 'fs';
import PlanNodeSerDes from '../semantic-diff/io/impl/PlanNodeSerDes';
import { defaultDiffOptions } from '../semantic-diff/index';
import { QP_GRAMMAR } from '../ui/model/meta/QpGrammar';
import { DagEdgeTreatment } from '../ui/state/Parameters';
import BenchmarkResult, { compareAgainstBaseline } from '../ui/model/meta/BenchmarkResult';
import computeSimilarity, { cmm } from '../ui/util';

const serdes = new PlanNodeSerDes(QP_GRAMMAR, defaultDiffOptions);

const definitions = [
  [
    'test/qpr/batch_plans_tpchSf10.json',
    'umbra [2023-01-13]',
    'hyper',
    'execution',
    'tpchSf10 - 6.sql',
    'umbra_tpch_hyper_esc.csv'
  ],
  [
    'test/qpr/batch_plans_tpchSf10.json',
    'umbra [2023-01-13]',
    'umbra [2022-11-03]',
    'execution',
    'tpchSf10 - 17.sql',
    'umbra_tpch_umbra_esc.csv'
  ]
] as [string, string, string, keyof BenchmarkResult, string, string][];

for (const [file, baseline, comp, metric, specialQuery, resultFile] of definitions) {
  const qprRaw = readFileSync(file).toString();
  const qprs = serdes.queryPlanResultCollectionFromJson(qprRaw);
  const allQueries = [...new Set(qprs.map((qpr) => qpr.query))];

  computeSimilarity(qprs, DagEdgeTreatment.COPY_SUBTREE);

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
      compQpr.benchmarkResult[metric] as number,
      baselineQpr.benchmarkResult[metric] as number
    );
    const costSimAct =
      (Math.min(baseCostAct, compCostAct) + 1) / (Math.max(baseCostAct, compCostAct) + 1);
    const costSimEst =
      (Math.min(baseCostEst, compCostEst) + 1) / (Math.max(baseCostEst, compCostEst) + 1);
    const planSim = compQpr.similarity.get(baselineQpr);

    lines.push(
      [
        query === specialQuery ? 'special' : totalDiff > 0 ? 'speedup' : 'slowdown',
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
