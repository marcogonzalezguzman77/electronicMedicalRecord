<<<<<<< HEAD
const db = require("../config/connection");
const { User, Patient, MedicalRecord } = require("../models");

const userSeeds = require("./userSeeds.json");
const patientSeeds = require("./patientSeeds.json");
const medicalRecordSeeds = require("./medicalRecordSeeds.json");

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Patient.deleteMany({});
  await MedicalRecord.deleteMany({});

  // bulk create each model
  const users = await User.insertMany(userSeeds);
  const patients = await Patient.insertMany(patientSeeds);
  const medicalrecords = await MedicalRecord.insertMany(medicalRecordSeeds);


  for (newMedicalRecord of medicalrecords) {
    // randomly add each class to a school
    /*const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    tempSchool.classes.push(newClass._id);
    await tempSchool.save();
    */

    //agregar aleatoriamente un usuario a cada medicalrecord
    //ONE TO ONE
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newMedicalRecord.user = tempUser._id;
    await newMedicalRecord.save();

    // referenciar medicalrecord en user model, tambien
    //ONE TO ONE
    tempUser.medicalrecords.push(newMedicalRecord._id);
    await tempUser.save();

    //agregar aleatoriamente un paciente a cada medicalrecord
    //ONE TO ONE
    const tempPatient = patients[Math.floor(Math.random() * patients.length)];
    newMedicalRecord.patient = tempPatient._id;
    await newMedicalRecord.save();

    // referenciar medicalrecord en patient model, tambien
    //ONE TO ONE
    tempPatient.medicalrecords.push(newMedicalRecord._id);
    await tempPatient.save();
    
}

for (newPatient of patients) {
  // randomly add a user to each patient
   const tempUser = users[Math.floor(Math.random() * users.length)];
   newPatient.users = tempUser._id;
   await newPatient.save();

   // reference patient on user model, too
   tempUser.patients.push(newPatient._id);
   await tempUser.save();
   
}


  console.log('all done!');
  process.exit(0);
});
=======
const db = require("../config/connection");
const { User, Patient, MedicalRecord } = require("../models");

const userSeeds = require("./userSeeds.json");
const patientSeeds = require("./patientSeeds.json");
const medicalRecordSeeds = require("./medicalRecordSeeds.json");

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Patient.deleteMany({});
  await MedicalRecord.deleteMany({});

  // bulk create each model
  const users = await User.insertMany(userSeeds);
  const patients = await Patient.insertMany(patientSeeds);
  const medicalrecords = await MedicalRecord.insertMany(medicalRecordSeeds);


  for (newMedicalRecord of medicalrecords) {
    // randomly add each class to a school
    /*const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    tempSchool.classes.push(newClass._id);
    await tempSchool.save();
    */

    //agregar aleatoriamente un usuario a cada medicalrecord
    //ONE TO ONE
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newMedicalRecord.user = tempUser._id;
    await newMedicalRecord.save();

    // referenciar medicalrecord en user model, tambien
    //ONE TO ONE
    tempUser.medicalrecords.push(newMedicalRecord._id);
    await tempUser.save();

    //agregar aleatoriamente un paciente a cada medicalrecord
    //ONE TO ONE
    const tempPatient = patients[Math.floor(Math.random() * patients.length)];
    newMedicalRecord.patient = tempPatient._id;
    await newMedicalRecord.save();

    // referenciar medicalrecord en patient model, tambien
    //ONE TO ONE
    tempPatient.medicalrecords.push(newMedicalRecord._id);
    await tempPatient.save();
    
}

for (newPatient of patients) {
  // randomly add a user to each patient
   const tempUser = users[Math.floor(Math.random() * users.length)];
   newPatient.users = tempUser._id;
   await newPatient.save();

   // reference patient on user model, too
   tempUser.patients.push(newPatient._id);
   await tempUser.save();
   
}


  console.log('all done!');
  process.exit(0);
});
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
