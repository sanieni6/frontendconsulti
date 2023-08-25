import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes, Route, useLocation 
} from 'react-router-dom';
import { setLocalStorageAdminData } from './redux/adminsSlice';
import { selectAdmin } from './redux/store';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './components/users';
import './App.css'
import Navigation from './components/navigation';

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector(selectAdmin);

  useEffect(() => {
    dispatch(setLocalStorageAdminData());
  }, [dispatch, location.pathname]);

  if (admin === undefined) {
    return null;
  }

  return (
    <>
    {location.pathname !== '/login' && location.pathname !== '/signin' && <Navigation />}
      <div>
        <h1>Welcome</h1>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute isAllowed={!admin} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* <Route element={<ProtectedRoute isAllowed={Boolean(admin)} />}> */}
            <Route path="/users" element={<Users />} />
          {/* </Route> */}
          </Routes>
       </div>
    </>
  )
}

export default App
