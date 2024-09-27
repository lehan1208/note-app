import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useAuth } from "./../context/AuthProvider";
import { useState } from "react";
export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    user: { displayName, photoURL, auth },
  } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar
          alt={displayName}
          src={photoURL}
          sx={{ ml: "5px", width: "24px", height: "24px" }}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
