import React, { useState, useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import { Board, BoardDisplayUnit } from "../../kanbanTypes";
import BoardDisplay from "./BoardDisplay";
import axios from "axios";
import LeftDrawer from "./LeftDrawer";
import NavDropDown from "./NavDropDown";

function App() {
  const [boardDisplayUnit, setBoardDisplayUnit] = useState<BoardDisplayUnit>({boards: [], currBoardIndex: -1});
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const navDropDownOnClick = (i: number) => {
    setBoardDisplayUnit({boards: boardDisplayUnit.boards.filter((b)=>b), currBoardIndex: i});
  };

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
    axios
      .get("http://localhost:3001/getBoards")
      .then((response) => {
        let boards = response.data.boards;
        let currBoardIndex = -1;
        if(boards.length > 0) currBoardIndex = 0;
        setBoardDisplayUnit({boards: boards, currBoardIndex: currBoardIndex});
      })
      .catch((error) => {
        console.error("There was an error fetching data", error);
      });
  }, []);

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
            {boardDisplayUnit.boards.length > 0 && (
              <LeftDrawer
                open={drawerOpen}
                onClose={toggleDrawer}
                boards={boardDisplayUnit.boards}
              />
            )}
            <BoardDisplay />
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
            <NavDropDown boards={boardDisplayUnit!.boards}/>
            <BoardDisplay />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
