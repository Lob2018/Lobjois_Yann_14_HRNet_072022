import { lazy } from 'react'

const AddUseForm = lazy(() => import('../../components/AddUseForm'))

function Home() {
  return <AddUseForm />
}

export default Home
