import Grid from "@mui/material/Grid2";
import { Link, Outlet, useLoaderData, useNavigate, useParams, useSubmit } from "react-router-dom";
import { Box, Card, CardContent, IconButton, List, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import moment from "moment";

export default function NoteList() {
  const {noteId, folderId} = useParams();
  const [activeNote, setActiveNote] = useState(noteId)
  const {folder} = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (noteId) {
      return setActiveNote(noteId);
    }

    // Chọn item note đầu tiên khi click vào folder
    if (folder?.notes?.[0]) {
      navigate(`note/${folder?.notes?.[0].id}`)
    }

  }, [noteId, folder?.notes]);

  function handleAddNewNote() {
    submit({
      content: "",
      folderId
    }, {
      method: "POST",
      action: `/folders/${folderId}`
    })
  }

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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={{fontWeight: "bold"}}>
                Note List
              </Typography>
              <Tooltip
                title="Add Note"
                onClick={handleAddNewNote}
              >
                <IconButton size="small">
                  <CreateNewFolderOutlined/>
                </IconButton>
              </Tooltip>
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
                      padding: "10px",
                      minHeight: "16px"
                    }}
                  >
                    <div
                      style={{fontSize: "14px", minHeight: "16px", fontWeight: "bold"}}
                      dangerouslySetInnerHTML={{__html: `${item?.content.substring(0, 30) || "Empty"}`}}
                    />
                    <Typography sx={{fontSize: "10px"}}>{`Last updated: ${moment(item.updatedAt).format("MMMM Do YYYY h:mm:ss A")}`}</Typography>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </List>
      </Grid>
      <Grid size={8} sx={{height: "100%", overflowY: "auto"}}>
        <Outlet/>
      </Grid>
    </Grid>
  );
}

