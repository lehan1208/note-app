import Grid from "@mui/material/Grid2";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useState } from "react";

export default function NoteList() {
  const {noteId} = useParams();
  const [activeNote, setActiveNote] = useState(noteId)
  const {folder} = useLoaderData()

  return (
    <Grid
      container
      sx={{height: "100%"}}
    >
      <Grid size={4} sx={{height: "100%"}}>
        <List
          sx={{
            width: "100%",
            bgcolor: "#F0EBE3",
            height: "100%",
            padding: "10px",
            textAlign: "left",
            overflowY: "auto",
          }}
          subheader={
            <Box>
              <Typography sx={{fontWeight: "bold"}}>
                Note List
              </Typography>
            </Box>
          }
        >
          {folder.notes.map(item => {
            return (
              <Link
                to={`note/${item?.id}`}
                key={item?.id}
                style={{textDecoration: "none"}}
                onClick={() => setActiveNote(item?.id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor: activeNote === item?.id ? "rgb(255 211 140)" : null
                  }}
                >
                  <CardContent
                    sx={{
                      "&:last-child": {pb: "10px"},
                      padding: "10px"
                    }}
                  >
                    <div
                      style={{fontSize: "14px", fontWeight: "bold"}}
                      dangerouslySetInnerHTML={{__html: `${item?.content.substring(0, 30) || "Empty"}`}}
                    />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </List>
      </Grid>
      <Grid size={8} sx={{height: "100%"}}>
        <Outlet/>
      </Grid>
    </Grid>
  );
}

