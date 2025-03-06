import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './markup/component/Header';
import Admin from './markup/pages/Admin';
import Login from './markup/pages/Login';
import Manager from './markup/pages/Manager';
import CreateUser from './markup/component/form/Create/CreateUser';
import UpdateUser from './markup/component/form/update/UpdateUser';
import UserManagement from './markup/component/admin/UserManagement';

function App() {
  return (
   <>
   <div className='w-screen h-full'>
     <Header />
      <Routes>
       <Route path="/admin" element={<Admin />}/>
       <Route path="/" element={<Login />}/>
       <Route path="/manager" element={<Manager />}/>

   


       <Route path="/userManagement" element={<UserManagement />}/>
       <Route path="/create-user" element={<CreateUser />}/>
       <Route path="/update-user/:id" element={<UpdateUser/>}/>


      </Routes>


   </div>
     
   </>
      
   
  );
}

export default App;
