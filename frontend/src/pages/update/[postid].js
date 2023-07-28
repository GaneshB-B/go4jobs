import { DashboardLayout } from '../../components/common/layout'
import Page from '../../components/common/page'
import Update from '../../components/posts/update'
import { useRouter } from 'next/router'

export default function UpdatePost() {
  const router = useRouter()

  return (
    <Page title="go4jobs | Update Post">
    {
      router.isReady == true
      ?
      <Update postid={router.query.postid} />
      :
      <p>Loading . . .</p>
    }
    </Page>
  )
}

UpdatePost.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
