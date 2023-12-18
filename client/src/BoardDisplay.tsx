import React from "react";
import TaskCard from "./TaskCard";
import useStore from "./store";
import { FrontEndColumn, FrontEndTask } from "../../kanbanTypes";
import "./BoardDisplay.css";

export default function BoardDisplay() {
  const store = useStore();
  console.log(store.boards);
  console.log(store.currBoard);
  console.log(store.boards[store.currBoard]);
  if (store.boards[store.currBoard] !== undefined)
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        {store.boards[store.currBoard].columns.map((col: FrontEndColumn) => (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: 10 }}>
            <h2 className="columnHeader">{col.name}</h2>
            {col.tasks.map((task: FrontEndTask) => (
              <TaskCard
                task={task}
              />
            ))}
          </div>
        ))}
      </div>
    );
  return <div></div>;
}
