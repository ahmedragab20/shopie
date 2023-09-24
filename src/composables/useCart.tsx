import { ICartProduct, Image } from "../types/products";
import { paseJson } from "../utils/validators";

function useCart() {
  const [_cart, setCart] = useState<ICartProduct[]>([]);

  const _setCart = (cart: ICartProduct[]) => {
    setCart(cart);
    localStorage.setItem("__shopie__cart__", JSON.stringify(cart));
  };
  useEffect(() => {
    const c = paseJson(localStorage.getItem("__shopie__cart__") || "[]");
    _setCart(c);
  }, []);

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
  const addToCart = (product: ICartProduct) => {
    if (!product) return;
    if (typeof product !== "object") return;
    if (!product.id) return;

    try {
      if (_productExists(product)) {
        const existingProduct: ICartProduct = _cart.find(
          (p: ICartProduct) =>
            p.id === product.id ||
            p.id === `${product.id}-${product?.chosenColor.name}`
        )!; // used find() to acvoid unnecessary iterations

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

          // _cart.unshift(newProductInstance);
          const _nCart = JSON.parse(JSON.stringify(_cart));
          _nCart.unshift(newProductInstance);
          _setCart(_nCart);
        } else {
          existingProduct.quantity += 1;
        }
      } else {
        const _nCart = JSON.parse(JSON.stringify(_cart));
        _nCart.unshift(product);
        _setCart(_nCart);
      }
      console.log(_cart);
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Remove product from cart
   * @param product
   */
  const removeFromCart = (product: ICartProduct) => {
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
            console.log(
              `%cDecreasing quantity of product with id ${existingProduct.id} in cart`,
              "color: #535A50; font-weight: bold; font-size: 0.85rem;"
            );

            existingProduct.quantity -= 1;
          } else {
            // TODO: Add a confirmation dialog
            console.log(
              `%cRemoving product with id ${existingProduct.id} from cart`,
              "color: #CA929E; font-weight: bold; font-size: 1.2rem;"
            );
            alert("Removing product from cart");
            const _nCart = _cart.filter(
              (p: ICartProduct) => p.id !== existingProduct.id
            );
            _setCart(_nCart);
          }
        }
      }

      console.log(_cart);
    } catch (error) {
      console.warn(error);
    }
  };

  const permenantlyRemoveFromCart = (product: ICartProduct) => {
    if (!product) return;
    if (typeof product !== "object") return;
    if (!product.id) return;

    try {
      const _nCart = _cart.filter((p: ICartProduct) => p.id !== product.id);
      _setCart(_nCart);
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * total price of cart
   */
  const cartTotalPrice = () => {
    return _cart.reduce((acc: number, curr: ICartProduct) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  };

  /**
   * Clear cart
   */
  const clearCart = () => {
    _setCart([]);
  };

  /**
   * Get cart
   * @returns cart
   */
  const getCart = (): ICartProduct[] => {
    return _cart;
  };

  return {
    addToCart,
    removeFromCart,
    permenantlyRemoveFromCart,
    cartTotalPrice,
    clearCart,
    getCart,
  };
}

export default useCart;
