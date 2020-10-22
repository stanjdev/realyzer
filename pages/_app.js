/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css'
import { Provider } from 'react-redux';
import store from '../redux/store'
import {LightComponent} from '../components/LightContext';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LightComponent>
        <Component {...pageProps} />
      </LightComponent>
    </Provider>
  )
}

export default MyApp
