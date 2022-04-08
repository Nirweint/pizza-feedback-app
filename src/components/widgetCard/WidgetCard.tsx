import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type WidgetCardPropsType = {
  title: string
}

export const WidgetCard: FC<WidgetCardPropsType> = ({children, title}) => {
  return (
    <Card sx={{
      minWidth: 345,
      maxHeight: 610,
      overflowY: 'scroll',
      "::-webkit-scrollbar": {display: "none", scrollbarWidth: 'none'},
      marginBottom: '20px',
    }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={title}
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
