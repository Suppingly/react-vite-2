import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routes';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Header/>
      <main>
        <AppRoutes/>
      </main>
      <Footer/>
      </AuthProvider>
    </Router>
  )
}

export default App;