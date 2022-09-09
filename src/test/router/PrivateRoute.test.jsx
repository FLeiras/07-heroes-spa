import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth";
import { PrivateRoute } from "../../router/PrivateRoute";
import { PublicRoute } from "../../router/PublicRoute";

describe("Pruebas en <PublicRoute/>", () => {
  test("Si estoy autenticado debe mostar el children", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta pública")).toBeTruthy();
  });

  test("Debe navegar si esta auten", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Juan",
        id: "ABC123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta pública</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Página Marvel")).toBeTruthy();
  });

  test("Si estoy autenticado debe mostar el children", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: "abc",
        name: "Juan Carlos",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <PrivateRoute>
            <h1>Ruta pública</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta pública")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });
});
