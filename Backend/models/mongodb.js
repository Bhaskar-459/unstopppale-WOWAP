import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/patientdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PatientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    id: Number,
    date: Date,
    time: String,
    doctor: String,
    medicine: [
        {
            name: String,
            dosage: Number,
            time: String
        }
    ],
    disease: String,
    check : Boolean
});

const PatientModel = mongoose.model('Patient', PatientSchema);

export default PatientModel;