<<<<<<< HEAD
const { Schema, model } = require('mongoose');

// Schema to create MedicalRecord model
const medicalRecordSchema = new Schema(
  {
    medicalstory: { type: String, required: true, trim: true },
    currentcondition: { type: String, required: true, trim: true },
    physicalexploration: { type: String, required: true, trim: true },
    diagnostic: { type: String, required: true, trim: true },
    treatment_prescription: { type: String, required: true, trim: true },
    orderofstudies: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },

    //one medical record have just one patient
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'patient'
    },
    
    //one medical record was created just for one user
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const MedicalRecord = model('medicalrecord', medicalRecordSchema);

module.exports = MedicalRecord;
=======
const { Schema, model } = require('mongoose');

// Schema to create MedicalRecord model
const medicalRecordSchema = new Schema(
  {
    medicalstory: { type: String, required: true, trim: true },
    currentcondition: { type: String, required: true, trim: true },
    physicalexploration: { type: String, required: true, trim: true },
    diagnostic: { type: String, required: true, trim: true },
    treatment_prescription: { type: String, required: true, trim: true },
    orderofstudies: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },

    //one medical record have just one patient
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'patient'
    },
    
    //one medical record was created just for one user
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const MedicalRecord = model('medicalrecord', medicalRecordSchema);

module.exports = MedicalRecord;
>>>>>>> abda662c57dad32b13ddb96ff3e2dfd86a6b08c2
