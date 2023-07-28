import React, { useState, useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  InputLabel,
  Collapse,
  IconButton,
  Alert,
  AlertTitle
} from '@mui/material'
import { backend } from '../../common/config'
import { titleCase } from '../../common/helpers'

let URL = backend.posts

export default function PostForm(props) {
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  const [editorLoaded, setEditorLoaded] = useState(false)

  const [statuses, setStatuses] = useState([])
  const [statusesLoaded, setStatusesLoaded] = useState(false)

  const [formData, setFormData] = useState({ status: 1 })
  const [formDataLoaded, setFormDataLoaded] = useState(false)

  const [message, setMessage] = useState({})
  const [showMessage, setShowMessage] = useState(true)

  useEffect(async () => {
    const response = await fetch(`${backend.statuses}post`)
    const data = await response.json()
    setStatuses(data)

    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }

    setEditorLoaded(true)
  }, [])

  useEffect(async () => {
    if (props.type == "update" && props.postid) {
      URL = `${URL}${props.postid}`
    }
    console.log('URL :', URL)
  }, [props])

  useEffect(async() => {
    if ( !statusesLoaded ) {
      return setStatusesLoaded(true)
    }

    if (props.type == "update") {
      const response = await fetch(URL)
      const data = await response.json()

      setFormData({
        title: data.title,
        description: data.description,
        status: data.status
      })
    }
  }, [statuses])

  useEffect(async () => {
    if ( !formDataLoaded ) {
      return setFormDataLoaded(true)
    }
  }, [formData])

  const handleChange = (event) => {
    setFormData(formData => ({
      ...formData,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.description && formData.description != '') {
      const formContent = {
        ...(props.type == "create" && {method: 'POST'}),
        ...(props.type == "update" && {method: 'PUT'}),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }

      const response = await fetch(URL, formContent)
      const data = await response.json()

      if(data.id) {
        setMessage({
          ...(props.type == "create" && {text: `New Job Post Created with ID ${data.id} !`}),
          ...(props.type == "update" && {text: `Job Post with ID ${data.id} Updated !`}),
          severity: 'success'
        })
        setShowMessage(true)
      } else {
        setMessage({
          ...(props.type == "create" && {text: 'New Job Post Not Created !'}),
          ...(props.type == "update" && {text: 'Job Post Not Updated !'}),
          severity: 'error'
        })
        setShowMessage(true)
      }
    } else {
      setMessage({
        text: 'Description is required!',
        severity: 'error'
      })
      setShowMessage(true)
    }
  }

  return editorLoaded ? (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <Card sx={{ my: -5}}>
        <CardHeader
          title={(props.type == "update") ? "Update Post" : "Create Post"}
          subheader={(props.type == "update") ? "Update An Existing Job Post" : "Create A New Job Post"}
          action={
            <Button
              href="/"
              color="primary"
              variant="outlined"
            >
              Dashboard
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {/* title */}
            <Grid
              item
              xs={12}
            >
              <InputLabel name="title" required sx={{ ml: 0.5, mb: 0.5 }}>
                Title
              </InputLabel>
              <TextField
                fullWidth
                name="title"
                onChange={handleChange}
                required
                variant="outlined"
                value={formData.title}
              />
              <InputLabel shrink sx={{ ml: 0.5, mt: 0.5 }}>
                {(props.type == "update") ? "Edit Title" : "Please provide a Title"}
              </InputLabel>
            </Grid>

            {/* description */}
            <Grid
              item
              xs={12}
            >
              <InputLabel name="description" required sx={{ ml: 0.5, mb: 0.5 }}>
                Description
              </InputLabel>
              <CKEditor
                editor={ ClassicEditor }
                data={ formData.description }
                onReady={ editor => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      "height",
                      "350px",
                      editor.editing.view.document.getRoot()
                    )
                  })
                } }
                onChange={ ( event, editor ) => {
                  const data = editor.getData()
                  setFormData(formData => ({
                    ...formData,
                    description: data
                  }))
                } }
              />
              <InputLabel shrink sx={{ ml: 0.5, mt: 0.5 }}>
                {(props.type == "update") ? "Edit Description" : "Please provide a Description"}
              </InputLabel>
            </Grid>

            {/* status */}
            <Grid
              item
              xs={12}
            >
              <InputLabel name="status" required sx={{ ml: 0.5, mb: 0.5 }}>
                Status
              </InputLabel>
              <TextField
                fullWidth
                name="status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={formData.status}
                variant="outlined"
              >
                {
                  statuses.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.status}
                    </option>
                  ))
                }
              </TextField>
              <InputLabel shrink sx={{ ml: 0.5, mt: 0.5 }}>
                {(props.type == "update") ? "Change Status" : "Please Select a Status"}
              </InputLabel>
            </Grid>
          </Grid>
        </CardContent>
        {
          message.severity
          ?
          <Collapse in={showMessage}>
            <Alert
              severity={message.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowMessage(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>{titleCase(message.severity)}</AlertTitle>
              {message.text}
            </Alert>
          </Collapse>
          :
          <div></div>
        }
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="secondary"
            variant="outlined"
          >
            {(props.type == "update") ? "Update Job Post" : "Save Job Post"}
          </Button>
        </Box>
      </Card>
    </form>
  ) : (
    <div>Editor Loading . . . </div>
  )
}
