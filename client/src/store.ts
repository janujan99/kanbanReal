import { create } from "zustand";
import axios from "axios";
import { AddBoardRequest, AddTaskRequest, EditBoardRequest, FrontEndBoard } from "../../kanbanTypes";

type BoardStore = {
  boards: FrontEndBoard[];
  currBoard: number;
  taskEditorModalOpen: boolean;
  addBoard: (b: AddBoardRequest) => void;
  editBoard: (b: EditBoardRequest) => void;
  addTask: (t: AddTaskRequest) => void;
  fetchBoards: () => void;
  setCurrentBoard: (i: number) => void;
  toggleTaskEditorModal: () => void;
  //setCurrentTask: (boardId: number, columnId: number, taskId: number) => void;
};

const useStore = create<BoardStore>((set) => ({
  boards: [],
  currBoard: -1,
  taskEditorModalOpen: false,
  fetchBoards: async () => {
    try {
      const response = await axios.get<{ boards: FrontEndBoard[] }>(
        "http://localhost:3001/getBoards"
      );
      console.log("Response: ");
      console.log(response.data.boards);
      set({ boards: response.data.boards });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  },
  addBoard: async (b: AddBoardRequest) => {
    axios
      .post("http://localhost:3001/addBoard", b)
      .then((response) => {
        useStore.getState().fetchBoards();
        useStore.getState().setCurrentBoard(response.data.boardIndex);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a non-2xx status code
          console.error("Server error:", error.response.status);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received");
        } else {
          // Something else went wrong
          console.error("Error:", error.message);
        }
      });
      
  },
  editBoard: async (b:EditBoardRequest) => {
    axios
      .post("http://localhost:3001/editBoard", b)
      .then((response) => {
        useStore.getState().fetchBoards();
        useStore.getState().setCurrentBoard(response.data.boardIndex);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a non-2xx status code
          console.error("Server error:", error.response.status);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received");
        } else {
          // Something else went wrong
          console.error("Error:", error.message);
        }
      });
  },
  addTask: async (b: AddTaskRequest) => {
    axios
      .post("http://localhost:3001/addTask", b)
      .then((response) => {
        useStore.getState().setCurrentBoard(response.data.boardIndex);
        useStore.getState().fetchBoards();       
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a non-2xx status code
          console.error("Server error:", error.response.status);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received");
        } else {
          // Something else went wrong
          console.error("Error:", error.message);
        }
      });
      
  },
  setCurrentBoard: (i: number) => set((state) => ({ currBoard: i })),
  toggleTaskEditorModal: () => set((state) => ({taskEditorModalOpen: !state.taskEditorModalOpen})),
}));

export default useStore;
