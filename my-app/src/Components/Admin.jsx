import React, { useEffect, useState } from 'react';
import './Admin.css'
import axios from 'axios';

function Admin({ submittedData,setSubmittedData }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    date: '',
    time: '',
    reason: '',
    doctorName: '',  
  });

  const [availableAppointments, setAvailableAppointments]=useState([]);

  const fetchAppointmentsByDate = async (selectedDate) => {
      try{
          const res=await axios.get(`http://localhost:5000/api/appointments?date=${selectedDate}`);
          setAvailableAppointments(res.data);
      }
      catch(err){
          console.error("Error fetching appointments: ", err);
      }
  }

  useEffect(() => {
      if(formData.date){
          fetchAppointmentsByDate(formData.date);
      }
  }, [formData.date]);

  const handleChange = (e) => {
      const { name,value }=e.target;
      let updatedFormData = {
          ...formData,
          [name]: value,
      };

      if(name==="reason"){
          let doctor="";
          if(value==="Fever"){
              doctor="Dr. John"
          }
          else if(value==="Allergy"){
              doctor="Dr. Smith"
          }
          updatedFormData.doctorName=doctor;
      }
      setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const isDuplicate = availableAppointments.some(
          (appointment) => appointment.time===formData.time
      );

      if(isDuplicate){
          alert('This time slot is already booked for the selected date!');
          return;
      }

      try{
          const res=await axios.post('http://localhost:5000/api/appointments', formData);
          setSubmittedData((prevData) => [...prevData,res.data]);
          alert('Appointment booked!');
          console.log("Form submitted, page not refreshed");
          fetchAppointmentsByDate(formData.date);
      }
      catch(err){
          alert("Error saving appointment!")
          console.log(err);
      }
      setFormData((prevData) => ({
        name: '',
        age: '',
        gender: '',
        contact: '',
        date: prevData.date,
        time: '',
        reason: '',
        doctorName: '',
      }));
  };
  
  const generateTimeSlots = () => {
      const slots=[];
      let startTime=new Date();
      startTime.setHours(10,0,0,0);
      const endTime=new Date();
      endTime.setHours(22,30,0,0);
      const currTime=new Date(startTime);
      while(currTime<=endTime){
          slots.push(currTime.toTimeString().substring(0,5));
          currTime.setMinutes(currTime.getMinutes()+30);
      }
      return slots;
  };

  const getSlotColor = (time) => {
    return availableAppointments.some((data) => data.time === time) ? "red" : "green";
  };

  return (
    <div className='admin-container'>
      <h1>APPOINTMENT SLOTS</h1>
      <div>
        <label>Select Date to View Slots:</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      {formData.date &&
        <div className='time-slot-container'>
          {generateTimeSlots().map((slot,index) => {
            return (
              <div 
              key={index}
              className={`time-slot ${getSlotColor(slot)}`}>
                {slot}
              </div>
            );
          })}
        </div>
      }

      <form onSubmit={handleSubmit}>
        <h2>ENTER DETAILS</h2>
        <div>
          <label>Enter Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Enter Age:</label>
          <input name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Enter Gender:</label>
          <input name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Enter Contact No.:</label>
          <input name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div>
          <label>Enter Time:</label>
          <input name="time" type="time" value={formData.time} onChange={handleChange} required />
        </div>
        <div>
          <label>Enter Reason for Visit:</label>
          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">Select a reason</option>
            <option value="Fever">Fever</option>
            <option value="Allergy">Allergy</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
