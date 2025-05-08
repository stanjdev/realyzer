import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '../redux/store'
import { LightComponent } from '../components/LightContext';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    // Trigger pageview on route change
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return (
    <>
      {/* Google Analytics scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Provider store={store}>
        <LightComponent>
          <Component {...pageProps} />
        </LightComponent>
      </Provider>
    </>
  );
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
