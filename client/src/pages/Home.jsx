import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";

const Home = () => {
  const {folders} = useLoaderData();
  console.log("CHECK folders :=>>>>>>) ", folders);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: "10px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mt: "10px" }}>
        <UserMenu />
      </Box>
      <Grid
        mt={2}
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid size={3} sx={{ height: "100%" }}>
          <FolderList
            folders={folders}
          />
        </Grid>
        <Grid size={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
