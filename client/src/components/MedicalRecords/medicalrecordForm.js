import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
//import './style.css';

import { useMutation } from '@apollo/client';

import { ADD_MEDICAL_RECORD } from '../../utils/mutations';

const MedicalRecordForm = ({ patientId, userId }) => {
  //const [skill, setSkill] = useState('');
  const [show, setShow] = useState(false);
  const [medicalstory, setMedicalStory] = useState('');
  const [currentcondition, setCurrentCondition] = useState('');   
  const [physicalexploration, setPhysicalExploration] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [treatmentPrescription, setTreatmentPrescription] = useState('');
  const [orderofstudies, setOrderofStudies] = useState('');    
  const [errorMessage, setErrorMessage] = useState('');

  const [addMedicalRecord, { error }] = useMutation(ADD_MEDICAL_RECORD);

  const handleInputChange = (e) => {
    // Getting the value and medicalstory of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state 
    if (inputType === 'medicalstory') {
        setMedicalStory(inputValue);
    } else if (inputType === 'currentcondition') {
        setCurrentCondition(inputValue);
    } else if (inputType === 'physicalexploration') {
        setPhysicalExploration(inputValue);
    } else if (inputType === 'diagnostic') {
        setDiagnostic(inputValue);
    } else if (inputType === 'treatmentPrescription') {
        setTreatmentPrescription(inputValue);
    } 
    else {
        setOrderofStudies(inputValue);
    }
};
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if(error) setShow(true);
      const { data } = await addMedicalRecord({
        variables: { patientId, userId, medicalstory, currentcondition,
        physicalexploration, diagnostic, treatmentPrescription, orderofstudies  },
      });
      console.log('data medical record',data);
      setMedicalStory('');
      setCurrentCondition('');
      setPhysicalExploration('');
      setDiagnostic('');
      setTreatmentPrescription('');
      setOrderofStudies('');  
      
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  const closeAlert = async () => {
    setShow(false);
  }

  return (
    <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-4 p-lg-5 text-black">
                   {/* UserId: {userId} */}
                    {/* New Medical Record form section */}
                    <Form
                    onSubmit={handleFormSubmit}
                    >
                        <h5 className="fw-normal" style={{ letterSpacing: "1px" }}>Add Medical Record</h5>
                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridMedicalStory">
                                <Form.Label>Medical Story/Backgrounds</Form.Label>
                                <Form.Control 
                                    as="textarea" rows={3}                                   
                                    type="medicalstory"
                                    placeholder="Medical Backgrounds"
                                    name='medicalstory'
                                    value={medicalstory}
                                    onChange={handleInputChange} />
                            </Form.Group>                            
                        </Row>

                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridCurrentCondition">
                                <Form.Label>Current Condition</Form.Label>
                                <Form.Control
                                     as="textarea" rows={3} 
                                    type="currentcondition"
                                    placeholder="Current Condition"
                                    name='currentcondition'
                                    value={currentcondition}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Row>


                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridPhysicalExploration">
                                <Form.Label>Physical Exploration</Form.Label>
                                <Form.Control
                                     as="textarea" rows={3} 
                                    type="physicalexploration" 
                                    name="physicalexploration" 
                                    placeholder="Physical Exploration"
                                    value={physicalexploration}
                                    onChange={handleInputChange} />
                            </Form.Group>                           
                        </Row>


                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridDiagnostic">
                                <Form.Label>Diagnostic</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="diagnostic"
                                    placeholder="Diagnostic"
                                    name='diagnostic'
                                    value={diagnostic}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Row>



                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridTreatementPrescription">
                                <Form.Label>Treatement-Prescription</Form.Label>
                                <Form.Control
                                     as="textarea" rows={3} 
                                    type="treatmentPrescription"
                                    placeholder="Treatment or/and Prescription"
                                    name='treatmentPrescription'
                                    value={treatmentPrescription}
                                    onChange={handleInputChange} />
                            </Form.Group>                           
                        </Row>


                        <Row className="mb-1">
                            <Form.Group as={Col} controlId="formGridOrderofStudies">
                                <Form.Label>Order of Studies</Form.Label>
                                <Form.Control
                                     as="textarea" rows={3} 
                                    type="orderofstudies"
                                    placeholder="Order Of Studies"
                                    name='orderofstudies'
                                    value={orderofstudies}
                                    onChange={handleInputChange} />
                            </Form.Group>
                        </Row>

                        
                        <Button size='md' variant="dark" type="submit">
                            Submit
                        </Button>
                    </Form>
                    {errorMessage && (
                        <Alert variant="info" onClose={() => setErrorMessage('')} dismissible>
                            <p>{errorMessage}</p>
                        </Alert>
                    )}

                    {error && (
                        <Alert show={show} variant="info" onClose={() => closeAlert()} dismissible>
                            <p>{error.message}</p>
                        </Alert>
                    )}

                </div>
            </div>
        </div>
  );
};

export default MedicalRecordForm;
