import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PATIENT } from '../../utils/mutations';
import { QUERY_PATIENTS } from '../../utils/queries';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';

import Auth from '../../utils/auth';

const UserForm = () => {
  
  const [show, setShow] = useState(false);
  
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');   
  const [dob, setDob] = useState('');
  const [officialID, setOfficialid] = useState('');  
  const [email, setEmail] = useState('');
  const [bloodgroup, setBloodgroup] = useState('');
  const [phone, setPhone] = useState('');
   

const [addPatient, { error }] = useMutation(ADD_PATIENT, {
    update(cache, { data: { addPatient } }) {
      try {
        const { patients } = cache.readQuery({ query: QUERY_PATIENTS });

        cache.writeQuery({
          query: QUERY_PATIENTS,
          data: { patients: [addPatient, ...patients] },           
        });       
      } catch (e) {
        console.error(e);
      }
      
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {   
        const actualUser = Auth.getProfile().data._id;
        const users=actualUser;
        console.log('id actual user', actualUser); 

        if(error) setShow(true);
        //console.log('formState ',formState);
        const { data } = await addPatient({
          variables: { name, lastname, dob, officialID, email, bloodgroup, phone, users},
        });

        setName('');
        setLastName('');   
        setDob('');
        setOfficialid('');  
        setEmail('');     
        setBloodgroup('');
        setPhone('');   

        console.log('data',data);  
        
        
      } catch (err) {
        console.error(err);
      }
  };


  const handleInputChange = (event) => {
        const { target } = event;
        const inputType = target.name;
        //const inputName
        const inputValue = target.value;

        // Based on the input type, we set the state 
        if (inputType === 'name') {
            setName(inputValue);
        } else if (inputType === 'lastname') {
            setLastName(inputValue);
        } else if (inputType === 'dob') {
            setDob(inputValue);
        } else if (inputType === 'officialID') {
            setOfficialid(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'bloodgroup') {
            setBloodgroup(inputValue);                        
        } else {
            setPhone(inputValue);
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
                    <h5 className="fw-normal" style={{ letterSpacing: "1px" }}>Add Patient</h5>
                    {/*UserId:*/} {/*Auth.getProfile().data._id*/}
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                size='md'
                                type="name"
                                placeholder="Name"
                                name='name'
                                value={name}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                size='md'
                                type="lastname"
                                placeholder="Last Name"
                                name='lastname'
                                value={lastname}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridDOB">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                size='md'
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                    
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="formGridOfficialId">
                            <Form.Label>Official Id</Form.Label>
                            <Form.Control
                                size='md'
                                type="officialID"
                                placeholder="Official Id"
                                name='officialID'
                                value={officialID}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                size='md'
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={email}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridBloodgroup">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Control
                                size='md'
                                type="bloodgroup"
                                placeholder="Blood Group"
                                name='bloodgroup'
                                value={bloodgroup}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                size='md'
                                type="phone"
                                placeholder="Phone"
                                name='phone'
                                value={phone}
                                onChange={handleInputChange} />
                        </Form.Group>
                    </Row>
                   
                    
                    <Button size='md' variant="dark" type="submit" style={{ marginTop: '10px'}}>
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
