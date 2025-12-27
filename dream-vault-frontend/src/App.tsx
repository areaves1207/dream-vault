import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerification from './pages/VerifyEmail';
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AwaitingVerification from './components/AwaitingVerification';


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-email" element={<EmailVerification/>}/>
        <Route path="/verification-awaiting" element={<AwaitingVerification/>}/>

        {/* Private routes. user must log in */}
        <Route path="/"           
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
