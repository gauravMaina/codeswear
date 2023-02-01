import '@/styles/globals.css'
import Footer from 'Components/Footer'
import Nabvar from 'Components/Navbar'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Nabvar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
