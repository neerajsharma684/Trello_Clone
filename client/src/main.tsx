import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store, {persistor} from './redux/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <StrictMode>
    <App />
  </StrictMode>
  </PersistGate>
  </Provider>,
)
