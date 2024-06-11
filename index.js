import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();

const app = express();
const port = 3000;

import DoctorRoutes from './Backend/routes/doctor.js';
import NurseRoutes from './Backend/routes/nurse.js';
import ReceptionistRoutes from './Backend/routes/receptionist.js';
import UserRoutes from './authorization/user.js';
import AuthMiddleware from './authorization/authmiddleware.js'
import { DoctorRole, ReceptionistRole, NurseRole } from './authorization/checkrole.js'
import cookieParser from 'cookie-parser';


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/user/login');
});

//routing
app.use('/user',UserRoutes);
app.use('/doctor', AuthMiddleware, DoctorRole, DoctorRoutes);
app.use('/nurse', AuthMiddleware, NurseRole, NurseRoutes);
app.use('/receptionist', AuthMiddleware, ReceptionistRole,ReceptionistRoutes);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
