import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import { backend } from '../../common/config'
import { AppResume, AppApprove, AppReject } from '../common/buttons'
import { HoverTableRow, CenteredTableCell } from '../common/table'

export default function Read(props) {
  const [app, setApp] = useState({})
  const appLoaded = useRef(false)

  const fetchApp = async () => {
    const response = await fetch(`${backend.apps}${props.appid}`)
    const data = await response.json()
    setApp(data)
  }

  useEffect(async () => {
    if (props.appid) {
      fetchApp()
    }
  }, [props])

  useEffect(async () => {
    if ( !appLoaded.current ) {
      return appLoaded.current = true
    }
  }, [app])

  if (appLoaded.current === false) {
    return <>Job Application Data Loading . . .</>
  } else {
    return (
      <Card sx={{ my: -5 }}>
        <CardHeader
          title = "Application Details"
          subheader = {
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: '40%' }}>
                Status : {app.app_status.status}
              </Box>
              <Box>
                Job Application ID : {props.appid}
              </Box>
            </Box>
          }
          action={
            <>
              {/* Resume Download Button */}
              <AppResume appid={props.appid} />

              {/* Approve Application Button */}
              <AppApprove appid={props.appid} cbfn={fetchApp} />

              {/* Reject Application Button */}
              <AppReject appid={props.appid} cbfn={fetchApp} />
            </>
          }
        />
        <Divider />
        <CardContent sx={{ m: 1}}>
          <Table sx={{ mb: 5 }}>
            <TableHead>
              <TableRow>
                <CenteredTableCell colSpan={2}>
                  Job Post Details
                </CenteredTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <HoverTableRow>
                <TableCell>
                  Job Post
                </TableCell>
                <TableCell>
                  {app.app_post.title}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Job Post Status
                </TableCell>
                <TableCell>
                  {app.app_post.post_status.status}
                </TableCell>
              </HoverTableRow>
            </TableBody>
          </Table>
          
          <Divider />
          
          <Table sx={{ mt: 5 }}>
            <TableHead>
              <TableRow>
                <CenteredTableCell colSpan={2}>
                  Applicant Details
                </CenteredTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <HoverTableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  {app.app_appt.name}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  {app.app_appt.email}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  {app.app_appt.contact}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  {app.app_appt.location}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Experience
                </TableCell>
                <TableCell>
                  {app.app_appt.experience_months}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Gender
                </TableCell>
                <TableCell>
                  {app.app_appt.gender}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Notice Period
                </TableCell>
                <TableCell>
                  {app.app_appt.notice_period}
                </TableCell>
              </HoverTableRow>

              <HoverTableRow>
                <TableCell>
                  Skills
                </TableCell>
                <TableCell>
                  {app.app_appt.skills}
                </TableCell>
              </HoverTableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}
