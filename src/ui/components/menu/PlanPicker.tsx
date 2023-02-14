import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack
} from '@mui/material';
import {
  useAllLabels,
  useQueryPlanState,
  useUniqueSystems
} from '../../state/QueryPlanResultStore';
import { Nullable } from '../../../semantic-diff/Types';
import { Query, System } from '../../model/meta/types';
import { scaleLinear as d3ScaleLinear } from 'd3';
import { Subject } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import { ComparisonMetric } from '../../model/meta/BenchmarkResult';
import { useNwayDiff } from '../../state/ParameterStore';
import QueryPlanResult from '../../model/meta/QueryPlanResult';

export interface IQueryPlanResultDiffProps {}

// Color scales for results that are better / worse
const betterColorScale = d3ScaleLinear<string>().domain([1, 0]).range(['#00bb00', '#808080']); // green
const worseColorScale = d3ScaleLinear<string>().domain([0, 1]).range(['#808080', '#ff0000']); //red
const similarityColorScale = d3ScaleLinear<string>().domain([0, 1]).range(['#000000', '#F6BE00']); // black to gold

export default function PlanPicker(props: IQueryPlanResultDiffProps) {
  const [baselineSystem, setBaselineSystem] = useState(undefined as Nullable<System>);
  const [selectedMetric, setSelectedMetric] = useState('total' as ComparisonMetric);
  const [selectedQuery, setSelectedQuery] = useState(undefined as Nullable<Query>);
  const [compSystem, setCompSystem] = useState([] as System[]);
  const [state, actions] = useQueryPlanState();
  const [nwayDiff] = useNwayDiff();
  const [allLabels] = useAllLabels();
  const [availableSystems] = useUniqueSystems();

  useEffect(() => {
    if (baselineSystem && selectedQuery) {
      actions.setResultSelection(
        availableSystems.map((system) =>
          [baselineSystem, ...compSystem].includes(system)
            ? state.queryPlanResults.find(
                (qpr) => qpr.system === system && qpr.query === selectedQuery
              )!
            : null
        )
      );
    } else {
      actions.setResultSelection([]);
    }
  }, [baselineSystem, selectedQuery, compSystem]);

  useEffect(() => {
    // reset selection if n-way diff is disabled
    if (!nwayDiff && compSystem.length > 0) {
      setCompSystem([]);
    }
  }, [nwayDiff]);

  const qprForSelectedQuery = state.queryPlanResults.filter((qpr) => qpr.query === selectedQuery);

  const baseLineQprForSelectedQuery = state.queryPlanResults.find(
    (qpr) => qpr.query === selectedQuery && qpr.system === baselineSystem
  );

  const QueriesSet = new Set(state.queryPlanResults.map((qpr) => qpr.query));
  const uniqueQueries = Array.from(QueriesSet.entries()).map((val) => val[1]);

  let worstOverallMetricDiff: Nullable<number> = null;
  let bestOverallMetricDiff: Nullable<number> = null;
  let otherResultsPerQuery: Map<
    Query,
    Map<QueryPlanResult, [Nullable<number>, number]>
  > = new Map();
  let worstResultsPerQuery: Map<Query, Nullable<[QueryPlanResult, number, number]>> = new Map();

  if (baselineSystem != null) {
    otherResultsPerQuery = new Map(
      uniqueQueries.map((query) => {
        const baselineResult = state.queryPlanResults.find((qpr) => {
          return qpr.system === baselineSystem && qpr.query === query;
        })!;

        const otherDiffAndSimilarity = new Map<QueryPlanResult, [Nullable<number>, number]>(
          state.queryPlanResults
            .filter((qpr) => {
              return qpr.system !== baselineSystem && qpr.query === query;
            })
            .map((qpr) => {
              let metricDiff;
              if (
                !qpr.benchmarkResult[selectedMetric] ||
                !baselineResult.benchmarkResult[selectedMetric]
              ) {
                metricDiff = null;
              } else {
                // null case has been checked
                const baseLineMetric = baselineResult.benchmarkResult[selectedMetric]!;
                const otherMetric = qpr.benchmarkResult[selectedMetric]!;

                metricDiff = baseLineMetric / otherMetric - 1;
              }

              const similarity = qpr.similarity.get(baselineResult)!;

              return [qpr, [metricDiff, similarity]];
            })
        );
        return [query, otherDiffAndSimilarity];
      })
    );

    worstResultsPerQuery = new Map(
      [...otherResultsPerQuery].map(([query, resultsMap]) => {
        const sortedResults = [...resultsMap]
          .filter(
            ([qpr, [metricDiff, similarity]]) =>
              metricDiff != null && (compSystem.length > 0 ? compSystem.includes(qpr.system) : true)
          )
          .sort(([qprA, [metricDiffA, similarityA]], [qprB, [metricDiffB, similarityB]]) => {
            // positive is bad
            return metricDiffB! - metricDiffA!;
          });

        let worstResult: Nullable<[QueryPlanResult, number, number]> = null;
        if (sortedResults.length > 0) {
          worstResult = sortedResults[0].flat() as [QueryPlanResult, number, number];
          if (!bestOverallMetricDiff || worstResult[1] < bestOverallMetricDiff) {
            bestOverallMetricDiff = worstResult[1];
          }
          if (!worstOverallMetricDiff || worstResult[1] > worstOverallMetricDiff) {
            worstOverallMetricDiff = worstResult[1];
          }
        }

        return [query, worstResult];
      })
    );
  }

  function QueryComponent(props: {}) {
    const [editorOpen, setEditorOpen] = useState(false);

    const MetricItems = allLabels.map((metric) => {
      return (
        <MenuItem key={metric} value={metric}>
          {metric}
        </MenuItem>
      );
    });

    const QueryItems = [...worstResultsPerQuery].map((entry) => {
      const [query, maybeWorstResult] = entry;

      // if worstOtherDbmsResult is negative, then our time is
      // increased in comparison
      let label = query;

      let additionalContent = [];
      if (maybeWorstResult) {
        const [worstQpr, worstDiff, similarity] = maybeWorstResult;

        const metricDiffSuffix =
          ' (' + (worstDiff < 0 ? '' : '+') + (worstDiff * 100).toFixed(0) + '%)';
        const metricColor =
          worstDiff < 0
            ? betterColorScale(worstDiff / bestOverallMetricDiff!)
            : worseColorScale(worstDiff / worstOverallMetricDiff!);
        additionalContent.push(<Box color={metricColor}>{metricDiffSuffix}</Box>);

        const similaritySuffix = '(' + (similarity * 100).toFixed(0) + '%)';
        const similarityColor = similarityColorScale(similarity);
        additionalContent.push(<Box color={similarityColor}>{similaritySuffix}</Box>);

        additionalContent.push(<Box color="blue">vs. {worstQpr.system}</Box>);
      }
      return (
        <MenuItem key={query} value={query}>
          <Stack direction="row" spacing={1}>
            <Box>{label}</Box>
            {additionalContent}
          </Stack>
        </MenuItem>
      );
    });

    return (
      <Stack direction="row">
        <FormControl>
          <InputLabel>Metric</InputLabel>
          <Select
            label="Metric"
            value={selectedMetric ?? ''}
            onChange={(e) => setSelectedMetric(e.target.value as ComparisonMetric)}>
            {MetricItems}
          </Select>
        </FormControl>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <InputLabel>Query</InputLabel>
            <Select
              label="Query"
              value={selectedQuery ?? ''}
              onChange={(e) => setSelectedQuery(e.target.value)}>
              {QueryItems}
            </Select>
          </FormControl>
          {selectedQuery != null && (
            <>
              <IconButton onClick={(event) => setEditorOpen(true)}>
                <Subject />
              </IconButton>
              <Modal
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                open={editorOpen}
                onClose={() => setEditorOpen(false)}>
                <Box padding={4} bgcolor="white">
                  <Editor
                    height="80vh"
                    width="70vw"
                    language="sql"
                    value={baseLineQprForSelectedQuery?.queryText}
                    options={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Modal>
            </>
          )}
        </Stack>
      </Stack>
    );
  }

  function BaselineComponent(props: {}) {
    const [anchorEl, setAnchorEl] = useState(null as Nullable<HTMLElement>);

    const BaselineItems = availableSystems.map((system) => {
      return (
        <MenuItem key={system} value={system}>
          {system}
        </MenuItem>
      );
    });

    function resetBaseline(newBaseline: System) {
      // keep query selected
      setCompSystem([]);
      setBaselineSystem(newBaseline);
    }

    return (
      <FormControl>
        <InputLabel>Baseline</InputLabel>
        <Select
          label="Baseline"
          value={baselineSystem ?? ''}
          onChange={(e) => resetBaseline(e.target.value as System)}>
          {BaselineItems}
        </Select>
      </FormControl>
    );
  }

  function CompComponent(props: {}) {
    const CompCandidateItems = qprForSelectedQuery
      .filter((qpr) => qpr != baseLineQprForSelectedQuery)
      .map((qpr) => {
        const system = qpr.system;

        function addOrRemoveComp(system: System) {
          if (compSystem.includes(system)) {
            compSystem.splice(compSystem.indexOf(system), 1);
            // ensure that object identity changes
            setCompSystem(compSystem.slice());
          } else if (compSystem.length == 0 || nwayDiff) {
            // only allow multi selection if n-way diff is enabled
            setCompSystem([...compSystem, system]);
          } else {
            // compbDbms.length === 1
            setCompSystem([system]);
          }
        }

        return (
          <Chip
            key={system}
            color={compSystem.includes(system) ? 'primary' : 'default'}
            sx={{
              borderRadius: '16px'
            }}
            label={system}
            onClick={() => addOrRemoveComp(system)}></Chip>
        );
      });

    return (
      <Stack
        maxWidth="25vw"
        key="second"
        direction="row"
        alignItems="center"
        gap={1}
        flexWrap="wrap">
        {CompCandidateItems}
      </Stack>
    );
  }

  return (
    <Stack key="first" direction="row" alignItems="center" spacing={2} height="100%">
      <Stack direction="column" height="100%" justifyContent="space-between">
        <Box textAlign="center">
          <h3>Baseline</h3>
        </Box>
        <BaselineComponent></BaselineComponent>
      </Stack>
      <Divider orientation="vertical"></Divider>
      <Stack direction="column" height="100%" justifyContent="space-between">
        <Box textAlign="center">
          <h3>Query</h3>
        </Box>
        <QueryComponent></QueryComponent>
      </Stack>
      <Divider orientation="vertical"></Divider>
      <Stack direction="column" height="100%">
        <Box textAlign="center">
          <h3>Comparison</h3>
        </Box>
        <CompComponent></CompComponent>
      </Stack>
    </Stack>
  );
}
