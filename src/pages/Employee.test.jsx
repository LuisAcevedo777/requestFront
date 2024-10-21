
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Employee from './Employee'; 

const mockStore = configureStore([]);

describe('Employee Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            employee: [
                {
                    employeeId: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    salary: 50000,
                    roleId: 1,
                },
                {
                    employeeId: 2,
                    name: 'Jane Doe',
                    email: 'jane.doe@example.com',
                    salary: 60000,
                    roleId: 2,
                },
            ],
            isLoading: false,
        });
    });

    test('renders employee list', () => {
        render(
            <Provider store={store}>
                <Employee />
            </Provider>
        );

        expect(screen.getByText('EMPLOYEES')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    test('searches employees', () => {
        render(
            <Provider store={store}>
                <Employee />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search ALL Your request Here');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        
        const searchButton = screen.getByRole('button', { name: /magnifying-glass/i });
        fireEvent.click(searchButton);

        
    });

    test('opens update modal', () => {
        render(
            <Provider store={store}>
                <Employee />
            </Provider>
        );

        const updateButton = screen.getByText('Update Employee', { selector: 'button' });
        fireEvent.click(updateButton);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument(); 
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    
});
