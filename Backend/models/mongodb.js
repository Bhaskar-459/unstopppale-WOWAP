import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
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
            time: String,
            check: {
                done:
                {
                    type: Boolean,
                    default: false
                },
                done_time: {
                    type: Date,
                    default: null
                }
            }
        }
    ],
    disease: String,

});

const PatientModel = mongoose.model('Patient', PatientSchema);

export default PatientModel;