import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useStore from "./store";
import { AddTaskRequest, Board, FrontEndColumn } from "../../kanbanTypes";
export default function TaskEditorModal() {
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
  const [open, setOpen] = useState(store.taskEditorModalOpen);
  useEffect(() => {
    setOpen(() => store.taskEditorModalOpen);
  },[store.taskEditorModalOpen]);
  console.log(open);
  console.log(store.taskEditorModalOpen);
  const [title, setTitle] = useState<string>("Random Title");
  const [description, setDescription] = useState<string>("Random Description");
  const [columnToAddTaskTo, setColumnToAddTaskTo] = useState<string>('0');
  const [subTaskNames, setSubTaskNames] = useState<string[]>(["Random Subtask"]);
  const handleOpen = () => store.toggleTaskEditorModal();
  const handleClose = () => store.toggleTaskEditorModal();
  const handleTitleChange = (event: any) => setTitle(() => event.target.value);
  const handleDescriptionChange = (event: any) =>
    setDescription(() => event.target.value);
  const handleSubTaskNameChange = (event: any, index: number) => {
    let newColNames = JSON.parse(JSON.stringify(subTaskNames));
    newColNames[index] = event.target.value;
    setSubTaskNames(() => newColNames);
  };
  const handleSubmit = () => {
    setTitle(() => "Random Title");
    setDescription(() => 'Random Description');
    setColumnToAddTaskTo(() => '0');
    let request: AddTaskRequest = {
      title: title,
      description: description,
      boardToAddTaskTo: store.boards[store.currBoard].id,
      columnToAddTaskTo: +columnToAddTaskTo,
      subTasks: subTaskNames,
    };
    store.addTask(request);
    handleClose();
  };
  const addSubTaskName = () =>
    setSubTaskNames(() =>
      JSON.parse(JSON.stringify(subTaskNames)).concat("New Column")
    );
  const deleteSubTaskName = (i: number) => {
    setSubTaskNames(() =>
      subTaskNames.filter((col: string, j: number) => i !== j)
    );
  };
  const handleChange = (event: SelectChangeEvent) => {
    setColumnToAddTaskTo(event.target.value as string);
  };
  console.log(store.currBoard);
  console.log(store.boards)
  console.log(store.boards[store.currBoard]);
  if(store.boards[store.currBoard]) return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Title
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={title}
            onChange={handleTitleChange}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Column
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={
                  store.boards[store.currBoard].columns[+columnToAddTaskTo].name
                }
                label="Column"
                onChange={handleChange}
              >
                {store.boards[store.currBoard].columns.map(
                  (col: FrontEndColumn, i: number) => (
                    <MenuItem value={i}>{col.name}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Subtasks
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {subTaskNames.map((name, i) => (
              <div>
                <TextField
                  key={i}
                  required
                  id="outlined-required"
                  label="Required"
                  value={name}
                  onChange={(event) => handleSubTaskNameChange(event, i)}
                />
                <Button onClick={() => deleteSubTaskName(i)}>
                  Delete Column
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={addSubTaskName}>Add Column</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
  return <></>;
}
