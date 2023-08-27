import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import OutlinedCard from "./Card";
const cols = ["col1", "col2", "col3"];

const tasks = [
  { id: 1, name: "Item 1", description: "Description for Item 1" },
  { id: 2, name: "Item 2", description: "Description for Item 2" },
  { id: 3, name: "Item 3", description: "Description for Item 3" },
];

const columns = [{ name: "col1", tasks: [] }];

export default function MyTable() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{cols[0]}</TableCell>
            <TableCell>{cols[1]}</TableCell>
            <TableCell>{cols[2]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <OutlinedCard
                  name={task.name}
                  description={task.description}
                ></OutlinedCard>
              </TableCell>
              <TableCell>
                <OutlinedCard
                  name={task.name}
                  description={task.description}
                ></OutlinedCard>
              </TableCell>
              <TableCell>
                <OutlinedCard
                  name={task.name}
                  description={task.description}
                ></OutlinedCard>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
