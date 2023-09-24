import { createContext, useContext } from "react";
import { ICartProduct } from "../types/products";

interface ICartContext {
  children: React.ReactNode;
}

interface ICartProviderReturn {
  cart: Partial<ICartProduct>[];
}

const context = createContext<ICartProviderReturn>({ cart: [] });

export const CartContextProvider = ({ children }: ICartContext) => {
  const value: ICartProviderReturn = {
    cart: [],
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useCartContext = () => {
  if (!useContext(context)) {
    throw new Error("🔐 useAppContext must be used within AppContext");
  }

  return useContext(context);
};
