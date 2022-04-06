import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const WidgetCard: FC = ({children}) => {
  return (
    <Card sx={{
      minWidth: 345,
      maxHeight: 610,
      overflowY: 'scroll',
      "::-webkit-scrollbar": {display: "none", scrollbarWidth: 'none'}
    }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title="Feedback"
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
