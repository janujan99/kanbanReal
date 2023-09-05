//Back end structures
export interface Board {
    name: string;
    id: number;
    nextColumnId: number;
    columns: (Column|null) [];
  }
  export interface Column {
    name: string;
    id: number;
    nextTaskId: number;
    tasks: (Task|null) [];
  }
 export interface Task {
    title: string;
    id: number;
    nextSubTaskId: number;
    description: string;
    subTasks: (SubTask|null)[];
  }
  export interface SubTask {
    title: string;
    id: number;
    isCompleted: boolean;
  }
  //Front end structures
  export interface FrontEndColumn {
    name: string;
    id: number;
    nextTaskId: number;
    tasks: FrontEndTask [];
  }
  export interface FrontEndBoard {
    name: string;
    id: number;
    nextColumnId: number;
    columns: FrontEndColumn [];
  }
  export interface FrontEndTask {
    title: string;
    id: number;
    nextSubTaskId: number;
    description: string;
    subTasks: FrontEndSubTask[];
  }
  export interface FrontEndSubTask {
    title: string;
    id: number;
    isCompleted: boolean;
  }
  //Request structures
  export interface AddBoardRequest{
    name: string;
    columns: string[];
  }