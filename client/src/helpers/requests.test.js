/**
 * @jest-environment jsdom
 */

import axios from "axios";
import {
  getActiveItems,
  getClaimedItems,
  getProfile,
  getRating,
  getSearch,
  postEditProfile,
  postLogin,
  postLogOut,
  postRegister,
} from "./requests";

jest.mock("axios");

const BASE_URL = "http://127.0.0.1:8000/";

const mockLoginResponse = {
  data: {
    access: "testtoken",
    refresh: "testtoken",
  },
};

const mockSuccessReponse = {
  data: { error: null },
};

const mockParamData = {
  mockdata: 1,
};

describe("helper functions", () => {
  test("postLogin successfully returns a response with data", async () => {
    const logInData = { email: "test@gmail.com", password: "test" };
    axios.post.mockResolvedValueOnce(mockLoginResponse);
    const result = await postLogin(logInData);
    expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}user/login`, logInData);
    expect(result).toEqual(mockLoginResponse);
  });

  //   test("postLogin fails", async () => {
  //     const logInData = { email: 'test@gmail.com', password: 'test' }
  //     const errMsg = 'Error requesting user registration';
  //     axios.post.mockRejectedValue(new Error(errMsg));
  //     const result = await postLogin(logInData);
  //     expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}user/login`, logInData);
  //   });
  test("postRegister successfully returns a response with data", async () => {
    const registerData = new FormData();
    registerData.append("first_name", "test");
    registerData.append("last_name", "test");
    registerData.append("username", "test");
    registerData.append("email", "test");
    registerData.append("password", "test");
    registerData.append("password_confirmation", "test");
    registerData.append("phone_number", "test");

    axios.post.mockResolvedValueOnce(mockSuccessReponse);
    const result = await postRegister(registerData);
    expect(axios.post).toHaveBeenCalledWith(
      `${BASE_URL}user/register`,
      registerData
    );
    expect(result).toEqual(mockSuccessReponse);
  });

  test("getSearch successfully returns data", async () => {
    const data = {};
    const category = "testCategory";
    axios.get.mockResolvedValueOnce(mockSuccessReponse);
    const result = await getSearch(data, category);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}items/search/${data}/${category}/`
    );
    expect(result).toEqual(mockSuccessReponse.data);
  });

  test("getProfile successfully returns data", async () => {
    const username = "testusername";
    axios.get.mockResolvedValueOnce(mockSuccessReponse);
    const result = await getProfile(username);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}user/get_by_username/${username}`
    );
    expect(result).toEqual(mockSuccessReponse.data);
  });

  test("getRating successfully returns data", async () => {
    const username = "testusername";
    axios.get.mockResolvedValueOnce(mockSuccessReponse);
    const result = await getRating(username);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}user/rating/${username}`
    );
    expect(result).toEqual(mockSuccessReponse.data);
  });

  test("getActiveItems successfully returns data", async () => {
    const username = "testusername";
    axios.get.mockResolvedValueOnce(mockSuccessReponse);
    const result = await getActiveItems(username);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}items/get_by_username/${username}`
    );
    expect(result).toEqual(mockSuccessReponse.data);
  });

  test("getClaimedItems successfully returns data", async () => {
    const username = "testusername";
    axios.get.mockResolvedValueOnce(mockSuccessReponse);
    const result = await getClaimedItems(username);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}items/get_by_username/claimed/${username}`
    );
    expect(result).toEqual(mockSuccessReponse.data);
  });

  test("postEditProfile sucessfully returns a reponse with data", async () => {
    axios.post.mockResolvedValueOnce(mockSuccessReponse);
    const result = await postEditProfile(mockParamData);
    expect(axios.post).toHaveBeenCalledWith(
      `${BASE_URL}user/edit`,
      mockParamData
    );
    expect(result).toEqual(mockSuccessReponse);
  });

  test("postLogOut sucessfully returns a reponse with data", async () => {
    axios.post.mockResolvedValueOnce(mockSuccessReponse);
    const result = await postLogOut(mockParamData);
    expect(axios.post).toHaveBeenCalledWith(
      `${BASE_URL}user/logout`,
      mockParamData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    expect(result).toEqual(mockSuccessReponse);
  });
});
