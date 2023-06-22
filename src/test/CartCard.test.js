import { render, screen } from "@testing-library/react";
import CartCard from "../components/Cart/CartCard";
import userEvent from "@testing-library/user-event";

//Mocks
const productMock = {
    id: 1,
    title: "Jaqueta",
    price: 150.0,
    image: "https://fakesstoreapi.com/img/71HblAHs5xl._ACUY879_-2.jpg",
    quantity: 1
  };
  
  const removeFromCartMock = jest.fn();

describe("Testes CartCard", () => {

    test("1 - Renderiza componente ProductCard", () => {
        render(<CartCard product={productMock} removeFromCart={removeFromCartMock} />);
        // eslint-disable-next-line testing-library/no-debugging-utils
        screen.debug();
      });

    test("2 - Deve renderizar imagem, título, preço, quantidade e o botão", () => {
        render(<CartCard key={productMock.id}
            product={productMock}
            removeFromCart={removeFromCartMock}/>);
        const image = screen.getByRole("img", { name: /jaqueta/i });
        const title = screen.getByRole("heading", { name: /jaqueta/i });
        const quantity = screen.getByText(/\$150\.00/i);
        const price = screen.getByText(/x1/i);
        const button = screen.getByRole("button", { name: /remove/i });
    
        expect(image).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();
        expect(price).toBeInTheDocument();
        expect(button).toBeInTheDocument();
      });
    
      test("3  - Quando o botão de remover for clicado deve retirar o produto no carrinho", async () => {
        const user = userEvent.setup();
        render(<CartCard key={productMock.id}
            product={productMock}
            removeFromCart={removeFromCartMock} />);
    
        const button = screen.getByRole("button", { name: /remove/i });
    
        await user.click(button);
    
        expect(removeFromCartMock).toBeCalled();
      });
})