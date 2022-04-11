import React, {useEffect} from 'react';

import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {ProgressBarType} from "../../types";

export const CircularProgressBar = ({currentProgress, maxValue}: ProgressBarType) => {
  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    if (maxValue < 1) {
      setProgress(0);
    } else {
      setProgress((100 / maxValue) * currentProgress);
    }
  }, [currentProgress]);

  return <CircularProgressWithLabel value={progress}/>;
};

const progressColorStyle = (progress: number) => {
  if (progress < 40) return 'error';
  if (progress < 70) return 'warning';
  return 'success';
}

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number },) => {
  return (
    <Box sx={{
      position: 'relative',
      display: 'inline-flex',
      width: '100%',
      justifyContent: 'center',
    }}>
      <CircularProgress
        data-testid='circular-progress'
        variant="determinate" {...props}
        size={200}
        color={progressColorStyle(props.value)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{fontSize: 25}}
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

