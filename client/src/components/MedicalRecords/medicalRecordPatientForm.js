//import React from 'react';
import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
//import { ADD_MEDICAL_RECORD } from '../../utils/mutations';
import { EDIT_MEDICAL_RECORD } from '../../utils/mutations';
import { DELETE_MEDICAL_RECORD } from '../../utils/mutations';
//import Auth from '../../utils/auth';
import { useParams } from 'react-router-dom';

const MedicalRecordPatientForm = ({ medicalrecord}) => {
  const { medicalRecordId } = useParams();
  console.log('medicalRecordId',medicalRecordId);
  const patientId = medicalrecord.patient._id;
  console.log('medicalRecordPatientId',patientId);

  const [show, setShow] = useState(false);
  const [medicalstory, setMedicalStory] = useState(medicalrecord.medicalstory);
  const [currentcondition, setCurrentCondition] = useState(medicalrecord.currentcondition);   
  const [physicalexploration, setPhysicalExploration] = useState(medicalrecord.physicalexploration);
  const [diagnostic, setDiagnostic] = useState(medicalrecord.diagnostic);
  const [treatment_prescription, setTreatmentPrescription] = useState(medicalrecord.treatment_prescription);
  const [orderofstudies, setOrderofStudies] = useState(medicalrecord.orderofstudies);    
  const [errorMessage, setErrorMessage] = useState('');

  //const [addMedicalRecord, { error }] = useMutation(ADD_MEDICAL_RECORD);
  const [editMedicalRecord, { errorEdit }] = useMutation(EDIT_MEDICAL_RECORD);
  const [deleteMedicalRecord, { errorDelete }] = useMutation(DELETE_MEDICAL_RECORD);

  //setMedicalStory('test');

  const state = {
    button: 1
  };

  const handleInputChange = (e) => {
    
    // Getting the value and medicalstory of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    console.log('inputValue',inputValue);

    // Based on the input type, we set the state 
    if (inputType === 'medicalstory') {
        setMedicalStory(inputValue);
    } else if (inputType === 'currentcondition') {
        setCurrentCondition(inputValue);
    } else if (inputType === 'physicalexploration') {
        setPhysicalExploration(inputValue);
    } else if (inputType === 'diagnostic') {
        setDiagnostic(inputValue);
    } else if (inputType === 'treatment_prescription') {
        setTreatmentPrescription(inputValue);
    } 
    else {
        setOrderofStudies(inputValue);
    }
};
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
   // const patientId = medicalrecord.patient._id;
   // const userId = Auth.getProfile().data._id;

   //if botton is edit
   if (state.button === 1) {
    console.log("Edit!!!");  

          try {
            if(errorEdit) setShow(true);
            const { data } = await editMedicalRecord({
              variables: { medicalRecordId, medicalstory, currentcondition,
              physicalexploration, diagnostic, treatment_prescription, orderofstudies  },
            });
            console.log('data medical record updated',data);          
            
            window.location.reload();

          } catch (err) {
            console.error(err);
          }
    }
    
    if (state.button === 2) {
      console.log("Delete!!!");

      try {
        if(errorDelete) setShow(true);
        const { data } = await deleteMedicalRecord({
          variables: { medicalRecordId },
        });
        console.log('data medical record deleted',data);
     
        //window.location.reload();
        window.location.replace('/medicalrecords/'+patientId)

      } catch (err) {
        console.error(err);
      }



    }
    
  };

  const closeAlert = async () => {
    setShow(false);
  }





  if (!medicalrecord) {
    return (
      <div>       
        <h3>No Medical Record Yet</h3>        
      </div>
    )
  }

  return (
    <div>      
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
                        size='md'
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
                        type="treatment_prescription"
                        placeholder="Treatment or/and Prescription"
                        name='treatment_prescription'
                        value={treatment_prescription}
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

            <Button size='md' variant="warning" type="submit"  onClick={() => (state.button = 1)}>
                Edit
            </Button>
            <Button className="mx-4 my-2" size='md' variant="danger" type="submit" onClick={() => (state.button = 2)}>
                Delete
            </Button>
        </Form>        
        </div>

        {errorMessage && (
            <Alert variant="info" onClose={() => setErrorMessage('')} dismissible>
                <p>{errorMessage}</p>
            </Alert>
        )}

        {errorEdit && (
            <Alert show={show} variant="info" onClose={() => closeAlert()} dismissible>
                <p>{errorEdit.message}</p>
            </Alert>
        )}

        {errorDelete && (
            <Alert show={show} variant="info" onClose={() => closeAlert()} dismissible>
                <p>{errorDelete.message}</p>
            </Alert>
        )}

    </div>
  );
};

export default MedicalRecordPatientForm;
