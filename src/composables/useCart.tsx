import { ICartProduct, Image } from "../types/products";
import { paseJson } from "../utils/validators";

function useCart(onDialog?: boolean) {
  const [_cart, setCart] = useState<ICartProduct[]>([]);
  const _setCart = (cart: ICartProduct[]) => {
    const stored_cart = paseJson(
      localStorage.getItem("__shopie__cart__") || "[]"
    );
    let cart_clone = paseJson(JSON.stringify(cart));

    const updated_cart = cart.map((product) => {
      const arr: ICartProduct[] = [];
      cart_clone.forEach((p: ICartProduct) => {
        if (p.id === product.id) {
          arr.push(p);
        }
      });
      console.log({ arr });

      return arr[0];
    });

    console.log({
      stored_cart,
      updated_cart,
    });

    localStorage.setItem("__shopie__cart__", JSON.stringify(updated_cart));
    setCart(updated_cart);

    console.log(
      `%cCart updated`,
      "color: #C0B196; font-weight: bold; font-size: 0.9rem;",
      updated_cart
    );
  };
  useEffect(() => {
    const c = paseJson(localStorage.getItem("__shopie__cart__") || "[]");
    _setCart(c);

    return () => {
      const c = paseJson(localStorage.getItem("__shopie__cart__") || "[]");
      setCart(c);

      console.log(
        `%cCleaning the cart`,
        "color: #886032; font-weight: bold; font-size: 0.9rem;",
        c
      );
    };
  }, [onDialog]);

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

          const _nCart = JSON.parse(JSON.stringify(_cart));
          _nCart.unshift(newProductInstance);
          _setCart(_nCart);
        } else {
          const clonedProduct = JSON.parse(JSON.stringify(existingProduct));
          clonedProduct.quantity += 1;
          const _nCart = _cart.filter(
            (p: ICartProduct) => p.id !== existingProduct.id
          );
          _nCart.unshift(clonedProduct);
          _setCart(_nCart);
        }
      } else {
        const _nCart = JSON.parse(JSON.stringify(_cart));
        _nCart.unshift(product);
        _setCart(_nCart);
      }
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
   * Increase quantity of product in cart
   * @param product
   */
  const increaseQuantity = (product: ICartProduct) => {
    if (!product) return;
    if (typeof product !== "object") return;
    if (!product.id) return;

    try {
      if (_productExists(product)) {
        const existingProduct = _cart.find(
          (p: ICartProduct) => p.id === product.id
        );
        if (existingProduct) {
          const clonedProduct = JSON.parse(JSON.stringify(existingProduct));
          clonedProduct.quantity += 1;
          const _nCart = _cart.filter(
            (p: ICartProduct) => p.id !== existingProduct.id
          );
          _nCart.unshift(clonedProduct);
          _setCart(_nCart);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Decrease quantity of product in cart
   * @param product
   */
  const decreaseQuantity = (product: ICartProduct) => {
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
            let clonedProduct = JSON.parse(JSON.stringify(existingProduct));
            clonedProduct.quantity -= 1;
            let _nCart = _cart.filter(
              (p: ICartProduct) => p.id !== existingProduct.id
            );
            _nCart.unshift(clonedProduct);
            _setCart(_nCart);
          } else {
            alert("Removing product from cart");
            permenantlyRemoveFromCart(product);
          }
        }
      }
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
    const c = paseJson(localStorage.getItem("__shopie__cart__") || "[]");
    _setCart(c);
    console.log(_cart);
  };

  return {
    addToCart,
    removeFromCart,
    permenantlyRemoveFromCart,
    cartTotalPrice,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    cart: _cart,
  };
}

export default useCart;
