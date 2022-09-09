import { types } from "../../../auth/types/types";

describe('Pruebas en"Types.js"', () => {
  test("debe regrasar los types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
