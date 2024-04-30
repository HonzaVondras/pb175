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

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

  });

  test('handles registration submit', async () => {
    const { getByLabelText, getByText } = render(<LoginRegistration />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const emailInput = getByLabelText('e-mail:');
    const firstnameInput = getByLabelText('Firstname:');
    const surnameInput = getByLabelText('Surname:');
    const registerButton = getByText('Register');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(firstnameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/create-person/', {
        firstname: 'John',
        surname: 'Doe',
        email: 'test@example.com',
        password: 'testpassword',
        username: 'testuser',
        is_admin: false,
      });
    });
  });
});