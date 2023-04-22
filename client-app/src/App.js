import 'antd/dist/antd.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import FirstStaffLoginPage from './components/FirstStaffLoginPage';
import FirstLoginPage from './components/FirstLoginPage';

function App() {
  return (
    <div>
      {
        localStorage.getItem("token")
          ? (
            ((localStorage.getItem("role") === "Admin") ? <FirstLoginPage/> : <FirstStaffLoginPage/>) 
          )
          : (
            <Routes>
              <Route path='*' element={<Login />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          )
      }
    </div>
  );
}
export default App;
