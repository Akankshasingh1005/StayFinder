import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './Context/UserContext.jsx'
import AuthContext, { AuthDataContext } from './Context/AuthContext.jsx'
import ListingContext from './Context/ListingContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AuthContext>
  <UserContext> 
        <ListingContext>
          <App />
        </ListingContext>
      </UserContext>
  </AuthContext>
 </BrowserRouter>
   
)
