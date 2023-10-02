"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
function getDeepCopy(arg) {
    return JSON.parse(JSON.stringify(arg));
}
function getFilteredBoards() {
    let b = boardsFromBackend;
    let filteredBoards = [];
    //filter out null boards, columns, tasks, subtasks for frontend
    for (let i = 0; i < boardsFromBackend.length; i++) {
        if (boardsFromBackend[i]) {
            let currBoard = getDeepCopy(boardsFromBackend[i]);
            let filteredColumns = [];
            for (let j = 0; boardsFromBackend[i].columns && j < boardsFromBackend[i].columns.length; j++) {
                if (boardsFromBackend[i].columns[j]) {
                    let currColumn = getDeepCopy(boardsFromBackend[i].columns[j]);
                    let filteredTasks = [];
                    for (let k = 0; boardsFromBackend[i].columns[j].tasks && k < boardsFromBackend[i].columns[j].tasks.length; k++) {
                        if (boardsFromBackend[i].columns[j].tasks[k]) {
                            let currTask = getDeepCopy(boardsFromBackend[i].columns[j].tasks[k]);
                            let filteredSubTasks = currTask.subTasks.filter((s) => s !== null);
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
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let boardsFromBackend = [];
let nextBoardId = 0;
//Boards
app.get('/getBoards', (req, res) => {
    res.status(200).json({ boards: getFilteredBoards() });
});
app.post('/addBoard', (req, res) => {
    let cols = req.body.columns.map((colName, index) => { return { name: colName, id: index, nextTaskId: 0, tasks: [] }; });
    let newBoard = { name: req.body.name, id: nextBoardId, nextColumnId: 0, columns: cols };
    boardsFromBackend.push(newBoard);
    // Process the received data (you can add your own logic here)
    nextBoardId += 1;
    //console.log(boardsFromBackend);
    let b = getFilteredBoards();
    let frontEndBoardIndex = -1;
    for (let i = 0; i < b.length; i++) {
        if (b[i].name === req.body.name)
            frontEndBoardIndex = i;
    }
    res.status(200).send({ boardIndex: frontEndBoardIndex });
});
//Columns
//Tasks
app.post('/addTask', (req, res) => {
    let subTasks = req.body.subTasks.map((subTaskName, index) => { return { title: subTaskName, id: index, isCompleted: false }; });
    //get the board
    let board = getDeepCopy(boardsFromBackend[req.body.boardToAddTaskTo]);
    let column = getDeepCopy(board.columns[req.body.columnToAddTaskTo]);
    console.log("Add Task: ");
    console.log(board);
    console.log(column);
    //make the task
    let task = { title: req.body.title, description: req.body.description, id: column.nextTaskId, nextSubTaskId: subTasks.length, subTasks: subTasks };
    column.tasks.push(task);
    column.nextTaskId += 1;
    board.columns[req.body.columnToAddTaskTo] = getDeepCopy(column);
    boardsFromBackend[req.body.boardToAddTaskTo] = getDeepCopy(board);
    // Process the received data (you can add your own logic here)
    //console.log(boardsFromBackend);
    let b = getFilteredBoards();
    let frontEndBoardIndex = -1;
    for (let i = 0; i < b.length; i++) {
        if (b[i].name === board.name)
            frontEndBoardIndex = i;
    }
    res.status(200).send({ boardIndex: frontEndBoardIndex });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
