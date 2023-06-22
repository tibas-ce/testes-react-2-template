import { render, screen } from "@testing-library/react";
import ProductCard from "../components/ProductsList/ProductCard";
import userEvent from "@testing-library/user-event";

//Mocks
const productMock = {
  id: 1,
  title: "Jaqueta",
  price: 150.0,
  image: "https://fakesstoreapi.com/img/71HblAHs5xl._ACUY879_-2.jpg",
};

const addToCardMock = jest.fn();

describe("testes no ProductCard", () => {
  test("1 - Renderiza componente ProductCard", () => {
    render(<ProductCard product={productMock} addToCart={addToCardMock} />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });

  test("2 - Deve renderizar imagem, título, preço eo botão", () => {
    render(<ProductCard product={productMock} addToCart={addToCardMock} />);
    const image = screen.getByRole("img", { name: /jaqueta/i });
    const title = screen.getByRole("heading", { name: /jaqueta/i });
    const price = screen.getByText(/\$150\.00/i);
    const button = screen.getByRole("button", { name: /buy/i });

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("3  - Quando o botão de comprar for clicado deve adicionar o produto no carrinho", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={productMock} addToCart={addToCardMock} />);

    const button = screen.getByRole("button", { name: /buy/i });

    await user.click(button);

    expect(addToCardMock).toBeCalled();
  });
});
