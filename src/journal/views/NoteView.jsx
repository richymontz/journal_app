import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";

import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store";

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

  const { body, title, createdAt, onInputChange, formState } = useForm(note);

  const createdAtFormatted = useMemo(() => {
    const date = new Date(createdAt);

    return date.toUTCString();
  }, [createdAt]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Updated Note', messageSaved);
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSavingNote());
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files))
  }

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  }

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          mb: 1
        }}
      >
        <Grid item>
          <Typography fontSize={39} fontWeight='light'>
            {createdAtFormatted}
          </Typography>
        </Grid>
        <Grid item>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{ display: 'none' }}
          />

          <IconButton
            onClick={() => fileInputRef.current.click()}
            color="primary"
            disabled={isSaving}
          >
            <UploadFileOutlined />
          </IconButton>

          <Button
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary"
            sx={{ padding: 2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Save
          </Button>
        </Grid>
        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Enter title"
            label="Title"
            sx={{ border: 'none', mb: 1 }}
            name="title"
            value={title}
            onChange={onInputChange}

          />
          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="What was going today?"
            sx={{ border: 'none', mb: 1 }}
            minRows={5}
            name='body'
            value={body}
            onChange={onInputChange}
          />
        </Grid>
        <Grid container justifyContent="end">
          <Button
            onClick={onDeleteNote}
            sx={{ mt: 2 }}
            color="error"
          >
            <DeleteOutline />
            Delete Note
          </Button>
        </Grid>

        <ImageGallery images={note.imageURLs} />
      </Grid>
    </>
  )
}
