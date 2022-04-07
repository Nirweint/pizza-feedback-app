import React, {ReactElement, useState} from 'react';
import {FeedbackWidget} from "../../components/feedBack/FeedbackWidget";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {WidgetCard} from "../../components/widgetCard/WidgetCard";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {FeedbackProgressWidget} from "../../components/feedbackProgressWidget/FeedbackProgressWidget";

type WidgetType = {
  id: string;
  component: ReactElement;
  title: string;
}

const widgetsData: WidgetType[] = [{
  id: '1',
  component: <FeedbackWidget/>,
  title: 'Feedback'
}, {
  id: '2',
  component: <FeedbackProgressWidget/>,
  title: 'Feedback process',
}];

export const Dashboard = () => {

  const [widgets, setWidgets] = useState<WidgetType[]>(widgetsData)

  const handleOnDragEnd = (result: DropResult) => {
    if (result.destination) {
      const items = Array.from(widgets);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setWidgets(items)
    }
  }

  return (
    <>
      <Grid container p={2}>
        <Typography variant="h3">Dashboard</Typography>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='widgets'>
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