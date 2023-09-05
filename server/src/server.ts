import express, {Request, Response} from 'express';
import cors from 'cors';
import {Board, Column, Task, SubTask, FrontEndBoard, FrontEndColumn, FrontEndTask, FrontEndSubTask} from "../../kanbanTypes";

function getDeepCopy(arg: any){
  return JSON.parse(JSON.stringify(arg));
}

const app = express();
const PORT = 3001;
app.use(cors());

let boardsFromBackend: (Board | null)[] = [{name: "Sobriety", id: 0, nextColumnId: 0, columns: [null, {name: "opportunity", id: 0, nextTaskId: 0, tasks: [{title: "Look for clubs", description: "idk", id: 0, nextSubTaskId: 0, subTasks: []}]}]}, null, {name: "Toronto", id: 0, nextColumnId: 0, columns: [null, {name: "Be Better", id: 0, nextTaskId: 0, tasks: [{title: "Look for clubs", description: "idk", id: 0, nextSubTaskId: 0, subTasks: []}]}]}];

app.get('/getBoards', (req: Request, res: Response) => {
  let filteredBoards: FrontEndBoard[] = [];
  //filter out null boards, columns, tasks, subtasks for frontend
  for (let i = 0; i < boardsFromBackend.length; i++){
    if (boardsFromBackend[i]){
      let currBoard = getDeepCopy(boardsFromBackend[i]);
      let filteredColumns : FrontEndColumn[] = [];
      for (let j = 0; j < boardsFromBackend[i]!.columns.length; j++){
        if (boardsFromBackend[i]!.columns[j]){
          let currColumn = getDeepCopy(boardsFromBackend[i]!.columns[j]);
          let filteredTasks : FrontEndTask[] = [];
          for (let k = 0; k < boardsFromBackend[i]!.columns[j]!.tasks.length; k++){
            if (boardsFromBackend[i]!.columns[j]!.tasks[k]){
              let currTask = getDeepCopy(boardsFromBackend[i]!.columns[j]!.tasks[k]);
              let filteredSubTasks = currTask.subTasks.filter((s: FrontEndSubTask) => s !== null);
              currTask.subTasks = filteredSubTasks;
              filteredTasks.push(currTask);
            }
          }
          currColumn.tasks = filteredTasks;
          filteredColumns.push(currColumn);
        }
      }
      currBoard.columns = filteredColumns;
      filteredBoards.push(currBoard);
    }
  }
  res.status(200).json({ boards: filteredBoards });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});