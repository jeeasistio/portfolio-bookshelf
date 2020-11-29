import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { UserProvider } from '@contexts/UserContext'
import axios from 'axios'
import theme from '@styles/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <>
      <UserProvider>
        <SWRConfig value={{
          fetcher: (key, params) => axios.get(key, { params }).then(res => res.data)
        }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SWRConfig>
      </UserProvider>
    </>
  )
}

export default MyApp
