import Nav from './components/Nav';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddShow from './components/AddShow';
import ShowList from './components/ShowList';
import UpdateShow from './components/UpdateShow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ShowList />}/>
        <Route path="/add" element={<AddShow />} />
        <Route path='/update/:id' element={<UpdateShow />}/>
        <Route path='/logout' element={<h1>Logout</h1>}/>
        </Route>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
