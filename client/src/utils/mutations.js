<<<<<<< HEAD
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $lastname: String!, $dob: Date!, $email: String!, $licenseid: String!, $specialty: String!, $username: String!, $password: String!) {
    addUser(name: $name, lastname: $lastname, dob: $dob, email: $email, licenseid: $licenseid, specialty: $specialty, username: $username, password: $password) {
      _id
      name
      lastname
      username
      email
    }
  }
`;

export const ADD_PATIENT = gql`
mutation addPatient($name: String!, $lastname: String!,  $dob: Date!, $officialID: String!, $email: String!, $bloodgroup: String, $phone: String, $users: ID) {
  addPatient(name: $name, lastname: $lastname, dob: $dob, officialID: $officialID, email: $email, bloodgroup: $bloodgroup, phone: $phone, users: $users) {
    _id
    name
    lastname
    dob
    officialID
    email
    bloodgroup
    phone
    medicalrecords{
      _id
    }        
  }
}
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_MEDICAL_RECORD = gql`
mutation addMedicalRecord($user: ID!, $patient: ID!, $medicalstory: String!, $currentcondition: String!, $physicalexploration: String!, $diagnostic: String!, $treatmentPrescription: String!, $orderofstudies: String!) {
  addMedicalRecord(user: $user, patient: $patient, medicalstory: $medicalstory, currentcondition: $currentcondition, physicalexploration: $physicalexploration, diagnostic: $diagnostic, treatment_prescription: $treatmentPrescription, orderofstudies: $orderofstudies) {
    medicalRecord {
      _id
      medicalstory
      currentcondition
    }
    user {
      name
      lastname
    }
    patient {
      name
      lastname
    }
  }
}
`

export const EDIT_MEDICAL_RECORD = gql`
mutation editMedicalRecord($medicalRecordId: ID!,  $medicalstory: String!, $currentcondition: String!, $physicalexploration: String!, $diagnostic: String!, $treatment_prescription: String!, $orderofstudies: String!) {
  editMedicalRecord(medicalRecordId: $medicalRecordId, medicalstory: $medicalstory, currentcondition: $currentcondition, physicalexploration: $physicalexploration, diagnostic: $diagnostic, treatment_prescription: $treatment_prescription, orderofstudies: $orderofstudies) {
    medicalstory
    currentcondition
    physicalexploration
    diagnostic
    treatment_prescription
    orderofstudies
  }
}
`

export const DELETE_MEDICAL_RECORD = gql`
mutation deleteMedicalRecord($medicalRecordId: ID!) {
  deleteMedicalRecord(medicalRecordId: $medicalRecordId) {
    medicalRecord {
      diagnostic
    }
  }
}
`










export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USERv1 = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;
=======
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $lastname: String!, $dob: Date!, $email: String!, $licenseid: String!, $specialty: String!, $username: String!, $password: String!) {
    addUser(name: $name, lastname: $lastname, dob: $dob, email: $email, licenseid: $licenseid, specialty: $specialty, username: $username, password: $password) {
      _id
      name
      lastname
      username
      email
    }
  }
`;

export const ADD_PATIENT = gql`
mutation addPatient($name: String!, $lastname: String!,  $dob: Date!, $officialID: String!, $email: String!, $bloodgroup: String, $phone: String, $users: ID) {
  addPatient(name: $name, lastname: $lastname, dob: $dob, officialID: $officialID, email: $email, bloodgroup: $bloodgroup, phone: $phone, users: $users) {
    _id
    name
    lastname
    dob
    officialID
    email
    bloodgroup
    phone
    medicalrecords{
      _id
    }        
  }
}
`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_MEDICAL_RECORD = gql`
mutation addMedicalRecord($userId: ID!, $patientId: ID!, $medicalstory: String!, $currentcondition: String!, $physicalexploration: String!, $diagnostic: String!, $treatmentPrescription: String!, $orderofstudies: String!) {
  addMedicalRecord(userId: $userId, patientId: $patientId, medicalstory: $medicalstory, currentcondition: $currentcondition, physicalexploration: $physicalexploration, diagnostic: $diagnostic, treatment_prescription: $treatmentPrescription, orderofstudies: $orderofstudies) {
    medicalRecord {
      _id
      medicalstory
      currentcondition
    }
    user {
      name
      lastname
    }
    patient {
      name
      lastname
    }
  }
}
`












export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USERv1 = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
