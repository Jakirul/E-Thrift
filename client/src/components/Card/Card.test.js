/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import axios from "axios";

import { Card } from "../index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("axios");

describe("card", () => {
  test("renders", () => {
    render(<Card number={4}/>);
    const div = screen.getByLabelText('card');
    expect(div).toBeTruthy();
  });
});
