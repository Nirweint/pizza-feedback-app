import React, {ReactElement, useState} from 'react';

import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {FeedbackWidget} from "../../components/feedBack/FeedbackWidget";
import {PaymentsWidget} from "../../components/feedBack/payments/PaymentsWidget";
import {FeedbackProgressWidget} from "../../components/feedbackProgressWidget/FeedbackProgressWidget";
import {WidgetCard} from "../../components/widgetCard/WidgetCard";

type WidgetType = {
  id: string;
  component: ReactElement;
  title: string;
}

const feedbackWidgetTitle = 'Feedback';
const feedbackProgressWidgetTitle = 'Feedback process';
const paymentsWidgetTitle = 'Payments table';

const widgetsData: WidgetType[] = [{
  id: '1',
  component: <FeedbackWidget/>,
  title: feedbackWidgetTitle,
}, {
  id: '2',
  component: <FeedbackProgressWidget/>,
  title: feedbackProgressWidgetTitle,
},
  {
    id: '3',
    component: <PaymentsWidget/>,
    title: paymentsWidgetTitle,
  },
];

export const Dashboard = () => {

  const [widgets, setWidgets] = useState<WidgetType[]>(widgetsData)

  const handleOnDragEnd = (result: DropResult) => {
    if (result.destination) {
      const items = [...widgets];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setWidgets(items)
    }
  }

  return (
    <>
      <Grid container p={2}>
        <Typography variant="h3">Dashboard</Typography>
        <Grid container>
        </Grid>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='widgets' direction='horizontal'>
            {(provided): JSX.Element => (
              <Grid container {...provided.droppableProps} ref={provided.innerRef}>
                {widgets.map(({id, component, title}, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided): JSX.Element => (
                      <Grid item
                            marginRight={2} {...provided.draggableProps} {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                        <WidgetCard title={title}>
                          {component}
                        </WidgetCard>
                      </Grid>
                    )}
                  </Draggable>
                ))
                }
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </>
  );
};