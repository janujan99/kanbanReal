import { useState } from "react";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import useStore from "./store";
import { AddBoardRequest, Board } from "../../kanbanTypes";
export default function BoardCreationModal() {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const store = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Random Title");
  const [columnNames, setColumnNames] = useState<string[]>([
    "New Column",
    "New Column",
  ]);
  console.log("Cols: ", columnNames);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTitleChange = (event: any) => setTitle(() => event.target.value);
  const addColumnName = () =>
    setColumnNames(() =>
      JSON.parse(JSON.stringify(columnNames)).concat("New Column")
    );
  const deleteColumnName = (i: number) => {
    setColumnNames(() => columnNames.filter((col: string, j: number) => i !== j));
  };
  const handleColumnNameChange = (event: any, index: number) => {
    let newColNames = JSON.parse(JSON.stringify(columnNames));
    newColNames[index] = event.target.value;
    setColumnNames(() => newColNames);
  };
  const handleSubmit = () => {
    let request: AddBoardRequest = {name: title, columns: columnNames};
    store.addBoard(request);
    handleClose();
  };
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Board
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Title
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue={title}
            onChange={handleTitleChange}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Columns
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {columnNames.map((name, i) => (
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  defaultValue={name}
                  onChange={(event) => handleColumnNameChange(event, i)}
                />
                <Button onClick={() => deleteColumnName(i)}>
                  Delete Column
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={addColumnName}>Add Column</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
}