import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FrontEndSubTask } from "../../kanbanTypes";


interface CardProps{
    name: string;
    description: string;
    id: number;
    subTasks: FrontEndSubTask[];
}
export default function OutlinedCard(props: CardProps) {
  const countOccurrences = (arr: FrontEndSubTask[]) => arr.reduce((a, v) => (v.isCompleted === true ? a + 1 : a), 0);
  let numCompleted: number  = countOccurrences(props.subTasks);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography variant="body2">
              {props.description}
              <br />
            </Typography>
            <Typography variant="body2">
              {numCompleted} of {props.subTasks.length} completed
              <br />
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
