import { useEffect, useState } from "react";
import { ContentState, convertFromHTML, convertToRaw, EditorState, } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";

export default function NoteDetail() {
  const {note} = useLoaderData()

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

  const handleOnChange = (e) => {
    setEditorState(e);
    const _rawHtml = draftToHtml(convertToRaw(e.getCurrentContent()));
    setRawHtml(_rawHtml);
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write something..."
    />
  )
}