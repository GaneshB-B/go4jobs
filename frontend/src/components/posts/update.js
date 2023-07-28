import PostForm from './form'

export default function Update(props) {
  return (
    <PostForm type="update" postid={props.postid} />
  )
}
