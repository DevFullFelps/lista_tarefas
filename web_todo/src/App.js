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
        <Routes>
          <Route path='/' element={
             <>
              <Navbar />
              <SectionButton />
              <Main />
              <Footer />
             </>
            }/>
          <Route path='/todo' element={<Todo />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
