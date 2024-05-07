import React, { useEffect, useState } from 'react';
import './PersonalData.css';

const PersonalDataPage: React.FC = () => {

    const [userData, setUserData] = useState<any>({
        firstname: '',
        surname: '',
        email: '',
        password: '',
        username: '',
      });
    
      useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      }, []);

      return (
        <div className="personal-data-container">
          <h1 className="personal-data-heading">Personal Data</h1>
          <div className="personal-data-content">
            <p><strong>Name:</strong> {userData.firstname} {userData.surname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Username:</strong> {userData.username}</p>
          </div>
        </div>
      );
    };

export default PersonalDataPage;