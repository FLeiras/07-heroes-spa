const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { SearchPage } = require("../../../heroes/pages/SearchPage");

describe("Pruebas en <SearchPage/>", () => {
  test("Debe mostrar los valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
