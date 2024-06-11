import express from 'express';
import path from 'path';
import PatientModel from '../models/HospitalModel.js';

const router = express.Router();
const __dirname = path.resolve();

router.get('/', async (req, res) => {
    console.log("hehehehe");
    res.sendFile(path.join(__dirname, '/Frontend/doctor/doctorindex.html'));
});

router.get('/data', async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/doctorpatient', async (req, res) => {
    try {
        
        const { patientId, medicineName, dosage, time } = req.body;
        const patient = await PatientModel.findById(patientId);

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Include the check object with done status in the prescription data
        patient.medicine.push({
            name: medicineName,
            dosage: dosage,
            time: time
        });

        await patient.save();
        res.send('Prescription added successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/doctorpatient/:id', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '/Frontend/doctor/doctorpatient.html'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/doctorpatientdata/:id', async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.params.id);
        console.log("hehehehe", patient, req.params.id);
        res.json(patient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
