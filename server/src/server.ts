import express, {Request, Response} from 'express';
import cors from 'cors';
import {Board, Column, Task, SubTask, FrontEndBoard, FrontEndColumn, FrontEndTask, FrontEndSubTask} from "../../kanbanTypes";

function getDeepCopy(arg: any){
  return JSON.parse(JSON.stringify(arg));
}
function getFilteredBoards(){
  let b = boardsFromBackend;
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
  return filteredBoards;
}
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors());

let boardsFromBackend: (Board | null)[] = [];
let nextBoardId: number = 0;
//Boards
app.get('/getBoards', (req: Request, res: Response) => {
  
  res.status(200).json({ boards: getFilteredBoards() });
});

app.post('/addBoard', (req: Request, res: Response) => {
  let cols: Column[] = req.body.columns.map((colName: string, index: number) => {return {name: colName, id: index, nextTaskId: 0, tasks: []}});
  let newBoard: Board = {name: req.body.name, id: nextBoardId, nextColumnId: cols.length, columns: cols};
  boardsFromBackend.push(newBoard);
  console.log(boardsFromBackend);
  // Process the received data (you can add your own logic here)
  nextBoardId += 1;
  //console.log(boardsFromBackend);
  let b = getFilteredBoards();
  let frontEndBoardIndex = -1;
  for (let i = 0; i < b.length; i++){
    if (b[i].id === nextBoardId-1) frontEndBoardIndex = i;
  }
  res.status(200).send({boardIndex: frontEndBoardIndex});
});

app.post('/editBoard', (req: Request, res: Response) => {
  let newBoard: Board = getDeepCopy(boardsFromBackend[req.body.id]);
  newBoard.name = req.body.newName;
  let newNamePointer = 0;
  let currColumnsPointer = 0;
  while (newNamePointer < req.body.newColumnNames.length && currColumnsPointer < newBoard.columns.length){
    if (newBoard.columns[currColumnsPointer]){
      newBoard.columns[currColumnsPointer]!.name = req.body.newColumnNames[newNamePointer];
      newNamePointer += 1;
    }
    currColumnsPointer += 1;
  }
  if (newNamePointer < req.body.newColumnNames.length){
    //this means that there are more columns that need to be added
    while (newNamePointer < req.body.newColumnNames.length){
      newBoard.columns.push({name: req.body.newColumnNames[newNamePointer], id: newBoard.nextColumnId, nextTaskId: 0, tasks: []});
      newBoard.nextColumnId += 1;
      newNamePointer += 1;
    }
  }

  if (currColumnsPointer < newBoard.columns.length){
    //this means columns have been deleted
    newBoard.columns = newBoard.columns.slice(0, currColumnsPointer);
  }
});
//Columns
//Tasks
app.post('/addTask', (req: Request, res: Response) => {
  let subTasks: SubTask[] = req.body.subTasks.map((subTaskName: string, index: number) => {return {title: subTaskName, id: index, isCompleted: false}});
  //get the board
  let board: Board | null = getDeepCopy(boardsFromBackend[req.body.boardToAddTaskTo]);
  let column: Column | null = getDeepCopy(board!.columns[req.body.columnToAddTaskTo]);
  console.log("Add Task: ");
  console.log(board);
  console.log(column);
  //make the task
  let task: Task = {title: req.body.title, description: req.body.description, id: column!.nextTaskId, nextSubTaskId: subTasks.length, subTasks: subTasks};
  column!.tasks.push(task);
  column!.nextTaskId += 1;
  board!.columns[req.body.columnToAddTaskTo] = getDeepCopy(column);
  boardsFromBackend[req.body.boardToAddTaskTo] = getDeepCopy(board);
  // Process the received data (you can add your own logic here)
  //console.log(boardsFromBackend);
  let b = getFilteredBoards();
  let frontEndBoardIndex = -1;
  for (let i = 0; i < b.length; i++){
    if (b[i].id === req.body.boardToAddTaskTo) frontEndBoardIndex = i;
  }
  res.status(200).send({boardIndex: frontEndBoardIndex});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});