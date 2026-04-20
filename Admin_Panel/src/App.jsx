import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import Student from './pages/Student';
import Users from './pages/Users';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import States from './pages/States';
import Cities from './pages/Cities';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Instructor from './pages/Instructor';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/student" element={<Student />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/blogs" element={<Blogs></Blogs>} />
        <Route path="/states" element={<States></States>}/>
        <Route path="/cities" element={<Cities></Cities>}/>
        <Route path="/contacts" element={<Contacts></Contacts>}/>
        <Route path="/instructors" element={<Instructor></Instructor>}/> 
        <Route path="/changepassword" element={<ChangePassword></ChangePassword>}/>
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} />
        <Route path="/verifyotp" element={<VerifyOtp></VerifyOtp>} />
        <Route path="/resetpassword" element={<ResetPassword></ResetPassword>} />
      </Routes>
    </div>
  )
}

export default App
