import './App.css';
import { Routes, Route } from 'react-router-dom';
import FadeInSection from './components/FadeInSection';
import MenuBar from './components/MenuBar';
import Login from './pages/Login';
import Painel from './pages/Painel';
import Financas from './pages/Financas';

function App() {

  return (
    <>
      <MenuBar />
      
      <FadeInSection>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="/financas" element={<Financas />} />
        </Routes>

      </FadeInSection>
    </>
  );
}

export default App;
