import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Board } from "../../kanbanTypes";

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
  boards: (Board|null)[];
}

const LeftDrawer: React.FC<LeftDrawerProps> = ({ open, onClose, boards }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {boards.map((board) => (
          <ListItem>
            <ListItemText primary={board!.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
