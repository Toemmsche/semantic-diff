import React from 'react';
import { IconButton } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useQueryPlanState } from '../../state/QueryPlanResultStore';

export default function UploadCollection(props: {}) {
  const [qpr, qprActions] = useQueryPlanState();

  async function loadCollection(event: any) {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (progressEvent) => {
      // TODO validate input
      const text: string = progressEvent!.target!.result!.toString();
      qprActions.setQueryPlanResults(text);
    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        id="qpr-file-input"
        multiple
        type="file"
        onChange={loadCollection}
      />
      <label htmlFor="qpr-file-input">
        <IconButton component="span">
          <UploadFile
            sx={{
              fontSize: 60
            }}></UploadFile>
        </IconButton>
      </label>
    </>
  );
}
