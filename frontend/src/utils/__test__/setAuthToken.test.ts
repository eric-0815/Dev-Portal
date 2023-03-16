import axios from "axios";
import setAuthToken from "../setAuthToken";

describe("setAuthToken", () => {
  it("should set axios default headers with the token when token is provided", () => {
    const token = "mytoken123";
    setAuthToken(token);
    expect(axios.defaults.headers.common["x-auth-token"]).toEqual(token);
  });

  it("should delete axios default headers when token is not provided", () => {
    setAuthToken("");
    expect(axios.defaults.headers.common["x-auth-token"]).toBeUndefined();
  });
});
