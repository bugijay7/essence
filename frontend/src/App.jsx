import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ServicesPage from './pages/ServicesPage'
import StylistPage from './pages/StylistPage'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import ClientDashboard from './pages/ClientDashboard'
import BookingPage from './pages/BookingPage' // ✅ new import
import StylishDashboard from './pages/StylishDashboard'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FootNotes from './components/FootNotes'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stylists" element={<StylistPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/book" element={<BookingPage />} /> {/* ✅ new route */}
        <Route path="/stylish-dashboard/user/:id" element={<StylishDashboard />} />
        <Route path="/contact" element={<Contact /> } />
      </Routes>
      <Footer />
      <FootNotes />
    </Router>
  )
}

export default App
