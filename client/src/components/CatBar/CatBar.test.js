/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import axios from "axios";

import { CatBar } from "../index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

global.fetch = require("jest-fetch-mock");

jest.mock("axios");

describe("catbar", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("existance", async () => {
    const mockSet = jest.fn();

    const mockData = {
      data: [
        {
          id: 5,
          name: "test listing 222",
          category: "Entertainment",
          description: "test description",
          is_claimed: false,
          time: "2022-02-07",
          address: "Gower St, London WC1E 6BT",
          seller: "test",
        },
      ],
      image: [
        {
          id: 5,
          img_url: "image/upload/v1644230935/ecqks9i3uvehrkcpxwlk.png",
        },
      ],
    };
    await axios.get.mockResolvedValue(mockData);
    render(<CatBar setCategory={mockSet} />);
    // const container = screen.getByLabelText('cat_container')
    // expect(container).toBeTruthy()

    const all = screen.getByLabelText("all");
    const clothes = screen.getByLabelText("clothes");
    const furn = screen.getByLabelText("furniture");
    const ent = screen.getByLabelText("entertainment");
    const mis = screen.getByLabelText("mis");
    const orn = screen.getByLabelText("orn");
    userEvent.click(all);
    userEvent.click(clothes);
    userEvent.click(furn);
    userEvent.click(ent);
    userEvent.click(mis);
    userEvent.click(orn);
    expect(clothes).toBeTruthy();
    expect(furn).toBeTruthy();
    expect(ent).toBeTruthy();
    expect(mis).toBeTruthy();
    expect(orn).toBeTruthy();
  });
});
