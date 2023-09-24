import { ICartProduct } from "../types/products";
import { paseJson } from "../utils/validators";

const _cart = paseJson(localStorage.getItem("__shopie__cart___") || "[]");
const _setCart = (cart: ICartProduct[]) =>
  localStorage.setItem("__shopie__cart___", JSON.stringify(cart));
/**
 * check if product exists in cart
 * @param product
 * @returns
 */
const _productExists = (product: ICartProduct) =>
  _cart.some((p: ICartProduct) => p.id === product.id);

/**
 * Add product to cart
 * @param product
 */
export const addToCart = (product: ICartProduct) => {
  if (!product) return;
  if (typeof product !== "object") return;
  if (!product.id) return;

  try {
    if (_productExists(product)) {
      const existingProduct: ICartProduct = _cart.find(
        (p: ICartProduct) => p.id === product.id
      ); // used find to acvoid unnecessary iterations

      if (existingProduct.chosenColor.name !== product.chosenColor.name) {
        existingProduct.chosenColor = product.chosenColor;
        existingProduct.quantity = 1;

        // TODO: add new product to cart insead with new color
        // TODO: modify the id of the new product to be unique (id + color)
      } else {
        existingProduct.quantity += 1;
      }
    } else {
      _cart.unshift(product);
    }
    _setCart(_cart);
    console.log(
      `%c✅Adding product with id ${product.id} to cart`,
      "color: #CA929E; font-weight: bold; font-size: 1.2rem;",
      _cart
    );
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Remove product from cart
 * @param product
 */
export const removeFromCart = (product: ICartProduct) => {
  if (!product) return;
  if (typeof product !== "object") return;
  if (!product.id) return;

  try {
    if (_productExists(product)) {
      const existingProduct = _cart.find(
        (p: ICartProduct) => p.id === product.id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          // TODO: Add a confirmation dialog
          console.log(
            `%cRemoving product with id ${existingProduct.id} from cart`,
            "color: #CA929E; font-weight: bold; font-size: 1.2rem;"
          );
          alert("Removing product from cart");
          _cart.splice(_cart.indexOf(existingProduct), 1);
        }
      }
    }

    _setCart(_cart);
  } catch (error) {
    console.warn(error);
  }
};

/**
 * total price of cart
 */
export const cartTotalPrice = () => {
  return _cart.reduce((acc: number, curr: ICartProduct) => {
    return acc + curr.price * curr.quantity;
  }, 0);
};

/**
 * Clear cart
 */
export const clearCart = () => {
  _setCart([]);
};
