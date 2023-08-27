//Useful interfaces
export interface Board {
    name: string;
    id: number;
    nextColumnId: number;
    columns: (String|null) [];
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
  export interface BoardDisplayUnit {
    boards: (Board | null)[];
    currBoardIndex: number;
  }