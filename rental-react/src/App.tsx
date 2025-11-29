import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <AppRoutes/>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
