/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import axios from "axios";

import { ClaimedItems } from "../index";

const claimedItems = {
  data: [
    {
      id: 5,
      name: "test listing 222",
      category: "Entertainment",
      description: "test description",
      is_claimed: true,
      time: "2022-02-07",
      address: "Gower St, London WC1E 6BT",
      seller: "test",
    },
  ],
  image: [
    {
      item_id: 5,
      img_url: "lolno.com",
    },
  ],
};

describe("ClaimedItems", () => {
  test("renders with a card", () => {
    render(
      <ClaimedItems
        claimedItems={claimedItems}
        isLoading={false}
        setActiveFragment={jest.fn()}
      />
    );
    const header = screen.getByRole("heading");
    const card = screen.getByRole("card");
    expect(card).toBeTruthy();
    expect(header).toBeTruthy();
  });

  test("it renders loading if loading", () => {
    render(
      <ClaimedItems
        claimedItems={claimedItems}
        isLoading={true}
        setActiveFragment={jest.fn()}
      />
    );
    const loading = screen.getByLabelText("loading-items");
    expect(loading).toBeTruthy();
  });
});
