let DoctorRole = (req, res, next) => {

     if(req.role === 'doctor') {;
        next();
    } else {
        res.redirect('/user/login');
    }

}

let ReceptionistRole = (req, res, next) => {
    if(req.role === 'receptionist') {
        next();
    } else {
        res.redirect('/user/login');
    }
}

let NurseRole = (req, res, next) => {
    if(req.role === 'nurse') {
        next();
    } else {
        res.redirect('/user/login');
    }
}

export { DoctorRole, ReceptionistRole, NurseRole };