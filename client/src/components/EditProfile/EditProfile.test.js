/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useRef, useState } from "react";
import axios from "axios";

import { EditProfile } from "../index";
// import { Profile } from '../../pages/index';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  return {
    ...originReact,
    useRef: jest.fn(),
  };
});

jest.mock('react', () => {
   const originReact = jest.requireActual('react');
   const mockUseRef = jest.fn();
   return {
     ...originReact,
     useRef: mockUseRef,
   };
 });

jest.mock("axios");

const stubData = {
   setActiveFragment: jest.fn(),
   emai: "test",
   firstName: "first",
   setFirstName: jest.fn(),
   lastName: jest.fn(),
   username: "test",
   setUsername: jest.fn(),
   phoneNumber: "123",
   setPhoneNumber: jest.fn(),
   avatarUrl: "test",
   setAvatarUrl: jest.fn(),
 };

 const testFile = new File(['test'], 'test.png', { type: 'image/png' });

describe("edit profile", () => {


  test("fill form", async () => {
    render(<EditProfile value={stubData} />);
    const profileInput = screen.getByLabelText("profile-input");
    const name = screen.getAllByLabelText("first-name-input");
    const last = screen.getAllByLabelText("last-name-input");
    const user = screen.getAllByLabelText("username-input");
    const email = screen.getAllByLabelText("email-input");
    const phone = screen.getAllByLabelText("phone-number-input");
    userEvent.type(name, "Hello");
    userEvent.type(last, "Hello");
    userEvent.type(user, "Hello");
    userEvent.type(email, "Hello");
    userEvent.type(phone, 25120);
    await waitFor(() => expect(name.textContent).toBe("Hello"));
    userEvent.upload(profileInput, testFile);
  });

  test('it updates the preview image when the user inputs an image', () => {
   // render(<Profile />)
   render(<EditProfile value={stubData} />);
   const mRef = { current: 'cloudinaryurl' };
   useRef.mockReturnValueOnce = mRef;
   // const profileImg = screen.getByRole('img', { name: "Profile" });
   const profileInput = screen.getByRole('input');
   // const defaultImageSrc = profileImg.src;
   userEvent.upload(profileInput, testFile);
  });
});
