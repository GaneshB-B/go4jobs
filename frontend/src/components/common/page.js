import Head from 'next/head'
import { Box, Container } from '@mui/material'


export default function Page(props) {
  return (
    <>
      <Head>
        <title>
          {props.title}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          {props.children}
        </Container>
      </Box>
    </>
  )
}
