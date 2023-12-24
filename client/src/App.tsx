import React, { useState, useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { Board } from "../../kanbanTypes";
import BoardDisplay from "./BoardDisplay";
import axios from "axios";
import LeftDrawer from "./LeftDrawer";
import NavDropDown from "./NavDropDown";
import useStore from "./store";
import BoardCreationModal from "./BoardCreationModal";
import TaskCreationModal from "./TaskCreationModal";
import TaskEditorModal from "./TaskEditorModal";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaEllipsisV } from "react-icons/fa";

function App() {
  const store = useStore();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(() => window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    store.fetchBoards();
    console.log("useEffect");
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundImage: 'url("http://localhost:3002/sky.jpg")' }}
    >
      <header className="App-header">
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
            }}
          >
            {store.boards.length > 0 && (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div onClick={toggleDrawer} style={{ margin: 10 }}>
                    <GiHamburgerMenu color="white" />
                  </div>
                  <div style={{ margin: 10 }}>
                    <FaEllipsisV color="white" />
                  </div>
                </div>
                <LeftDrawer open={drawerOpen} onClose={toggleDrawer} />
              </div>
            )}
            {store.boards.length > 0 && <BoardDisplay />}
          </div>
        )}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
            }}
          >
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <NavDropDown />
              <div style={{ margin: 10 }}>
                <FaEllipsisV color="white" />
              </div>
            </div>
            <BoardDisplay />
          </div>
        )}
        <BoardCreationModal />
        {store.boards.length > 0 && <TaskCreationModal />}
        {store.boards.length > 0 && <TaskEditorModal />}
      </header>
    </div>
  );
}

export default App;
