import PatientModel from './models/mongodb.js';
import path from 'path';

let __dirname = path.resolve();

export const routes = (app) => {
    app.get('/', async (req, res) => {
        res.redirect('/recipient');
    });

    app.get('/doctor', async (req, res) => {
        res.sendFile(path.join(__dirname, '/Frontend/doctor/doctorindex.html'));
    });

    app.get('/nurse', async (req, res) => {
        res.sendFile(path.join(__dirname, "/Frontend/nurse/nurseindex.html"));
    });

    app.get('/doctordata', async (req, res) => {
        try {
            const patients = await PatientModel.find();
            res.send(patients);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get('/doctorpatient/:id', async (req, res) => {
        try {
            res.sendFile(path.join(__dirname, '/Frontend/doctor/doctorpatient.html'));
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get('/doctorpatientdata/:id', async (req, res) => {
        try {
            const patient = await PatientModel.findById(req.params.id);
            console.log("hehehehe",patient, req.params.id);
            res.json(patient);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.post('/doctorpatient', async (req, res) => {
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
    

    app.post('/updatecheck/:id', async (req, res) => {
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
    
    

    app.get('/recipient', async (req, res) => {
        res.sendFile(path.join(__dirname, '/Frontend/recipient/recipient.html'));
    });

    app.get('/recipientdata', async (req, res) => {
        try {
            const patients = await PatientModel.find();
            console.log(patients);
            res.send(patients);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.post('/addpatient', async (req, res) => {
        try {
            const patient = new PatientModel(req.body);
            await patient.save();
            res.send(patient);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};
