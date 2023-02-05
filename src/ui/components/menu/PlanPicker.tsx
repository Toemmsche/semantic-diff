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
import { useAllLabels, useQueryPlanState, useUniqueDbms } from '../../state/QueryPlanResultStore';
import { Nullable } from '../../../semantic-diff/Types';
import { DBMS } from '../../model/meta/DBMS';
import { max, scaleLinear as d3ScaleLinear } from 'd3';
import { Subject } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import { ComparisonMetric } from '../../state/BenchmarkResult';

export interface IQueryPlanResultDiffProps {}

// Color scales for results that are better / worse
const betterColorScale = d3ScaleLinear<string>().domain([1, 0]).range(['#00bb00', '#808080']); // green
const worseColorScale = d3ScaleLinear<string>().domain([0, 1]).range(['#808080', '#ff0000']); //red

export default function PlanPicker(props: IQueryPlanResultDiffProps) {
  const [baselineDbms, setBaseLineDbms] = useState(DBMS.Umbra as Nullable<DBMS>);
  const [selectedMetric, setSelectedMetric] = useState('total' as ComparisonMetric);
  const [selectedQuery, setSelectedQuery] = useState('8.sql' as Nullable<string>);
  const [compDbms, setCompDbms] = useState(DBMS.Hyper as Nullable<DBMS>);
  const [state, actions] = useQueryPlanState();

  useEffect(() => {
    if (baselineDbms && selectedQuery && compDbms) {
      const firstPlanResult = state.queryPlanResults.find(
        (qpr) => qpr.dbms === baselineDbms && qpr.queryName === selectedQuery
      )!;
      const secondPlanResult = state.queryPlanResults.find(
        (qpr) => qpr.dbms === compDbms && qpr.queryName === selectedQuery
      )!;
      actions.setResultSelection([firstPlanResult, secondPlanResult]);
    } else {
      actions.setResultSelection(null);
    }
  }, [baselineDbms, selectedQuery, compDbms]);

  function resetBaseline(newBaseline: DBMS) {
    setSelectedQuery(null);
    setCompDbms(null);
    setBaseLineDbms(newBaseline);
  }

  // Labels
  const [allLabels] = useAllLabels();

  // dbms
  const [availableDbms] = useUniqueDbms();

  const qprForSelectedQuery = state.queryPlanResults.filter(
    (qpr) => qpr.queryName === selectedQuery
  );

  const baseLineQprForSelectedQuery = state.queryPlanResults.find(
    (qpr) => qpr.queryName === selectedQuery && qpr.dbms === baselineDbms
  );

  const QueriesSet = new Set(state.queryPlanResults.map((qpr) => qpr.queryName));
  const uniqueQueries = Array.from(QueriesSet.entries()).map((val) => val[1]);

  const worstResultsPerQuery = uniqueQueries
    .map((query) => ({
      query,
      baseLineResult: state.queryPlanResults.find(
        (qpr) => qpr.dbms === baselineDbms && qpr.queryName === query
      )!,
      otherResults: state.queryPlanResults.filter((qpr) => {
        return qpr.dbms !== baselineDbms && qpr.queryName === query;
      })
    }))
    .map((obj) => ({
      ...obj,
      worstDiff: max(
        obj.otherResults
          .map((qpr) => {
            if (
              !qpr.benchmarkResult[selectedMetric] ||
              !obj.baseLineResult.benchmarkResult[selectedMetric]
            ) {
              return null;
            } else {
              // null case has been checked
              const baseLineMetric = obj.baseLineResult.benchmarkResult[selectedMetric]!;
              const otherMetric = qpr.benchmarkResult[selectedMetric]!;

              return baseLineMetric / otherMetric - 1;
            }
          })
          .filter((r) => r != null) as number[]
      )!
    }))
    // sort descending by diff
    .sort((a, b) => b.worstDiff - a.worstDiff);

  const worstOverallDiff = worstResultsPerQuery[0].worstDiff;
  const bestOverallDiff = worstResultsPerQuery[worstResultsPerQuery.length - 1].worstDiff;

  function QueryComponent(props: {}) {
    const [editorOpen, setEditorOpen] = useState(false);

    const MetricItems = allLabels.map((metric) => {
      return <MenuItem value={metric}>{metric}</MenuItem>;
    });

    const QueryItems = worstResultsPerQuery.map((obj) => {
      const { query, worstDiff } = obj;

      // if worstOtherDbmsResult is negative, then our time is
      // increased in comparison
      let label = query;
      let color: any = 'black';
      if (worstDiff != null) {
        label += ' (' + (worstDiff < 0 ? '' : '+') + (worstDiff * 100).toFixed(0) + '%)';
        color =
          worstDiff < 0
            ? betterColorScale(worstDiff / bestOverallDiff)
            : worseColorScale(worstDiff / worstOverallDiff);
      }
      return (
        <MenuItem value={query}>
          <Box color={color}>{label}</Box>
        </MenuItem>
      );
    });

    return (
      <Stack direction="row">
        <FormControl>
          <InputLabel>Metric</InputLabel>
          <Select
            label="Metric"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as ComparisonMetric)}>
            {MetricItems}
          </Select>
        </FormControl>
        <Stack direction="row" alignItems="center">
          <FormControl>
            <InputLabel>Query</InputLabel>
            <Select
              label="Query"
              value={selectedQuery}
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
                    width="100vh"
                    defaultLanguage="sql"
                    defaultValue={baseLineQprForSelectedQuery?.queryText}
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

    const BaselineItems = availableDbms.map((dbms) => {
      return <MenuItem value={dbms}>{dbms}</MenuItem>;
    });

    return (
      <FormControl>
        <InputLabel>Baseline</InputLabel>
        <Select
          label="Baseline"
          value={baselineDbms}
          onChange={(e) => setBaseLineDbms(e.target.value as DBMS)}>
          {BaselineItems}
        </Select>
      </FormControl>
    );
  }

  function CompComponent(props: {}) {
    const CompCandidateItems = qprForSelectedQuery
      .filter((qpr) => qpr != baseLineQprForSelectedQuery)
      .map((qpr) => {
        const dbms = qpr.dbms;

        let addLabel = '(N/A)';
        if (
          baseLineQprForSelectedQuery?.benchmarkResult[selectedMetric] &&
          qpr.benchmarkResult[selectedMetric]
        ) {
          const diff =
            baseLineQprForSelectedQuery.benchmarkResult[selectedMetric]! /
              qpr.benchmarkResult[selectedMetric]! -
            1;
          addLabel = '(' + (diff < 0 ? '' : '+') + (diff * 100).toFixed(0) + '%)';
          const color =
            diff < 0
              ? betterColorScale(diff / bestOverallDiff)
              : worseColorScale(diff / worstOverallDiff);
        }

        return (
          <Chip
            key={dbms}
            color={dbms === compDbms ? 'primary' : 'default'}
            sx={{
              borderRadius: '16px'
            }}
            label={dbms + ' ' + addLabel}
            onClick={() => setCompDbms(dbms)}></Chip>
        );
      });

    return (
      <Stack key="second" direction="row" alignItems="center" spacing={2}>
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
