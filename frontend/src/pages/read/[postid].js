import { DashboardLayout } from '../../components/common/layout'
import Page from '../../components/common/page'
import Read from '../../components/posts/read'
import { useRouter } from 'next/router'

export default function ReadPost() {
  const router = useRouter()

  return (
    <Page title="go4jobs | Post Details">
    {
      router.isReady == true
      ?
      <Read postid={router.query.postid} />
      :
      <p>Loading . . .</p>
    }
    </Page>
  )
}

ReadPost.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
