import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { QUERY_addUSERS } from '../../utils/queries';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';

import Auth from '../utils/auth';

const UserForm = () => {
  
  const [show, setShow] = useState(false);
  
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');   
  const [dob, setDob] = useState('');  
  const [email, setEmail] = useState('');
  const [licenseid, setLicenseid] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  /*
  const [formState, setFormState] = useState({
    name: '',
    lastname: '',
    dob:'',
    email:'',
    licenseid:'',
    specialty:'',
    username:'',
    password:''
  });*/
 
  // Set up our mutation with an option to handle errors
  //the next lines are used with window.location.reload()
  /*
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_USER` mutation
    try {    
      if(error) setShow(true);
      const { data } = await addUser({
        variables: { ...formState },
      });
      alert(data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
*/

const [addUser, { error }] = useMutation(ADD_USER, {
    update(cache, { data: { addUser } }) {
      try {
        const { users } = cache.readQuery({ query: QUERY_addUSERS });

        cache.writeQuery({
          query: QUERY_addUSERS,
          data: { users: [addUser, ...users] },           
        });       
      } catch (e) {
        console.error(e);
      }
      
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {    
        if(error) setShow(true);
        //console.log('formState ',formState);
        const { data } = await addUser({
          variables: { name, lastname, dob, email, licenseid, specialty, username, password },
        });

        setName('');
        setLastName('');   
        setDob('');  
        setEmail('');
        setLicenseid('');
        setSpecialty('');
        setUsername('');
        setPassword('');


        /*
        setFormState(
            {
                name: '',
                lastname: '',
                dob:'',
                email:'',
                licenseid:'',
                specialty:'',
                username:'',
                password:''
            }
        );*/

        //console.log('data',data);  
        Auth.login(data.addUser.token);
        window.location.replace('/dashboard');
        
      } catch (err) {
        console.error(err);
      }
  };


  const handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
/*
    const { name, value } = event.target;
    setFormState({
        ...formState,
        [name]: value
    });
   // console.log(' name ',name,' value ',value);
*/

        const { target } = event;
        const inputType = target.name;
        const inputValue = target.value;

        // Based on the input type, we set the state 
        if (inputType === 'name') {
            setName(inputValue);
        } else if (inputType === 'lastname') {
            setLastName(inputValue);
        } else if (inputType === 'dob') {
            setDob(inputValue);
        } else if (inputType === 'licenseid') {
            setLicenseid(inputValue);
        } else if (inputType === 'specialty') {
            setSpecialty(inputValue);        
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'username') {
            setUsername(inputValue);
        } else {
            setPassword(inputValue);
        }


  };

  const closeAlert = async () => {
    setShow(false);
  }

  return (
    <Row className="d-flex justify-content-center align-items-center h-100">
        <Card style={{ borderRadius: "1rem" }}>
            <Card.Body className="p-4 p-lg-5 text-black">
                {/* SignUp form section */}
                <Form onSubmit={handleFormSubmit}>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign up</h5>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                size='lg'
                                type="name"
                                placeholder="Name"
                                name='name'
                                value={name}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                size='lg'
                                type="lastname"
                                placeholder="Last Name"
                                name='lastname'
                                value={lastname}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                size='lg'
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridSpeciality">
                            <Form.Label>Specialty</Form.Label>
                            <Form.Control
                                size='lg'
                                type="specialty"
                                placeholder="Specialty"
                                name='specialty'
                                value={specialty}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                size='lg'
                                type="username"
                                placeholder="Username"
                                name='username'
                                value={username}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                size='lg'
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={password}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                size='lg'
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={email}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridlicenseid">
                            <Form.Label>Medical License /ID</Form.Label>
                            <Form.Control
                                size='lg'
                                type="licenseid"
                                placeholder="Medical License/ID"
                                name='licenseid'
                                value={licenseid}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    
                    <Button size='lg' variant="dark" type="submit" style={{ marginTop: '10px'}}>
                        Submit
                    </Button>
                </Form>
                {error && (
                    <Alert show={show} variant="info" onClose={() => closeAlert()} dismissible>
                        <p>{error.message}</p>
                    </Alert>
                )}
            </Card.Body>
        </Card>
    </Row>
  );

};

export default UserForm;
