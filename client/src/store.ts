import { create } from "zustand";
import axios from "axios";
import { AddBoardRequest, FrontEndBoard } from "../../kanbanTypes";

type BoardStore = {
  boards: FrontEndBoard[];
  currBoard: number;
  addBoard: (b: AddBoardRequest) => void;
  fetchBoards: () => void;
  setCurrentBoard: (i: number) => void;
};

const useStore = create<BoardStore>((set) => ({
  boards: [],
  currBoard: 0,
  
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
}));

export default useStore;
