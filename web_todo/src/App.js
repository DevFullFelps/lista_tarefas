import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from'./components/Navbar';
import Footer from './components/Footer';
import Main from'./components/Main';
import SectionButton from './components/SectionButton';
import Todo from './pages/Todo';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <SectionButton />
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/todo' element={<Todo />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
