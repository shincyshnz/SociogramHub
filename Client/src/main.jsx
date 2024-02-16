import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from './context/ErrorContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 10 * (60 * 1000), // 10 mins
  //       cacheTime: 15 * (60 * 1000), // 15 mins
  //     },
  //   },
  // }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>,
)