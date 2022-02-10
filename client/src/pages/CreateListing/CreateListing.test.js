/**
 * @jest-environment jsdom
 */
import axios from "axios";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateListing } from "../index";
jest.mock("axios");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("CreateListring", () => {
  test("render", async () => {
    // jest.spyOn(window.localStorage.__proto__, 'setItem');
    // window.localStorage.__proto__.setItem = jest.fn();

    // jest.spyOn(FormData, 'append').mockReturnValue('hello')

    render(<CreateListing />);

    const name = screen.getByLabelText("name");
    const desc = screen.getByLabelText("desc");
    const loc = screen.getByLabelText("loc");
    const sub = screen.getByLabelText("sub");

    userEvent.type(name, "hello");
    await waitFor(() => expect(name.textContent).toBe("hello"));
    userEvent.type(desc, "diss");
    await waitFor(() => expect(desc.textContent).toBe("diss"));
    userEvent.type(loc, "loc");
    await waitFor(() => expect(loc.textContent).toBe("loc"));

    userEvent.click(sub);

    // expect(desc.textContent).toBe('diss')
    //expect(name.textContent).toBe('hello')
  });
});
