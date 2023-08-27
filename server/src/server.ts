import express, {Request, Response} from 'express';
import cors from 'cors';
import {Board} from "../../kanbanTypes";

const app = express();
const PORT = 3001;
app.use(cors());

let boardsFromBackend: (Board | null)[] = [{name: "Gaels", id: 0, nextColumnId: 0, columns: ["you", "are", "mean"]}, {name: "Dorchester", id: 0, nextColumnId: 0, columns: ["you", "are", "mean"]}];

app.get('/getBoards', (req: Request, res: Response) => {
  
  let filteredBoards: (Board|null)[] = boardsFromBackend.filter( (o) => o !== null);
  res.status(200).json({ boards: filteredBoards });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

