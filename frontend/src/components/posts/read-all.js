import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material'
import { backend } from '../../common/config'
import { PostEdit, PostDelete } from '../common/buttons'
import { CenteredTableCell } from '../common/table'
import { StatusSelector } from '../common/selectors'

export default function ReadAll() {
  const [status, setStatus] = useState(0)

  const [statuses, setStatuses] = useState([
    {
      "id": 0,
      "status": "All"
    }
  ])
  const statusesLoaded = useRef(false)

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    let URL = backend.posts

    if ( status > 0 ) {
      URL = `${URL}?status=${status}`
    }

    const response = await fetch(URL)
    const data = await response.json()
    setPosts(data)
  }

  const openPost = (postid) => {
    window.open(`/read/${postid}`, '_self')
  }

  useEffect(async () => {
    const response = await fetch(`${backend.statuses}post`)
    const data = await response.json()
    setStatuses(prev => ([ prev[0], ...data ]))
  }, [])

  useEffect(async () => {
    if ( !statusesLoaded.current ) {
      return statusesLoaded.current = true
    }
    fetchPosts()
  }, [statuses, status])

  return (
    <Card sx={{ my: -5}}>
      <CardHeader
        title="Dashboard"
        subheader="Show All Job Posts"
        action={
          <Box sx={{ display: "flex" }}>
            <Box sx={{ mr: 5 }}>
              <StatusSelector default={status} list={statuses} handler={setStatus} />
            </Box>

            <Box>
              <Button
                href="/create"
                color="primary"
                variant="outlined"
              >
                Create Post
              </Button>
            </Box>
          </Box>
        }
      />

      <Divider />

      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <CenteredTableCell>ID</CenteredTableCell>
              <CenteredTableCell>Title</CenteredTableCell>
              <CenteredTableCell>Status</CenteredTableCell>
              <CenteredTableCell>Number of Applications Received</CenteredTableCell>
              <CenteredTableCell>Action</CenteredTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              posts.map((post) => (
                <TableRow key={post.id} onClick={() => openPost(post.id)} sx={{ cursor: 'pointer' }} hover>
                  {/* ID */}
                  <CenteredTableCell>
                    {post.id}
                  </CenteredTableCell>

                  {/* Title */}
                  <CenteredTableCell>
                    {post.title}
                  </CenteredTableCell>

                  {/* Status */}
                  <CenteredTableCell>
                    {post.post_status.status}
                  </CenteredTableCell>

                  {/* App Count */}
                  <CenteredTableCell>
                    {post.app_count}
                  </CenteredTableCell>

                  {/* Action(s) */}
                  <CenteredTableCell>

                    {/* Update */}
                    <PostEdit postid={post.id} />

                    {/* Delete */}
                    <PostDelete postid={post.id} cbfn={fetchPosts} />

                  </CenteredTableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
