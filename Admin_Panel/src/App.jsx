import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import Student from './pages/Student';
import Users from './pages/users';
import Courses from './pages/Courses';
import Blogs from './pages/Blogs';
import States from './pages/States';
import Cities from './pages/Cities';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/student" element={<Student />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/blogs" element={<Blogs></Blogs>} />
        <Route path="/states" element={<States></States>}/>
        <Route path="/cities" element={<Cities></Cities>}/>
      </Routes>
    </div>
  )
}

export default App
