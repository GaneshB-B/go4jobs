import { backend } from '../../common/config'
import { Button } from '@mui/material' 
import { ArticleRounded, CheckCircleRounded, CancelRounded, EditRounded, DeleteForeverRounded } from '@mui/icons-material'
import { actApp, editPost, delPost } from '../../common/helpers'

{/* Edit Post */}
export const PostEdit = (props) => {
  return (
    <Button
      color="success"
      variant="outlined"
      sx={{ m: 0.5 }}
      onClick={(e) => editPost(e, props.postid)}
    >
      <EditRounded />
      { props.children }
    </Button>
  )
}

{/* Delete Post */}
export const PostDelete = (props) => {
  return (
    <Button
      color="error"
      variant="outlined"
      sx={{ m: 0.5 }}
      onClick={async (e) => {
        await delPost(e, props.postid)
        props.cbfn()
      }}
    >
      <DeleteForeverRounded />
      { props.children }
    </Button>
  )
}

{/* Download App's Resume */}
export const AppResume = (props) => {
  return (
    <Button
      color="primary"
      variant="outlined"
      sx={{ m: 0.5 }}
      href={`${backend.apps}${props.appid}/resume`}
      onClick={(e) => e.stopPropagation()}
    >
      <ArticleRounded />
    </Button>
  )
}

{/* Approve App */}
export const AppApprove = (props) => {
  return (
    <Button
      color="success"
      variant="outlined"
      sx={{ m: 0.5 }}
      onClick={async (e) => {
        await actApp(e, props.appid, 'approve')
        props.cbfn()
      }}
    >
      <CheckCircleRounded />
    </Button>
  )
}

{/* Reject App */}
export const AppReject = (props) => {
  return (
    <Button
      color="error"
      variant="outlined"
      sx={{ m: 0.5 }}
      onClick={async (e) => {
        await actApp(e, props.appid, 'reject')
        props.cbfn()
      }}
    >
      <CancelRounded />
    </Button>
  )
}
