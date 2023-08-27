import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


interface CardProps{
    name: string;
    description: string;
}
export default function OutlinedCard(props: CardProps) {
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
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
