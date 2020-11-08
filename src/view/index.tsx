import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ProductList from "./productList/ProductList";
import { Store } from "./store/types";
import { UseCaseContainer } from "./UseCaseContainer";
import { UseCasesContext } from "./UseCasesContext";

export const render = (useCases: UseCaseContainer, store: Store.Store) => {
  const App = () => {
    return (
      <Provider store={store}>
        <UseCasesContext.Provider value={useCases}>
          <ProductList />
        </UseCasesContext.Provider>
      </Provider>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));
};
