import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar";
import Drive from "./Components/Drive";
import Model from "./Components/Model";
import FolderModel from "./Components/FolderModel";
import Folder from "./Components/Folder";
import PhotoModel from "./Components/PhotoModel";
import PhotoDisplay from "./Components/photoDisplay";
import { useSelector, useDispatch } from "react-redux";
import { selectUid, setLogIn, setLogOut } from "./Slices/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { MDBContainer } from 'mdb-react-ui-kit';
import { AuthProvider } from './context/AuthContext';
import Login from './authentication/Login';
import Register from './authentication/Register';
import PrivateRoute from './authentication/PrivateRoute';
import Dashboard from './authentication/Dashboard';
import UpdateProfile from './authentication/UpdateProfile';
import ForgotPassword from './authentication/ForgotPassword';

function App() {
  const user = useSelector(selectUid);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogIn({ uid: user.uid, photo: user.photoURL }));
      } else {
        dispatch(setLogOut({ uid: null, photo: null }));
      }
    });
  });

  return (
    <MDBContainer >
    <Router>
      <Header />
      {user ? (
        <>
          <Container>
            <SideBar />
            <Routes>
              <Route path="/" element={<Drive />} />
              <Route path="/folder/:name/:id" element={<Folder />} />
            </Routes>
          </Container>
          <Model />
          <PhotoModel />
          <FolderModel />
          <PhotoDisplay />
        </>
      ) : (
        
        <AuthProvider>
            <Routes>
              <Route path = '/' element = {
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path = '/update-profile' element = {
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              } />
              <Route path='/login' element = {<Login />} />
              <Route path='/register' element = {<Register />} />
              <Route path = '/forgot-password' element = {<ForgotPassword />} />
            </Routes>
          
          </AuthProvider>
      )}
    </Router>
    </MDBContainer>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;
