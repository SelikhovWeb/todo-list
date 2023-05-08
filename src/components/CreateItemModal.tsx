import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createData } from "./ToDoTable";

interface ICreateItemModalProps {
  open: boolean;
  handleClose: () => void;
  modalTitle: string;
  setItems: React.Dispatch<any>;
}

function CreateItemModal({
  open,
  handleClose,
  modalTitle,
  setItems,
}: ICreateItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateForm = () => {
    return title.length !== 0;
  };

  const handleCreate = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setIsTouched(false);

    setItems((prevItems: any) => {
      return [...prevItems, createData(title, description, deadline, false)];
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        setIsTouched(false);
      }}
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          label="Title"
          type="title"
          fullWidth
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          error={title.length === 0 && isTouched}
          helperText={"Title is required."}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          fullWidth
          rows={3}
          variant="standard"
          onChange={(e) => setDescription(e.target.value)}
          style={{
            marginBottom: "12px",
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(newValue) => setDeadline(newValue as string)}
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            setIsTouched(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setIsTouched(true);
            if (validateForm()) {
              handleCreate();
              setIsTouched(false);
              handleClose();
            }
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateItemModal;
