import './App.css';
import { Routes, Route } from 'react-router-dom';
import FadeInSection from './components/FadeInSection';
import MenuBar from './components/MenuBar';
import Login from './pages/Login';
import Painel from './pages/Painel';
import Financas from './pages/Financas';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {

  return (
    <AuthProvider>
      
      <FadeInSection>
      <MenuBar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/painel" element={ <ProtectedRoutes>
                                            <Painel />
                                          </ProtectedRoutes> } />
          <Route path="/financas/:id" element={<ProtectedRoutes>
                                            <Financas />
                                          </ProtectedRoutes>} />

        </Routes>

      </FadeInSection>
    </AuthProvider>
  );
}

export default App;
