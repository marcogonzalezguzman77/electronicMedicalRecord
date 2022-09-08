const db = require("../config/connection");
const { User, Patient, MedicalRecord } = require("../models");

const userSeeds = require("./userSeeds.json");
const patientSeeds = require("./patientSeeds.json");
const medicalRecordSeeds = require("./medicalRecordSeeds.json");

db.once("open", async() => {
    await User.deleteMany({});
    await Patient.deleteMany({});
    await MedicalRecord.deleteMany({});

    //function for selecting array elements randomly
    //without repeating elements
    function randomNoRepeats(array) {
      var copy = array.slice(0);
      return function() {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        //console.log('item',item);
        return item;
      };
    }


    //Create medical records on db
    const medicalrecords = await MedicalRecord.insertMany(medicalRecordSeeds);

    //CODE FOR patients TABLE
    //create  medical records ids array
    let medicalRecordsIds = medicalrecords.map(mr => mr._id);
    //choose medical records id for patient table
    var chooseMRforP = randomNoRepeats(medicalRecordsIds);    
    
    //Define and create patients in db by adding references to medical records table
    const patientsToCreate = patientSeeds.map(patientseed => ({
        ...patientseed,
        medicalrecords: chooseMRforP()       
    }));
    const patients = await Patient.insertMany(patientsToCreate);
    
    //CODE FOR users TABLE
    //create  patients ids array
    const patientIds = patients.map(pts => pts._id);
    //choose medical records id for users table
    var chooseMRforU = randomNoRepeats(medicalRecordsIds);
    //choose patientes id for users table
    var choosePforU = randomNoRepeats(patientIds);
    //Define and create users in db by adding references to medical records and patients table
    const usersToCreate = userSeeds.map(user => ({
        ...user,
        medicalrecords: chooseMRforU(),
        //patients: choosePforU()
    }));    
    const users = await User.insertMany(usersToCreate);

    //CODE for adding users table to patient table 
    //and its references for both tables
    //One patient belong to some users 0NE-TO-MANY relations
    //One user have some patiens ONE-TO-MANY relations    
    for (newPatient of patients) {
       // randomly add a user to each patient
        const tempUser = users[Math.floor(Math.random() * users.length)];
        newPatient.users = tempUser._id;
        await newPatient.save();

        // reference patient on user model, too
        tempUser.patients.push(newPatient._id);
        await tempUser.save();
        
    }

    console.log("Successfully seeded the db");
    process.exit(0);
})