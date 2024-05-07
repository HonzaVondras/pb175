import React, { useState } from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC<{ setEditMode: (value: boolean) => void }> = ({ setEditMode }) => {

  const enterEditMode = () => {
      localStorage.setItem('editMode', 'true');
      setEditModeNav(true)
      setEditMode(true);
  };
    const navigate = useNavigate();

    const [editMode, setEditModeNav] = useState(localStorage.getItem('editMode') === 'true');

    const handleUserDataDeletion = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    const handlePersonalData = () => {
        navigate('/personal-page');
    };

    const leaveEditMode = () => {
      localStorage.removeItem('editMode');
      setEditModeNav(false);
      setEditMode(false);
    };

    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const admin = userData && userData.is_admin === true;

    return (
        <div className="navbar">
            <button onClick={handlePersonalData}>User Page</button>
            <button onClick={handleUserDataDeletion}>Logout</button>
            {admin && !editMode && (
                <button onClick={enterEditMode}>Enter edit mode</button>
            )}
            {admin && editMode && (
                <button onClick={leaveEditMode}>Leave edit mode</button>
            )}
        </div>
    );
};

export default NavigationBar;