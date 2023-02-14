import PlanPicker from './PlanPicker';
import React, { useState } from 'react';
import QueryPlanDiffChart from './QueryPlanDiffChart';
import { Box, Collapse, Fab, Stack } from '@mui/material';
import ParamConfig from './ParamConfig';
import UploadCollection from './UploadCollection';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function FloatingMenu(props: {}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Fab
        variant="extended"
        style={{
          position: 'absolute',
          left: 10,
          bottom: 20
        }}
        onClick={() => setExpanded(!expanded)}>
        {expanded ? <ExpandMore /> : <ExpandLess />}
        {expanded ? 'Show Menu' : 'Hide Menu'}
      </Fab>
      <Collapse in={expanded} timeout={150}>
        <Stack direction="row" justifyContent="center" width="100vw">
          <Box
            width="100%"
            paddingTop={3}
            paddingBottom={3}
            style={{
              background:
                'linear-gradient(0deg, rgba(189,189,189,1) 0%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 95%, rgba(189,189,189,1) 100%)',
              boxShadow: '0px 0px 8px black',
              zIndex: 1000
            }}>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
              height="100%">
              <UploadCollection></UploadCollection>
              <PlanPicker></PlanPicker>
              <QueryPlanDiffChart></QueryPlanDiffChart>
              <ParamConfig></ParamConfig>
            </Stack>
          </Box>
        </Stack>
      </Collapse>
    </>
  );
}
