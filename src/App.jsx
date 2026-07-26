import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Biblia from './pages/Biblia';
import Harpa from './pages/Harpa';
import Ebd from './pages/Ebd';
import Downloads from './pages/Downloads';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biblia" element={<Biblia />} />
            <Route path="/harpa" element={<Harpa />} />
            <Route path="/ebd" element={<Ebd />} />
            <Route path="/meus-downloads" element={<Downloads />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
