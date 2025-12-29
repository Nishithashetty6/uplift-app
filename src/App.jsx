import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import PrivateRoute from './components/PrivateRoute';
import ThreeCirclesBackground from './components/ThreeCirclesBackground';

import Resources from './pages/Resources';
import Mentorship from './pages/Mentorship';
import Community from './pages/Community';
import Home from './pages/Home';
import Career from './pages/Career';
import MentalHealth from './pages/MentalHealth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import Onboarding from './pages/Onboarding';
import Journal from './pages/Journal';
import Focus from './pages/Focus';
import ChatWidget from './components/ChatWidget';

function Navigation() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      padding: '0.75rem 1.5rem',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    }}>
      {user && (
        <>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/career" className={`nav-link ${location.pathname.startsWith('/career') ? 'active' : ''}`}>Career</Link>
          <Link to="/resources" className={`nav-link ${location.pathname.startsWith('/resources') ? 'active' : ''}`}>Resources</Link>
          <Link to="/mentorship" className={`nav-link ${location.pathname.startsWith('/mentorship') ? 'active' : ''}`}>Mentorship</Link>
          <Link to="/community" className={`nav-link ${location.pathname.startsWith('/community') ? 'active' : ''}`}>Community</Link>
          <Link to="/mental-health" className={`nav-link ${location.pathname.startsWith('/mental-health') ? 'active' : ''}`}>Wellness</Link>
          <Link to="/resume" className={`nav-link ${location.pathname.startsWith('/resume') ? 'active' : ''}`}>Resume</Link>
          <Link to="/focus" className={`nav-link ${location.pathname.startsWith('/focus') ? 'active' : ''}`}>Focus</Link>

          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} style={{ border: '1px solid var(--primary)' }}>
            Dashboard
          </Link>
        </>
      )}
    </nav>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', position: 'relative' }}>
      <ThreeCirclesBackground />
      <Navigation />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<Home />} />
            <Route path="/career/*" element={<Career />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mental-health/*" element={<MentalHealth />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/focus" element={<Focus />} />

          </Route>
        </Routes>
      </main>
      {user && <ChatWidget />}
    </div>
  );
}



function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <AppContent />
        </Router>
      </ChatProvider>
    </AuthProvider >
  );
}

export default App;
