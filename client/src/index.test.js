/**
 * @jest-environment jsdom
 */

 import { render, screen } from "@testing-library/react";
 import userEvent from "@testing-library/user-event";
 import React, { useState } from "react";
 import axios from "axios";
 import { App } from "./App";

 describe('index', () => {
     test('renders the app inside BrowserRouter', () => {
        render(<App/>)
     });
 })