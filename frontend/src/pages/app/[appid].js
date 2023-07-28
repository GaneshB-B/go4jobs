import { DashboardLayout } from '../../components/common/layout'
import Page from '../../components/common/page'
import Read from '../../components/apps/read'
import { useRouter } from 'next/router'

export default function ReadApp() {
  const router = useRouter()

  return (
    <Page title="go4jobs | Application Details">
    {
      router.isReady == true
      ?
      <Read appid={router.query.appid} />
      :
      <p>Loading . . .</p>
    }
    </Page>
  )
}

ReadApp.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
