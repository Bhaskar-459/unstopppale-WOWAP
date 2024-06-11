import express from 'express';
import  PatientModel  from '../models/HospitalModel.js';
import path from 'path';

let __dirname = path.resolve();

const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "/Frontend/nurse/nurseindex.html"));
});

router.get('/patientdata', async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/updatecheck/:id', async (req, res) => {
    try {
        const medicationId = req.params.id;
        const { done,done_time } = req.body;

        // Find the patient containing this medication
        const patient = await PatientModel.findOne({ 'medicine._id': medicationId });

        if (!patient) {
            return res.status(404).send({ message: 'Medication not found' });
        }

        // Update the check status of the medication
        let medication = patient.medicine.id(medicationId);

        // Update the check object properties separately
       
        if (done !== undefined) {
            console.log('Check done:', done);
            medication.check.done = done;
        }
        if (done_time !== undefined) {
            medication.check.done_time = done_time ? new Date() : null;
        }

        console.log('Medication after update:', medication);
        await patient.save();

        res.send({ message: 'Check status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

export default router;