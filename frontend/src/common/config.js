const backend_root = process.env.NEXT_PUBLIC_API_BASE_URL

export const name = 'go4jobs'

export const backend = {
  root: backend_root,
  apps: backend_root + '/apps/',
  posts: backend_root + '/posts/',
  statuses: backend_root + '/statuses/'
}
