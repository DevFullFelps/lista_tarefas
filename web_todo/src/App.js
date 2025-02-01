import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import SectionButton from './components/SectionButton';
import Todo from './pages/Todo';
import ProtectedRoute from './ProtectedRoute'; 
import Auth from './Auth'; // Certifique-se de importar o componente de login

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rota para a página inicial */}
          <Route
            path='/'
            element={
              <>
                <Navbar />
                <SectionButton />
                <Main />
                <Footer />
              </>
            }
          />

          {/* Rota para a página de autenticação */}
          <Route path='/auth' element={<Auth />} />

          {/* Rota protegida para a página de tarefas */}
          <Route
            path='/todo'
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
