import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import Update from './components/Update';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';



function App() {
  
  const [searchField, setSearchField] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Nav setSearchField={setSearchField} />
        <Routes>
            <Route path='/' element={<Home searchField={searchField} />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update' element={<Update />} />
            <Route path='/logout' />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />



    </div>
  );
}

export default App;
