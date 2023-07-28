import { DashboardLayout } from '../components/common/layout'
import Page from '../components/common/page'
import ReadAll from '../components/posts/read-all'

export default function ReadPosts() {
  return (
    <Page title="go4jobs | Dashboard">
      <ReadAll />
    </Page>
  )
}

ReadPosts.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
