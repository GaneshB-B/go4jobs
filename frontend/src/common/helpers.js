import { backend } from './config'

export const titleCase = (str) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase())
  }).join(' ')
}

export const handleStatusChange = (event, handler) => {
  handler(event.target.value)
}

export const editPost = (event, postid) => {
  event.stopPropagation()
  window.open(`/update/${postid}`, '_self')
}

export const delPost = async (event, postid) => {
  event.stopPropagation()
  await fetch(`${backend.posts}${postid}`, {method: 'DELETE'})
}

export const actApp = async (event, appid, action) => {
  event.stopPropagation()
  await fetch(`${backend.apps}${appid}/${action}`, {method: 'PUT'})
}
