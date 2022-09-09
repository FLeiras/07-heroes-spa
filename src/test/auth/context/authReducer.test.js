import { authReducer } from "../../../auth/context/authReducer";
import { types } from "../../../auth/types/types";

describe("test en authReducer", () => {
  test("debe retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("(login) debe llamar el login, autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Juan",
        id: "123",
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });

  test("logout debe borrar el name del user y poner logged en false", () => {
    const state = {
      logged: true,
      user: { id: "123", name: "Juan" },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);
    expect(newState).toEqual({ logged: false });
  });
});
