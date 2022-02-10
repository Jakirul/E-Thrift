/**
 * @jest-environment jsdom
 */

// import { default as ProductCard } from ".";
// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { MemoryRouter } from "react-router-dom";


// describe("Product Card", () => {
//    let mockFunction;
//    beforeEach(() => {
//      mockFunction = jest.fn();
//      render(
       
//          <ProductCard />,
       
//        { wrapper: MemoryRouter }
//      );
//    });

//    test("It renders the product card div", () => {
//        let div = screen.getByRole("product-card");
//        expect(div).toBeInTheDocument();
//      });



// import { default as ProductCard } from '.'
import ProductCard from '.';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
 }));


describe("Product Card", () => {

  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    getStuffMock = (data) => {
      return {'marker1': '123'}
    }

  });
  
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("test-name", () => {
  
    act(() => {
      render(
        <ProductCard 
          category={[]}
          map={null}
          mapboxgl={null}
          getStuff={getStuffMock}
        />
        , container);
    });
    expect(container.textContent).toBe("Table");
  
    act(() => {
      render(<ProductCard description="brown table" />, container);
    });
    expect(container.textContent).toBe("brown table");

    act(() => {
        render(<ProductCard address="down the road" />, container);
      });
      expect(container.textContent).toBe("down the road");
  
  });

});
