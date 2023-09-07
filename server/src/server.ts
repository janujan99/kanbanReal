import express, {Request, Response} from 'express';
import cors from 'cors';
import {Board, Column, Task, SubTask, FrontEndBoard, FrontEndColumn, FrontEndTask, FrontEndSubTask} from "../../kanbanTypes";

function getDeepCopy(arg: any){
  return JSON.parse(JSON.stringify(arg));
}

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

let boardsFromBackend: (Board | null)[] = [];
let nextBoardId: number = 0;
app.get('/getBoards', (req: Request, res: Response) => {
  let filteredBoards: FrontEndBoard[] = [];
  //filter out null boards, columns, tasks, subtasks for frontend
  for (let i = 0; i < boardsFromBackend.length; i++){
    if (boardsFromBackend[i]){
      let currBoard = getDeepCopy(boardsFromBackend[i]);
      let filteredColumns : FrontEndColumn[] = [];
      for (let j = 0; boardsFromBackend[i]!.columns && j < boardsFromBackend[i]!.columns.length; j++){
        if (boardsFromBackend[i]!.columns[j]){
          let currColumn = getDeepCopy(boardsFromBackend[i]!.columns[j]);
          let filteredTasks : FrontEndTask[] = [];
          for (let k = 0; boardsFromBackend[i]!.columns[j]!.tasks && k < boardsFromBackend[i]!.columns[j]!.tasks.length; k++){
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

app.post('/addBoard', (req: Request, res: Response) => {
  console.log("Board ID: " + nextBoardId.toString());
  console.log(req.body);
  let cols: Column[] = req.body.columns.map((colName: string, index: number) => {return {name: colName, id: index, nextTaskId: 0, tasks: []}});
  let newBoard: Board = {name: req.body.name, id: nextBoardId, nextColumnId: 0, columns: cols}
  boardsFromBackend.push(newBoard);
  // Process the received data (you can add your own logic here)
  nextBoardId += 1;
  console.log(boardsFromBackend);
  res.status(200).send({id: nextBoardId-1});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});