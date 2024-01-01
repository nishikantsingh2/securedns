import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
// import '../../public/assets/css/templatemo-liberty-market.css'


export default function App({ Component, pageProps }) {
  return (
    <>
    <AuthContextProvider>
    <Component {...pageProps} />
 </AuthContextProvider>
    </>
    
    )
}
