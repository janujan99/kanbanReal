import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Board } from "../../kanbanTypes";
import useStore from "./store";
interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ open, onClose}) => {
  const store = useStore();
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {store.boards.map((board, index) => (
          <ListItem onClick={() => store.setCurrentBoard(index)}>
            <ListItemText primary={board!.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
