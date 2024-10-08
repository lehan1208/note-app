import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import NewFolder from "./NewFolder.jsx";

export default function FolderList({folders}) {
  const {folderId} = useParams();
  const [activeFolder, setActiveFolder] = useState(folderId);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography sx={{fontWeight: "bold", color: "white"}}>
            Folders
          </Typography>
          <NewFolder/>
        </Box>
      }
    >
      {Array.isArray(folders) && folders.map((item) => {
        return (
          <Link
            key={item?.id}
            to={`folders/${item?.id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolder(item?.id)}
          >
            <Card sx={{
              mb: "5px",
              backgroundColor: activeFolder === item?.id ? "rgb(255 211 140)" : null
            }}>
              <CardContent
                sx={{"&:last-child": {pb: "10px"}, padding: "10px"}}
              >
                <Typography sx={{fontSize: "16px", fontWeight: "bold"}}>{item?.name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
