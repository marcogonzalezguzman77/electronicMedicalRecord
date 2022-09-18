const { User, Patient, MedicalRecord } = require("../models");
const { dateScalar } = require('./typeDefs');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Date: dateScalar,

    Query: {
        users: async () => {
            return User.find({});
        },
        patients: async () => {
            return Patient.find({});
        },
        medicalrecords: async () => {
            return MedicalRecord.find({})
            .populate('patient')
            .populate('user');
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
            .populate({
                path: 'patients',
                populate:'medicalrecords'
            })
            .populate('medicalrecords');
        },
        patient: async (parent, { patientId }) => {
            return Patient.findOne({ _id: patientId }).populate('medicalrecords');
        },
        medicalrecord: async (parent, { medicalRecordId }) => {
            return await MedicalRecord.findOne({ _id: medicalRecordId }).populate('patient');
        },
        me: async (parent, args, context) => {
          if (context.user) {
            console.log('user',context.user);
            return User.findOne({ _id: context.user._id })
            .populate({
                path: 'patients',
                populate: 'medicalrecords'
            })
            .populate('medicalrecords');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);

            return { token, user };
        },
        //User mutations
        addUser: async (parent, {
            name,
            lastname,
            dob,
            email,
            licenseid,
            specialty,
            username,
            password
        }) => {
            const user = User.create({
                name,
                lastname,
                dob,
                email,
                licenseid,
                specialty,
                username,
                password
            })

            //const token = signToken(user);

            return user;
        },




        addUserv1: async (parent, {
            name,
            lastname,
            dob,
            email,
            licenseid,
            specialty,
            username,
            password
        }) => {
            const user = User.create({
                name,
                lastname,
                dob,
                email,
                licenseid,
                specialty,
                username,
                password
            })

            const token = signToken(user);

            return { token, user };
        },

        editUser: async (parent, {
            userId,
            name,
            lastname,
            dob,
            email,
            username,
            password
        }) => {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                    $set: {
                        name,
                        lastname,
                        dob,
                        email,
                        username,
                        password
                    }
                },
                { runValidators: true, new: true }
            )
        },

        deleteUser: async (parent, { userId }) => {
            return User.findOneAndRemove({ _id: userId });
        },


        //Patient mutations
        addPatient: async (parent, {
            name,
            lastname,
            dob,
            officialID,
            email,
            bloodgroup,
            phone,
            users
        }) => {
            try{
                const patient = await Patient.create({
                    name,
                    lastname,
                    dob,
                    officialID,
                    email,
                    bloodgroup,
                    phone,
                    users
                });

                //Put the patient id in the user array table
                const user = await User.findOneAndUpdate(
                    { _id: users },
                    { $addToSet: { patients: patient._id } },
                    { new: true }
                );

                if (!user) {
                    console.log('No user found')
                } else {
                    console.log('Patient added to User 🎉')
                }

                //return { patient, user };
                return patient;
            } catch (error) {
                console.log(error);
            }
            /*
            return Patient.create({
                name,
                lastname,
                dob,
                officialID,
                email,
                bloodgroup,
                phone,
                users
            })
            */

        },



        editPatient: async (parent, {
            patientId,
            name,
            lastname,
            dob,
            officialID,
            email,
            bloodgroup,
            phone,
            users
        }) => {
            return Patient.findOneAndUpdate(
                { _id: patientId },
                {
                    $set: {
                        name,
                        lastname,
                        dob,
                        officialID,
                        email,
                        bloodgroup,
                        phone,
                        users
                    }
                },
                { runValidators: true, new: true }
            )
        },

        deletePatient: async (parent, { patientId }) => {
            const patient = Patient.findOneAndRemove({ _id: patientId });
            User.findOneAndUpdate(
                { patients: patientId },
                { $pull: { patients: patientId } },
                { new: true }
            )
            return patient;
        },
        //Medical Records mutations
        addMedicalRecord: async (parent, {
            user,
            patient,
            medicalstory,
            currentcondition,
            physicalexploration,
            diagnostic,
            treatment_prescription,
            orderofstudies
        }) => {
            try {
                const medicalRecord = await MedicalRecord.create({
                    user,
                    patient,
                    medicalstory,
                    currentcondition,
                    physicalexploration,
                    diagnostic,
                    treatment_prescription,
                    orderofstudies
                });
                //Put id in userT table
                const userTable = await User.findOneAndUpdate(
                    { _id: user },
                    { $addToSet: { medicalrecords: medicalRecord._id } },
                    { new: true }
                );

                if (!userTable) {
                    console.log('No user found')
                } else {
                    console.log('Medicalrecord added to User 🎉')
                }

                //Put id in patient table
                const patientTable = await Patient.findOneAndUpdate(
                    { _id: patient },
                    { $addToSet: { medicalrecords: medicalRecord._id } },
                    { new: true }
                );

                if (!patientTable) {
                    console.log('No patient found')
                } else {
                    console.log('Medicalrecord added to Patient 🎉')
                }

                return { medicalRecord, userTable, patientTable };
            } catch (error) {
                console.log(error);
            }
        },

        editMedicalRecord: async (parent, {
            medicalRecordId,
            medicalstory,
            currentcondition,
            physicalexploration,
            diagnostic,
            treatment_prescription,
            orderofstudies
        }) => {
            return MedicalRecord.findOneAndUpdate(
                { _id: medicalRecordId },
                {
                    $set: {
                        medicalstory,
                        currentcondition,
                        physicalexploration,
                        diagnostic,
                        treatment_prescription,
                        orderofstudies
                    }
                },
                { runValidators: true, new: true }
            )
        },

        deleteMedicalRecord: async (parent, { medicalRecordId }) => {
            try {
                const medicalRecord = await MedicalRecord.findOneAndRemove({ _id: medicalRecordId });

                if (!medicalRecord) {
                    console.log('No medicalrecord found with this ID');
                } else {
                    //if we found medicalrecord update User
                    const user = await User.findOneAndUpdate(
                        { medicalrecords: medicalRecordId },
                        { $pull: { medicalrecords: medicalRecordId } },
                        { new: true }
                    );

                    if (!user) {
                        console.log('No user found')
                    } else {
                        console.log('Medical record removed from User 🎉')
                    }

                    //Put id in patient table
                    const patient = await Patient.findOneAndUpdate(
                        { medicalrecords: medicalRecordId },
                        { $pull: { medicalrecords: medicalRecordId } },
                        { new: true }
                    );
                    if (!patient) {
                        console.log('No patient found')
                    } else {
                        console.log('Medical record removed from Patient 🎉')
                    }

                    console.log('Medical record removed 🎉');

                    return { medicalRecord, user, patient };
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
};

module.exports = resolvers;