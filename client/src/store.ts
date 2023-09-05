import {create} from 'zustand';
import axios from 'axios';
import { FrontEndBoard } from '../../kanbanTypes';

  type BoardStore = {
    boards: FrontEndBoard[];
    currBoard: number;
    addBoard: (b: FrontEndBoard) => void;
    fetchBoards: () => void;
    setCurrentBoard: (i: number) => void;
  };

  const useStore = create<BoardStore>((set) => ({
    boards: [],
    currBoard: 0,
    addBoard: (item) => set((state) => ({ boards: [...state.boards, item] })),
    fetchBoards: async () => {
      try {
        const response = await axios.get<{ boards: FrontEndBoard[] }>('http://localhost:3001/getBoards');
        console.log("Response: ");
        console.log(response.data.boards)
        set({ boards: response.data.boards });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    setCurrentBoard: (i: number) => set((state) => ({currBoard: i} ))
  }));

export default useStore;