<<<<<<< HEAD
//import React, { useState } from 'react';
import React from 'react';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_MEDICAL_RECORD } from '../../utils/queries';

import Auth from '../../utils/auth';
import { format } from 'date-fns';

import MedicalRecordPatientForm from '../MedicalRecords/medicalRecordPatientForm';

const MedicalRecordPatient = () => {
  
  const { medicalRecordId } = useParams();
 

  const { loading, data } = useQuery(QUERY_SINGLE_MEDICAL_RECORD, {
    // pass URL parameter
    variables: { medicalRecordId: medicalRecordId },
  });

  const medicalrecord = data?.medicalrecord || {};
  console.log('medicalrecord.medicalstory',medicalrecord.medicalstory);


  if (loading) {
    return <div>Loading...</div>;
  }

   return (        
    <div>                    
          {Auth.loggedIn() ? (            
            <> 
          
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Patient: {medicalrecord.patient.name+' '+medicalrecord.patient.lastname}<br />
                Date: {format(medicalrecord.createdAt,'dd-MM-yyyy hh:mm')} 
              </div>
              {
                <div className="my-1 p-1" style={{ border: '1px' }}>
                  <MedicalRecordPatientForm 
                    medicalrecord={medicalrecord}
                  />
                </div>
              }
             
            </>
              ) : (
                 <>
                   <div>You need to login</div>
                 </>
              )}
    </div>    
  );
};

export default MedicalRecordPatient;
=======
import React, { useState } from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_MEDICAL_RECORD } from '../../utils/queries';

import Auth from '../../utils/auth';
import { format } from 'date-fns';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_MEDICAL_RECORD } from '../../utils/mutations';

const MedicalRecordPatient = () => {
  
  const { medicalRecordId } = useParams();
 
  
  const { loading, data } = useQuery(QUERY_SINGLE_MEDICAL_RECORD, {
    // pass URL parameter
    variables: { medicalRecordId: medicalRecordId },
  });

  const medicalrecord = data?.medicalrecord || {};
  console.log('medicalrecord.medicalstory',medicalrecord.medicalstory);


  const [show, setShow] = useState(false);
  const [medicalstory, setMedicalStory] = useState('test');
  const [currentcondition, setCurrentCondition] = useState('');   
  const [physicalexploration, setPhysicalExploration] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [treatmentPrescription, setTreatmentPrescription] = useState('');
  const [orderofstudies, setOrderofStudies] = useState('');    
  const [errorMessage, setErrorMessage] = useState('');

  const [addMedicalRecord, { error }] = useMutation(ADD_MEDICAL_RECORD);

  //setMedicalStory('test');


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
    
    const patientId = medicalrecord.patient._id;
    const userId = Auth.getProfile().data._id;

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








  if (loading) {
    return <div>Loading...</div>;
  }
  return (        
    <div>                    
          {Auth.loggedIn() ? (            
            <> 
            <Form>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Patient: {medicalrecord.patient.name+' '+medicalrecord.patient.lastname}<br />
                Date: {format(medicalrecord.createdAt,'dd-MM-yyyy hh:mm')} 
              </div>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Diagnostic: {medicalrecord.diagnostic}  
              </div>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Medical Story: {medicalrecord.medicalstory} 
              </div>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Current Condition: {medicalrecord.currentcondition}  
              </div>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Physica Exploration: {medicalrecord.physicalexploration}  
              </div>             
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Treatment Prescription: {medicalrecord.treatment_prescription}  
              </div>
              <div className="mt-3 mb-2"  style={{ backgroundColor: '#1d3557', color: 'white', padding: '10px'}}>
                Order of studies: {medicalrecord.orderofstudies}  
              </div>
            </Form>
            
             
            <div className="border my-4 p-4" style={{border: '1px', borderRadius: "1rem" }}>    
            <Form
                    onSubmit={handleFormSubmit}
                    >
                        <h5 className="fw-normal" style={{ letterSpacing: "1px" }}>Medical Record</h5>
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
                    </div>
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



             
            </>
              ) : (
                 <>
                   <div>You need to login</div>
                 </>
              )}
    </div>    
  );
};

export default MedicalRecordPatient;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
