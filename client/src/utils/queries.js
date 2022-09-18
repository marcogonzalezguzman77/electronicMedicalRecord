import { gql } from '@apollo/client';


export const QUERY_USERS = gql`
query allUsers {
  users {
    _id
    name
    lastname
    dob
    email
    patients{
      _id
    }    
  }
}
`;

export const QUERY_addUSERS = gql`
query allUsers {
  users {
    _id
    name
    lastname
    email      
  }
}
`;

export const QUERY_PATIENTS = gql`
query allPatients {
  patients {
    _id
    name
    lastname
    email
    medicalrecords{
      _id
    }     
  }
}
`;

export const QUERY_addPATIENTS = gql`
query allPatients {
  patients {
    _id
    name
    lastname
    email            
  }
}
`;

export const QUERY_SINGLE_PATIENT = gql`
query singlePatient($patientId: ID!) {
  patient(patientId: $patientId) {
    _id
    name
    lastname
    medicalrecords {
      _id
      medicalstory
      currentcondition
      physicalexploration
      diagnostic
      createdAt
    }   
  }
}
`;


export const QUERY_MEDICAL_RECORDS = gql`
query allMedicalRecords {
  medicalrecords {
    _id
    medicalstory
    currentcondition
    physicalexploration
    diagnostic
    treatment_prescription
    orderofstudies
    createdAt
    patient {
      _id
      name          
    }
    user {
      _id
      name
    }
  }
}
`;


export const QUERY_SINGLE_MEDICAL_RECORD = gql`
  query singleMedicalRecord($medicalRecordId: ID!) {
    medicalrecord(medicalRecordId: $medicalRecordId) {
      _id
      medicalstory
      currentcondition
      physicalexploration
      diagnostic
      treatment_prescription
      orderofstudies
      createdAt
      patient {
        _id
        name
        lastname                  
      }
      user {
        _id        
      }
    }
  }
`;


export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      lastname
      username
      licenseid
      patients {
        _id
        name
        lastname
        medicalrecords{
          _id
          currentcondition
          diagnostic
        }
      }
      medicalrecords {
        _id
        medicalstory
        currentcondition
        physicalexploration
        treatment_prescription
        orderofstudies
        createdAt
      }
    }
  }
`;





export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      lastname
      username
      licenseid
      patients {
        _id
        name
        lastname
        medicalrecords{
          _id
          currentcondition
          diagnostic
        }
      }
      


    }
  }
`;


export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

