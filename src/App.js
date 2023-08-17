import React from 'react';
import {Routes, Route} from 'react-router-dom';
import FirstPage from "./pages/First";
import FarmPage from "./pages/Home_Farm";
import GuestPage from "./pages/Home_Guest";
import SearchPage from './pages/Search';
import FindWorker from './pages/FindWorker';
import EditProfile from './pages/EditProfile';
import EditInventory from './pages/EditInventory';
import ApplyWorker from './pages/ApplyWorker';
import Write from './pages/write';
import Info from './pages/Info';
import Card from './pages/Card';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Editwrite from './pages/Editwrite';
import AddRecord from './pages/AddRecord';
import AddInventory from './pages/AddInventory';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
    <Routes>
    <Route path="/" element = {<FirstPage/>} />
    <Route path="/farm" element = {<FarmPage/>} />
    <Route path="/guest" element = {<GuestPage/>} />
    <Route path="/search" element={<SearchPage/>}/>
    <Route path='/findworker' element={<FindWorker/>}/>
    <Route path="*" element={<div>404 NotFound</div>}/>
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path="/edit-inventory" element={<EditInventory />} />
    <Route path="/write" element={<Write />} />
    <Route path="/apply" element={<ApplyWorker/>}/>
    <Route path='/info' element={<Info/>}/>
    <Route path='/card' element={<Card/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/edit-write' element={<Editwrite/>}/>
    <Route path='/add-inventory' element={<AddInventory/>}/>
    <Route path="/add-record" element={<AddRecord />} />

    </Routes>
    </AuthProvider>
  )
}

export default App;
