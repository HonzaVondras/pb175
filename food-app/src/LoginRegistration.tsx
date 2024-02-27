import { useState } from 'react'
import axios from 'axios';

function LoginRegistration() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationFirstname, setRegistrationFirstname] = useState('');
  const [registrationSurname, setRegistrationSurname] = useState('');


  const handleLoginUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUsername(e.target.value);
  };

  const handleLoginPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  const handleRegistrationPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationPassword(e.target.value);
  };

  const handleRegistrationUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationUsername(e.target.value);
  };

  const handleRegistrationEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationEmail(e.target.value);
  };

  const handleRegistrationFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationFirstname(e.target.value);
  };

  const handleRegistrationSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationSurname(e.target.value);
  };

  const fetchUserByUsername = async (username: string) => {
    console.log(username);
    const errorLabel = document.getElementById('logErrorLabel');
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${username}/`);
        const userData = response.data;
        console.log(userData);
        if (errorLabel) {
          errorLabel.textContent = '';
        }
    } catch (error) {
        if (errorLabel) {
          errorLabel.textContent = 'Invalid username or password';
        }
        console.error('Error fetching user by username:', error);
    }
};

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserByUsername(loginUsername);
  };

  const createPerson = async () => {
    const data = {
      firstname: registrationFirstname,
      surname: registrationSurname,
      email: registrationEmail,
      password: registrationPassword,
      username: registrationUsername,
      is_admin: false,
    };
  
    const response = await axios.post('http://127.0.0.1:8000/api/create-person/', data);
  
    console.log(response.data.message);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorLabel = document.getElementById('regErrorLabel');
    if(registrationEmail == "" || registrationFirstname == "" || registrationPassword == "" || registrationSurname == "" || registrationUsername == "" ){
      if (errorLabel) {
        errorLabel.textContent = 'Fill all forms';
      }
      return;
    }
    if (errorLabel) {
      errorLabel.textContent = '';
    }
    createPerson();

  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minWidth: '300px'}}>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit} style={{display: 'grid', margin: 'auto', }}>
        <div id="logErrorLabel" style={{color: 'red'}}></div>
        <div style={{ display: 'grid'}}> 
          <label style={{ whiteSpace: 'pre'}}>
            e-mail or username:{"\n"}
            <input type="text" value={loginUsername} onChange={handleLoginUsernameChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{display: 'grid', marginBottom: '10px' }}>
          <label style={{ whiteSpace: 'pre'}}>
            Password:{"\n"}
            <input type="password" value={loginPassword} onChange={handleLoginPasswordChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{display: 'grid', marginBottom: '10px'}}>
          <button type="submit">Login</button>
        </div>
      </form>
      <h1>Registration</h1>
      <form onSubmit={handleRegistrationSubmit} style={{display: 'grid', margin: 'auto', minWidth: '200px'}}>
        <div id="regErrorLabel" style={{color: 'red'}}></div>
        <div style={{ display: 'grid'}}> 
          <label style={{ whiteSpace: 'pre'}}>
            Username:{"\n"}
            <input type="text" value={registrationUsername} onChange={handleRegistrationUsernameChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{display: 'grid'}}>
          <label style={{ whiteSpace: 'pre'}}>
            Password:{"\n"}
            <input type="password" value={registrationPassword} onChange={handleRegistrationPasswordChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{ display: 'grid'}}> 
          <label style={{ whiteSpace: 'pre'}}>
            e-mail:{"\n"}
            <input type="text" value={registrationEmail} onChange={handleRegistrationEmailChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{ display: 'grid'}}> 
          <label style={{ whiteSpace: 'pre'}}>
            Firstname:{"\n"}
            <input type="text" value={registrationFirstname} onChange={handleRegistrationFirstnameChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{ display: 'grid', marginBottom: '10px' }}> 
          <label style={{ whiteSpace: 'pre'}}>
            Surname:{"\n"}
            <input type="text" value={registrationSurname} onChange={handleRegistrationSurnameChange} style={{minWidth: '200px'}}/>
          </label>
        </div>
        <div style={{display: 'grid', marginBottom: '10px'}}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginRegistration;
