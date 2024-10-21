import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Register from './Register'; 
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios');

const mockStore = configureStore([]);

describe('Register Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    test('renders register form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    test('submits the register form and handles success', async () => {
        axios.post.mockResolvedValue({});

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(screen.getByText(/Registro Exitoso!/i)).toBeInTheDocument();
        });
    });

    test('displays error message on unsuccessful registration', async () => {
        axios.post.mockRejectedValue({
            response: {
                status: 401,
                data: { message: 'Datos incorrectos!' },
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(screen.getByText(/No se puedo registrar a la cuenta/i)).toBeInTheDocument();
        });
    });
});
