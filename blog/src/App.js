import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Write from './Pages/Write/Write';
import View from './Pages/Viewall/View';
import Myprofile from './Pages/Myprofile/Myprofile';
import { UserProvider } from './UserContext';
import Singlepost from './Pages/Singlepost/Singlepost';
import { Requireauth } from './Auth';
import { Logout } from './Logout';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Logout' element={<Logout />}></Route>

          <Route path='/Write' element={<Requireauth><Write /></Requireauth>} />
          <Route path='/Write/:postId' element={<Requireauth><Write /></Requireauth>} />
          <Route path='/View' element={<Requireauth><View /> </Requireauth>}/>
          <Route path='/Myprofile' element={<Requireauth><Myprofile /></Requireauth>} />
          <Route path='/Singlepost/:postId' element={<Requireauth><Singlepost /></Requireauth>} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
