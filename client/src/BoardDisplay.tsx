import React from "react";
import TaskCard from "./TaskCard";
import useStore from "./store";
import { FrontEndColumn, FrontEndTask } from "../../kanbanTypes";

export default function BoardDisplay() {
  const store = useStore();
  console.log(store.boards);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {store.boards[store.currBoard].columns.map((col: FrontEndColumn) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{col.name}</h2>
          {col.tasks.map((task: FrontEndTask) => (
            <TaskCard
              name={task.title}
              description={task.description}
              id={task!.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
