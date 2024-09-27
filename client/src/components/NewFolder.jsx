import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip
} from "@mui/material";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { addNewFolder } from "../utils/folderUtil.js";
import {useSearchParams, useNavigate} from "react-router-dom";

const NewFolder = () => {
  const [newFolderName, setNewFolderName] = useState("")
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const popupName = searchParams.get("popup");
  const navigate = useNavigate();

  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  function handleOpenPopup() {
    setSearchParams({popup: "add-folder"})
  }

  function onNewFolderNameChange(e) {
    setNewFolderName(e.target.value);
  }

  async function handleAddNewFolder() {
    const {addFolder} = await addNewFolder({name: newFolderName});

    handleClose();
  }

  function handleClose() {
    setNewFolderName("")
    navigate(-1);
  }

  return (
    <div>
      <Tooltip
        title="Add Folder"
        onClick={handleOpenPopup}
      >
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{color: "white"}}/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin={"dense"}
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{width: "400px"}}
            autoComplete="off"
            value={newFolderName}
            onChange={onNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddNewFolder} variant={"contained"}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewFolder;