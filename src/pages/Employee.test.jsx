import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Employee from "./Employee";
import { vi } from "vitest";
import { thunk } from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Employee Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employee: [
        {
          employeeId: 1,
          name: "John Doe",
          email: "john.doe@gmail.com",
          salary: 50000,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Jane Doe",
          email: "jane.doe@gmail.com",
          salary: 60000,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "July Doe",
          email: "july@gmail.com",
          salary: 60000,
          roleId: 3,
        },
      ],
      isLoading: false,
    });

    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "token") return JSON.stringify("mock-token");
      return null;
    });
  });

  test("renders employee list", () => {
    render(
      <Provider store={store}>
        <Employee />
      </Provider>
    );
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Jane Doe")).toBeInTheDocument();
  });

  test("searches employees", () => {
    render(
      <Provider store={store}>
        <Employee />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(
      "Search ALL Your request Here"
    );
    fireEvent.change(searchInput, { target: { value: "John" } });

    const searchButton = screen.getByRole("button", {
      name: /magnifying-glass/i,
    });
    fireEvent.click(searchButton);
  });

  test("opens update modal", () => {
    render(
      <Provider store={store}>
        <Employee />
      </Provider>
    );

    const updateButton = screen.getByTestId(`update-employee-button-1`);
    fireEvent.click(updateButton);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
