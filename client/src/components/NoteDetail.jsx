import { useEffect, useMemo, useRef, useState } from "react";
import { ContentState, convertFromHTML, convertToRaw, EditorState, SelectionState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useLocation, useSubmit } from "react-router-dom";
import { debounce } from "@mui/material";

export default function NoteDetail() {
  const {note} = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const previousNoteId = useRef(note?.id);

  const [rawHtml, setRawHtml] = useState(note?.content);
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  });

  useEffect(() => {
    setRawHtml(note?.content)
  }, [note?.content])

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id, note.content]);

  // useEffect(() => {
  //   if (note.id !== previousNoteId.current) {
  //     const blocksFromHTML = convertFromHTML(note.content);
  //     const state = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap
  //     );
  //     setEditorState(EditorState.createWithContent(state));
  //     previousNoteId.current = note.id; // Cập nhật note ID
  //   }
  // }, [note.id, note.content]);

  useEffect(() => {
    debounceMemorized(rawHtml, note, location.pathname);
  }, [rawHtml, location.pathname]);

  const debounceMemorized = useMemo(() => {
    return debounce((rawHtml, note, pathname) => {
      if (rawHtml === note.content) return;

      submit({...note, content: rawHtml},
        {
          method: "POST",
          action: pathname
        }
        )
    }, 1000)
  }, [])

  const handleOnChange = (newEditorState) => {
    setEditorState(newEditorState);
    const _rawHtml = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    setRawHtml(_rawHtml);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something..."
      autoFocus={false} // currently not work
    />
  )
}