import Appointment from "../models/Appointment.js";

export const createAppointment = async(req,res) => {
    try{
        console.log('Request body:', req.body);
        const newAppointment=new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json(newAppointment);
    }
    catch(err){
        console.error("Error while saving appointment:", err); 
        res.status(500).json({ message: err.message });
    }
};

export const getAppointments = async(req,res) => {
    try{
        const {date}=req.query;
        const filter=date?{date}:{};
        const data=await Appointment.find(filter);
        res.json(data);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}