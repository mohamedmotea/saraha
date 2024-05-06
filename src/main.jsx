import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'animate.css';
import './index.css'
import UserTokenProvider from './Context/Token.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<UserTokenProvider>
  
<QueryClientProvider client={queryClient}>
    <App />
</QueryClientProvider>

</UserTokenProvider>


  </React.StrictMode>,
)
