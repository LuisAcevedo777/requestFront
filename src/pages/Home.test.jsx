import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home'; 
import axios from 'axios';
import thunk from 'redux-thunk';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            request: [],
            isLoading: false,
        });

        // Mock localStorage
        const mockLocalStorage = {
            getItem: jest.fn((key) => {
                switch (key) {
                    case 'token':
                        return JSON.stringify('mockedToken');
                    case 'employeeId':
                        return JSON.stringify(1);
                    case 'role':
                        return JSON.stringify('admin');
                    default:
                        return null;
                }
            }),
            setItem: jest.fn(),
        };
        global.localStorage = mockLocalStorage;
    });

    test('renders the request form', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText('Request')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Summary')).toBeInTheDocument();
    });

    test('submits a new request', async () => {
        axios.post.mockResolvedValue({ data: {} });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter your code'), { target: { value: '123' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByPlaceholderText('Summary'), { target: { value: 'Test Summary' } });

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://requestserver-y82y.onrender.com/api/request/',
                {
                    code: '123',
                    description: 'Test Description',
                    summary: 'Test Summary',
                    employeeId: 1,
                },
                { headers: { token: 'mockedToken' } }
            );
        });
    });

    test('renders requests based on user role', async () => {
        
        const mockRequests = [
            { requestId: 1, description: 'Request 1', summary: 'Summary 1', createdAt: '2022-01-01' },
            { requestId: 2, description: 'Request 2', summary: 'Summary 2', createdAt: '2022-01-02' },
        ];
        axios.get.mockResolvedValue({ data: mockRequests });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Request 1')).toBeInTheDocument();
            expect(screen.getByText('Summary 1')).toBeInTheDocument();
            expect(screen.getByText('Request 2')).toBeInTheDocument();
            expect(screen.getByText('Summary 2')).toBeInTheDocument();
        });
    });

});
