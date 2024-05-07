import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginRegistration from '../LoginRegistration';

jest.mock('axios');

describe('LoginRegistration component', () => {
  test('handles login submit', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'Jan' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/users/',
        {
          username:'Jan',
        }
      );
    });

  });

  test('handles registration submit', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const emailInput = getByLabelText('e-mail:');
    const firstnameInput = getByLabelText('Firstname:');
    const surnameInput = getByLabelText('Surname:');
    const registerButton = getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'Jan' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(emailInput, { target: { value: '536685@fi.muni.cz' } });
    fireEvent.change(firstnameInput, { target: { value: 'Jan' } });
    fireEvent.change(surnameInput, { target: { value: 'Vondrášek' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/create-person/', {
        firstname: 'Jan',
        surname: 'Vondrášek',
        email: '536685@fi.muni.cz',
        password: 'password',
        username: 'Jan',
        is_admin: true,
      });
    });
  });


  test('handles unfilled arguments in registration', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const emailInput = getByLabelText('e-mail:');
    const firstnameInput = getByLabelText('Firstname:');
    const registerButton = getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'Jan' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(emailInput, { target: { value: '536685@fi.muni.cz' } });
    fireEvent.change(firstnameInput, { target: { value: 'Jan' } });
    fireEvent.click(registerButton);

    const errorLabel = getByText('regErrorLabel');
    expect(errorLabel.textContent).toBe('Fill all items');
  });


  test('handles unfilled args in login', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'Jan' } });
    fireEvent.click(loginButton);

    const errorLabel = getByText('logErrorLabel');
    expect(errorLabel.textContent).toBe('Invalid username or password');
  });


  test('Checks for duplicate Email', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const emailInput = getByLabelText('e-mail:');
    const firstnameInput = getByLabelText('Firstname:');
    const surnameInput = getByLabelText('Surname:');
    const registerButton = getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'Jan' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(emailInput, { target: { value: '536685@fi.muni.cz' } });
    fireEvent.change(firstnameInput, { target: { value: 'Jan' } });
    fireEvent.change(surnameInput, { target: { value: 'Vondrášek' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/create-person/', {
        firstname: 'Jan',
        surname: 'Vondrášek',
        email: '536685@fi.muni.cz',
        password: 'password',
        username: 'Jan',
        is_admin: true,
      });
    });

    fireEvent.click(registerButton);

    const errorLabel = getByText('regErrorLabel');
    expect(errorLabel.textContent).toBe('Duplicate email');

  });
});