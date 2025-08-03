import React from 'react';
import './Doctor.css';

const parseDateTime = (date,time) => new Date(`${date}T${time}`);

const Doctor = ({ submittedData }) => {
    const sortedData=[...submittedData].sort((a,b) => {
        return parseDateTime(a.date,a.time)-parseDateTime(b.date,b.time);
    })
    const feverPatients=sortedData.filter(patient => patient.reason==='Fever');
    const allergyPatients=sortedData.filter(patient => patient.reason==='Allergy');

    return (
        <div className="doctor-container">
            <h2>Doctor Dashboard</h2>
            <div className="doctor-box">
                <h3>Dr. John (Fever Specialist)</h3>
                {feverPatients.length > 0 ? (
                    <ul>
                        {feverPatients.map((patient, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {patient.name}, <strong>Date:</strong> {patient.date}, <strong>Time:</strong> {patient.time}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No patients for fever.</p>
                )}
            </div>
            <div className="doctor-box">
                <h3>Dr. Smith (Allergy Specialist)</h3>
                {allergyPatients.length > 0 ? (
                    <ul>
                        {allergyPatients.map((patient, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {patient.name}, <strong>Date:</strong> {patient.date}, <strong>Time:</strong> {patient.time}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No patients for allergy.</p>
                )}
            </div>
        </div>
    );
};

export default Doctor;
