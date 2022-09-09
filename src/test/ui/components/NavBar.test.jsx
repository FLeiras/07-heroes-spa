const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { AuthContext } = require("../../../auth/context/AuthContext");
const { Navbar } = require("../../../ui/components/Navbar");

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <NavBar/>", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Juan Carlos",
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrar el nombre del usuario logueado", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Juan Carlos")).toBeTruthy();
  });

  test("Debe llamar el logout y navigate cuando sehace click en el boton", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
