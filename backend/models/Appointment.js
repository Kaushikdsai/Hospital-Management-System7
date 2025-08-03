import mongoose from "mongoose";

const appointmentSchema=new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    contact: String,
    date: String,
    time: String,
    reason: String,
    doctorName: String
})

export default mongoose.model('Appointment',appointmentSchema);