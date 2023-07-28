import { DashboardLayout } from '../components/common/layout'
import Page from '../components/common/page'
import Create from '../components/posts/create'

export default function CreatePost() {
  return (
    <Page title="go4jobs | Create Post">
      <Create />
    </Page>
  )
}

CreatePost.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
