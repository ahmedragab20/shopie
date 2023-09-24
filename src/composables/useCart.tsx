import { ICartProduct, Image } from "../types/products";
import { paseJson } from "../utils/validators";

let _cart = paseJson(localStorage.getItem("__shopie__cart___") || "[]");
const _setCart = (cart: ICartProduct[]) => {
  localStorage.setItem("__shopie__cart___", JSON.stringify(cart));
  _cart = cart;
};
/**
 * check if product exists in cart
 * @param product
 * @returns
 */
const _productExists = (product: ICartProduct) =>
  _cart.some((p: ICartProduct) => {
    return (
      p.id === product.id ||
      p.id === `${product.id}-${product?.chosenColor.name}`
    );
  });

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
        (p: ICartProduct) =>
          p.id === product.id ||
          p.id === `${product.id}-${product?.chosenColor.name}`
      ); // used find() to acvoid unnecessary iterations

      if (existingProduct.chosenColor.name !== product.chosenColor.name) {
        const newProductInstance = { ...product };
        newProductInstance.id = `${product.id}-${product.chosenColor.name}`;
        newProductInstance.quantity = 1;
        newProductInstance.chosenColor = product.chosenColor;
        if (product.images?.length) {
          const img = product.images.find(
            (image) => image.color === product.chosenColor.name
          );

          newProductInstance.images = [img as Image];
        }
        if (product.colors?.length) {
          const color = product.colors.find(
            (color) => color.name === product.chosenColor.name
          );
          newProductInstance.colors = [color as any];
        }

        _cart.unshift(newProductInstance);
      } else {
        existingProduct.quantity += 1;
      }
    } else {
      _cart.unshift(product);
    }
    _setCart(_cart);
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
