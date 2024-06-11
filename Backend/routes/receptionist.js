import express from 'express';
import path from 'path';
import  PatientModel  from '../models/HospitalModel.js';
import e from 'express';

const router = express.Router();
let __dirname = path.resolve();
router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/Frontend/recipient/recipient.html'));
});

router.get('/data', async (req, res) => {
    try {
        const patients = await PatientModel.find();
        console.log(patients);
        res.send(patients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/addpatient', async (req, res) => {
    try {
        const patient = new PatientModel(req.body);
        await patient.save();
        res.send(patient);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;