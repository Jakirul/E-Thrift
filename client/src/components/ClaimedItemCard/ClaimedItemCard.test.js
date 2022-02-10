/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

import { ClaimedItemCard } from "../index";

const mockedUsedNavigate = jest.fn();
const mockedUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUseLocation,
}));

describe("claimed item card", () => {
  test("renders card", async () => {
    const activeItems = {
      data: [
        {
          id: 5,
          name: "test listing 222",
          seller: "test",
          category: "Entertainment",
          description: "test description",
          image_url:'test-url',
          image_id: 1
        },
      ],
      image: [
        {
          item_id: 5,
          img_url: "lolno.com",
        },
      ],
    };
    //const mockShow = jest.fn()
    render(<ClaimedItemCard value={activeItems.data} />);
    const card = screen.getByRole("card");
    userEvent.click(card);
    expect(card).toBeTruthy();
    //await waitFor(()=> expect(mockedUsedNavigate).toHaveBeenCalled())
  });
});
