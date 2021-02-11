import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '../redux/store'
import { LightComponent } from '../components/LightContext';

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <LightComponent>
        <Component {...pageProps} />
      </LightComponent>
    </Provider>
  )
}











// Original, before adding google gtag:
// /* eslint-disable react/react-in-jsx-scope */
// import '../styles/globals.css'
// import { Provider } from 'react-redux';
// import store from '../redux/store'
// import { LightComponent } from '../components/LightContext';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <LightComponent>
//         <Component {...pageProps} />
//       </LightComponent>
//     </Provider>
//   )
// }

// export default MyApp
