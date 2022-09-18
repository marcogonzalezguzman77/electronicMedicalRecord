import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './components/Welcome';
import Signup from './components/Sign/SignUp';
import Login from './components/Sign/Login';
import Header from './components/Header';
import NavbarComp from './components/Navbar';
import Footer from './components/Footer';
//import Profile from './pages/Profile';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Users from './components/Users';
import AddUsers from './components/Users/addUsers';
import Patients from './components/Patients';
import AddPatient from './components/Patients/addPatient';
import MedicalRecords from './components/MedicalRecords';
import MedicalRecordPatient from './components/MedicalRecords/medicalRecordPatient.js';

import UserPatients from './components/Users/userPatients';
import MedicalRecordsPatients from './components/MedicalRecords/medicalRecordsPatient';




import Auth from '../src/utils/auth.js';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header /> 
          {Auth.loggedIn() && (
            <NavbarComp />
          )}
          <div className="container">
            <Routes>
              {/* Ready */}
              <Route               
                path="/" 
                element={<Welcome />} 
              />
              {/* Ready */}
              <Route               
                path="/login" 
                element={<Login />} 
              />
              {/* Ready */}
              <Route               
                path="/signup" 
                element={<Signup />} 
              />
              {/* Ready */}
              <Route               
                path="/dashboard" 
                element={<Dashboard />} 
              />     
              {/* Ready */}         
              <Route               
                path="/me" 
                element={<Profile />} 
              />
              {/* Ready */}
              <Route 
                path="/profile/:userId" 
                element={<Profile />} 
              />
              {/* Ready */}
              <Route 
                path="/users" 
                element={<Users />} 
              />              
              {/* Ready */}
              <Route 
                path="/patients" 
                element={<Patients />} 
              />
              {/*it doesnt work yet*/}
              <Route 
                path="/patients/:userId" 
                element={<UserPatients />} 
              />
              {/* Ready */}
              <Route 
                path="/addpatient" 
                element={<AddPatient />} 
              />
              {/* Ready */}
              <Route 
                path="/medicalrecords" 
                element={<MedicalRecords />} 
              />
              {/* Search all medical records from one patien Ready */}
              <Route 
                path="/medicalrecords/:patientId" 
                element={<MedicalRecordsPatients />} 
              />
              {/* Search one medical record from one patien Ready */}
              <Route 
                path="/medicalrecord/:medicalRecordId" 
                element={<MedicalRecordPatient />} 
              />  
              {/* addusers is like SignUp Ready */}
              <Route 
                path="/addusers" 
                element={<AddUsers />} 
              />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
