import { useState } from 'react'
import axios from 'axios';
import "./LoginRegistrationStyle.css"

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

  const fetchUserByUsername = async (username: string, password: string): Promise<boolean> => {
    const errorLabel = document.getElementById('logErrorLabel');
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${username}/`);
        const userData = response.data;
        console.log(userData);
        if(password != userData.password){
          if (errorLabel) {
            errorLabel.textContent = 'Invalid username or password';
          }
          return true;
        }
        if (errorLabel) {
          errorLabel.textContent = '';
        }
        return false;
    } catch (error) {
        if (errorLabel) {
          errorLabel.textContent = 'Invalid username or password';
        }
        console.error('Error fetching user by username:', error);
        return true;
    }
};

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(await fetchUserByUsername(loginUsername, loginPassword)){
      return;
    }
    //TODO: redirect on restaruants
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
    //TODO: redirect on restaruants

  };

  return (
    <div className="form-format">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <div id="logErrorLabel" className="err-message"></div>
        <div className="div-style"> 
          <label className="label-style">
            Username:{"\n"}
            <input type="text" value={loginUsername} onChange={handleLoginUsernameChange} className="input"/>
          </label>
        </div>
        <div className="div-style">
          <label className="label-style" style={{ marginBottom: "14px"}}>
            Password:{"\n"}
            <input type="password" value={loginPassword} onChange={handleLoginPasswordChange} className="input"/>
          </label>
        </div>
        <div className="div-style">
          <button type="submit" className="log-reg-button">Login</button>
        </div>
      </form>
      <h1>Registration</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <div id="regErrorLabel" className="err-message"></div>
        <div className="div-style"> 
          <label className="label-style">
            Username:{"\n"}
            <input type="text" value={registrationUsername} onChange={handleRegistrationUsernameChange} className="input"/>
          </label>
        </div>
        <div className="div-style">
          <label className="label-style">
            Password:{"\n"}
            <input type="password" value={registrationPassword} onChange={handleRegistrationPasswordChange} className="input"/>
          </label>
        </div>
        <div className="div-style"> 
          <label className="label-style">
            e-mail:{"\n"}
            <input type="text" value={registrationEmail} onChange={handleRegistrationEmailChange} className="input"/>
          </label>
        </div>
        <div className="div-style"> 
          <label className="label-style">
            Firstname:{"\n"}
            <input type="text" value={registrationFirstname} onChange={handleRegistrationFirstnameChange} className="input"/>
          </label>
        </div>
        <div className="div-style"> 
          <label className="label-style" style={{ marginBottom: "14px"}}>
            Surname:{"\n"}
            <input type="text" value={registrationSurname} onChange={handleRegistrationSurnameChange} className="input"/>
          </label>
        </div>
        <div className="div-style">
          <button type="submit" className="log-reg-button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginRegistration;
