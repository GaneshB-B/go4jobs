import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import ReactHtmlParser from 'react-html-parser';
import { backend } from '../../common/config'
import { PostEdit, PostDelete, AppResume, AppApprove, AppReject } from '../common/buttons'
import { CenteredTableCell } from '../common/table'
import { StatusSelector } from '../common/selectors'

export default function Read(props) {
  const [post, setPost] = useState({})
  const postLoaded = useRef(false)

  const [status, setStatus] = useState(0)

  const [statuses, setStatuses] = useState([
    {
      "id": 0,
      "status": "All"
    }
  ])
  const statusesLoaded = useRef(false)

  const [apps, setApps] = useState([])
  const appsLoaded = useRef(false)

  const fetchPost = async () => {
    const response = await fetch(`${backend.posts}${props.postid}`)
    const data = await response.json()
    setPost(data)
  }

  const fetchApps = async () => {
    let URL = `${backend.apps}?post_id=${props.postid}`

    if ( status > 0 ) {
      URL = `${URL}&status=${status}`
    }

    const response = await fetch(URL)
    const data = await response.json()

    if (response.status == 200) {
      setApps(data)
    } else {
      setApps([])
    }
  }

  const openApp = (appid) => {
    window.open(`/app/${appid}`, '_self')
  }

  useEffect(async () => {
    if (props.postid) {
      fetchPost()
    }
  }, [props])

  useEffect(async () => {
    if ( !postLoaded.current ) {
      return postLoaded.current = true
    }

    if (post.app_count > 0) {
      const response = await fetch(`${backend.statuses}app`)
      const data = await response.json()
      setStatuses(prev => ([ prev[0], ...data ]))
    }
  }, [post])

  useEffect(async () => {
    if ( !statusesLoaded.current ) {
      return statusesLoaded.current = true
    }

    fetchApps()
  }, [statuses, status])

  useEffect(async() => {
    if ( !appsLoaded.current ) {
      return appsLoaded.current = true
    }
  }, [apps])

  if (postLoaded.current === false) {
    return <>Post Data Loading . . .</>
  } else {
    return (
      <>
        <Card sx={{ mt: -5}}>
          <CardHeader
            title = {post.title}
            subheader = {
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: '40%' }}>
                  Status : {post.post_status.status}
                </Box>
                <Box>
                  Number of Applications Received : {post.app_count}
                </Box>
              </Box>
            }
            action={
              <>
                {/* Update */}
                <PostEdit postid={post.id}>
                  Edit Post
                </PostEdit>
                
                {/* Delete */}
                <PostDelete postid={post.id} cbfn={fetchPost}>
                  Delete Post
                </PostDelete>
              </>
            }
          />
          <Divider />
          <CardContent sx={{ m: 1}}>
            { ReactHtmlParser(post.description) }
          </CardContent>
        </Card>

        { (post.app_count > 0) &&
          <Card sx={{ mt: 5, mb: -5, minHeight: '50vh' }}>
            <CardHeader
              title="Applications Received"
              subheader={`Summary of Applications Received for ${post.title}`}
              action={
                <StatusSelector default={status} list={statuses} handler={setStatus} />  
              }
            />
            <Divider />
            <CardContent>
            {
              apps === undefined
              ?
              (
                <div>Apps Data Not Loaded</div>
              )
              :
              (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <CenteredTableCell>ID</CenteredTableCell>
                        <CenteredTableCell>Name</CenteredTableCell>
                        <CenteredTableCell>Email</CenteredTableCell>
                        <CenteredTableCell>Phone</CenteredTableCell>
                        <CenteredTableCell>Gender</CenteredTableCell>
                        <CenteredTableCell>Location</CenteredTableCell>
                        <CenteredTableCell>Experience</CenteredTableCell>
                        <CenteredTableCell>Notice Period</CenteredTableCell>
                        <CenteredTableCell>Status</CenteredTableCell>
                        <CenteredTableCell>Action</CenteredTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                          {
                            apps.map((app) => (
                              <TableRow key={app.id} onClick={() => openApp(app.id)} sx={{ cursor: 'pointer' }} hover>
                                {/* ID */}
                                <CenteredTableCell>
                                  {app.id}
                                </CenteredTableCell>

                                {/* Name */}
                                <CenteredTableCell>
                                  {app.app_appt.name}
                                </CenteredTableCell>

                                {/* Email */}
                                <CenteredTableCell>
                                  {app.app_appt.email}
                                </CenteredTableCell>

                                {/* Phone */}
                                <CenteredTableCell>
                                  {app.app_appt.contact}
                                </CenteredTableCell>

                                {/* Gender */}
                                <CenteredTableCell>
                                  {app.app_appt.gender}
                                </CenteredTableCell>

                                {/* Location */}
                                <CenteredTableCell>
                                  {app.app_appt.location}
                                </CenteredTableCell>

                                {/* Experience */}
                                <CenteredTableCell>
                                  {app.app_appt.experience_months}
                                </CenteredTableCell>

                                {/* Notice Period */}
                                <CenteredTableCell>
                                  {app.app_appt.notice_period}
                                </CenteredTableCell>

                                {/* Status */}
                                <CenteredTableCell>
                                  {app.app_status.status}
                                </CenteredTableCell>

                                {/* Action(s) */}
                                <TableCell align='center'>

                                  {/* Resume */}
                                  <AppResume appid={app.id} />

                                  {/* Approve */}
                                  <AppApprove appid={app.id} cbfn={fetchApps} />

                                  {/* Reject */}
                                  <AppReject appid={app.id} cbfn={fetchApps} />

                                </TableCell>
                              </TableRow>
                            ))
                          }
                    </TableBody>
                  </Table>
              )
            }
            </CardContent>
          </Card>
        }
      </>
    )
  }
}
