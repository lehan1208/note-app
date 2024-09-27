import NotificationsIcon from "@mui/icons-material/Notifications"
import { useEffect, useState } from "react";
import { createClient } from 'graphql-ws';
import { GRAPHQL_SUBSCRIPTIONS_ENDPOINT } from "../utils/contanst.js";
import { Badge, Menu, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  customMenu: {
    '& .MuiMenu-list': {
      padding: 0, // Remove all padding
    },
  },
  customMenuItem: {
    paddingTop: 0,
    paddingBottom: 0, // Remove padding Y
  }
});


const client = createClient({
  url: GRAPHQL_SUBSCRIPTIONS_ENDPOINT,
});

const PushNotification = () => {
  const classes = useStyles();
  const query = `subscription PushNotification {
  notification {
    message
  }
}`;

  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setNotification('');
    setInvisible(true);
  };

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const onNext = (data) => {
          setInvisible(false);

          const message = data?.data?.notification?.message;
          setNotification(message);
          console.log('[PUSH NOTIFICATION]', {data});
        };

        await new Promise((resolve, reject) => {
          client.subscribe(
            {
              query,
            },
            {
              next: onNext,
              error: reject,
              complete: resolve,
            }
          );
        });
      } catch (error) {
        console.log("CHECK error :=>>>>>>) ", error);
      }
    })();
  }, []);

  return (
    <>
      <Badge
        color='error'
        variant='dot'
        invisible={invisible}
        overlap='circular'
        sx={{'&:hover': {cursor: notification ? 'pointer' : "default"}, ml: '5px'}}
      >
        <NotificationsIcon onClick={handleClick} sx={{color: '#7D9D9C'}}/>
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} className={classes.customMenu}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
};

export default PushNotification;