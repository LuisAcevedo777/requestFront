import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login'; 
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockStore = configureStore([]);

describe('Login Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    test('renders login form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    test('submits the login form and handles success', async () => {
        axios.post.mockResolvedValue({ data: { token: 'mockedToken', employeeId: 1, role: 'admin' } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'juanadmin@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toEqual(JSON.stringify('mockedToken'));
            expect(localStorage.getItem('employeeId')).toEqual(JSON.stringify(1));
            expect(localStorage.getItem('role')).toEqual(JSON.stringify('admin'));
        });
    });

    test('displays error message on unsuccessful login', async () => {
        axios.post.mockRejectedValue({
            response: {
                status: 401,
                data: { message: 'Invalid credentials' },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrongemail@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
        });
    });
});
