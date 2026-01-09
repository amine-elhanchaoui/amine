import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import ReduxApp from './ReduxTp/ReduxApp.jsx'
import store from './ReduxTp/Store.jsx'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,

  <Provider store={store}>
    <ReduxApp />
  </Provider>
)
