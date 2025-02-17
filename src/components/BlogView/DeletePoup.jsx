import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      sx={{
        border: "2px solid #016A70",
        borderTop: "1px solid #016A70",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
      }}
    />
  );
});
const DeletePopup = ({ open, setOpen, handleDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          //   border: "2px solid #016A70",
          borderTop: "8px solid #016A70",
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          <DeleteForeverTwoToneIcon
            sx={{ color: "#016A70" }}
            fontSize="large"
          />
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#016A70" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ textTransform: "none", color: "#016A70" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeletePopup;
