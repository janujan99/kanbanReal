import React, { useState, useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { Board} from "../../kanbanTypes";
import BoardDisplay from "./BoardDisplay";
import axios from "axios";
import LeftDrawer from "./LeftDrawer";
import NavDropDown from "./NavDropDown";
import useStore from "./store";
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
  }, [store]);

  return (
    <div className="App">
      <header className="App-header">
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
            }}
          >
            <Button onClick={toggleDrawer}>Toggle Drawer</Button>
            {store.boards.length > 0 && (
              <LeftDrawer
                open={drawerOpen}
                onClose={toggleDrawer}
              />
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
            <NavDropDown />
            <BoardDisplay />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
