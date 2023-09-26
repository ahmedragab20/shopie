import React from "react";
import Button from "./Base/Button";
import Dialog from "./Base/Dialog";
import { paseJson } from "../utils/validators";
import { ICartProduct } from "../types/products";
import useCart from "../composables/useCart";

type updateProductAction = "increase" | "decrease" | "remove";

const Header: React.FC = () => {
  const { addToCart, removeFromCart, permenantlyRemoveFromCart } = useCart();
  const cart: ICartProduct[] = paseJson(
    localStorage.getItem("__shopie__cart__") || "[]"
  )!;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickedCartProduct, setClickedCartProduct] = useState<ICartProduct>();
  const [clickedCartProductQuantity, setClickedCartProductQuantity] =
    useState<number>(0);
  const updateClickedCartProduct = (product: ICartProduct) => {
    if (!product || clickedCartProduct?.id === product?.id) {
      console.log("product is undefined or same product clicked");

      setClickedCartProduct(undefined);
      return;
    }
    console.log(product.quantity);

    setClickedCartProductQuantity(product.quantity);
    setClickedCartProduct(product);
  };

  /**
   * - will increase/decrease the quantity of the product in cart
   * - will remove the product completely from cart.
   * @param action
   * @returns
   */
  const updateCartProduct = (action: updateProductAction) => {
    if (!clickedCartProduct) {
      return;
    }
    console.log(
      `%c${action}`,
      "color: #73C6B6; font-weight: bold; font-size: 20px;"
    );

    switch (action) {
      case "increase":
        console.log("increase", clickedCartProduct);
        setClickedCartProductQuantity(clickedCartProductQuantity + 1);
        addToCart(clickedCartProduct);
        break;
      case "decrease":
        console.log("decrease", clickedCartProduct);
        if (clickedCartProductQuantity <= 1) {
          return;
        }
        setClickedCartProductQuantity(clickedCartProductQuantity - 1);
        removeFromCart(clickedCartProduct);
        break;
      case "remove":
        console.log("remove", clickedCartProduct);
        setClickedCartProductQuantity(0);
        permenantlyRemoveFromCart(clickedCartProduct);
        break;
      default:
        break;
    }

    const product = cart.find(
      (p) =>
        p.id === clickedCartProduct.id ||
        p.id ===
          `${clickedCartProduct.id}-${clickedCartProduct?.chosenColor.name}`
    );

    if (product) {
      setClickedCartProduct(product);
    }
  };

  useEffect(() => {
    console.log("cart changed too much", cart);
  }, [cart]);

  useEffect(() => {
    console.log(
      "clickedCartProductQuantity changed too much",
      clickedCartProductQuantity
    );
  }, [clickedCartProductQuantity]);

  return (
    <>
      <header className="p-2 flex justify-center items-center flex-col backdrop-blur-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto">
          <div className="w-full flex items-center justify-between">
            <span className="w-10 h-10 cursor-pointer select-none flex justify-center items-center border rounded-full  overflow-hidden p-1.5">
              <span className="w-full h-full text-heading flex justify-center items-center rounded-full black-bg text-white dark:text-[#222] dark:bg-white">
                s
              </span>
            </span>

            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              bgColor="black-bg"
              outlineBorderColor="border-[#222]"
            >
              <span className="text-sm">=</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Use react-transition-group to transition this */}

      {isOpen && (
        <Dialog
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="bg-[#f4f4f4ee] flex shadow-2xl rounded-2xl relative max-w-5xl max-h-[90svh] overflow-hidden">
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute select-none top-2 right-2 text-heading cursor-pointer black-bg px-3 py-0.5 text-white rounded-full duration-300 active:scale-95"
            >
              Close
            </div>

            <div className="w-full max-h-full py-3 px-5 sm:p-10 overflow-x-hidden overflow-y-auto border">
              <div>
                <h3 className="sm:text-6xl text-3xl text-heading">Shopie</h3>
                <p className="text-xs sm:text-sm text-stone-400">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Rerum dolore, veniam quaerat delectus itaque amet assumenda
                  magni, aliquid vero odit ipsam magnam, nemo placeat maxime.
                  Fugiat voluptatum aliquam atque unde?
                </p>
              </div>
              <div className="mt-5">
                {/* cart preface */}
                <div className="flex items-center justify-between">
                  <h4 className="text-heading text-sm">Cart</h4>
                  <span className="text-sm">
                    {cart?.length} {cart?.length > 1 ? "items" : "item"}
                  </span>
                </div>
                {/* cart items */}
                <div className="mt-3">
                  {cart?.length > 0 ? (
                    cart.map((product: ICartProduct) => (
                      <div
                        key={product?.id}
                        id={product.id}
                        className="flex justify-center backdrop-blur-sm flex-col flex-wrap gap-2 border rounded-lg mb-1 cursor-pointer hover:bg-[#f1f1f1]"
                      >
                        <div
                          className="w-full flex items-center p-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              (e.target as HTMLDivElement)?.id ===
                              "cart_actions"
                            ) {
                              return;
                            }

                            updateClickedCartProduct(product);
                          }}
                        >
                          <div className="flex items-center w-full">
                            <div className="sm:w-16 sm:h-16 w-12 h-12 cursor-pointer select-none flex justify-center items-center overflow-hidden">
                              <span className="w-full h-full flex justify-center items-center">
                                <img
                                  src={product.images?.[0].url}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </span>
                            </div>
                            <div className="ml-3">
                              <h5 className="text-heading text-sm -mb-2">
                                {product.name}
                              </h5>
                              <span className="text-xs text-stone-400">
                                {product.chosenColor.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="-mb-2">
                              <span className="text-xs text-stone-400">
                                Qty:
                              </span>
                              <span className="text-xs text-stone-400 ml-1">
                                {product.quantity}
                              </span>
                            </div>
                            <div>
                              <span>
                                <span className="text-xs text-stone-400">
                                  {product.price}
                                  {product.currencySymbol}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {clickedCartProduct?.id === product?.id && (
                            <div className="px-2 pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Button
                                    onClick={() => {
                                      updateCartProduct("decrease");
                                    }}
                                    bgColor="bg-stone-800"
                                    outlineBorderColor="border-stone-800"
                                  >
                                    <span className="text-sm text-white text-heading">
                                      Minus
                                    </span>
                                  </Button>
                                  <div className="mx-4">
                                    <span className="text-xl text-heading text-blue-500">
                                      {/* {clickedCartProduct.quantity} */}
                                      {clickedCartProductQuantity}
                                    </span>
                                  </div>
                                  <Button
                                    onClick={() => {
                                      updateCartProduct("increase");
                                    }}
                                    bgColor="bg-stone-800"
                                    outlineBorderColor="border-stone-800"
                                  >
                                    <span className="text-sm text-white text-heading">
                                      Plus
                                    </span>
                                  </Button>
                                </div>
                                <div className="flex items-center">
                                  <Button
                                    onClick={() => {
                                      updateCartProduct("remove");
                                    }}
                                    bgColor="bg-red-400"
                                    outlineBorderColor="border-red-200"
                                  >
                                    <span className="text-sm text-white text-heading">
                                      Throw away
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 flex justify-center items-center flex-col">
                      <h4 className="text-stone-700 text-lg text-heading">
                        Your cart is empty
                      </h4>
                      <p className="text-center text-stone-500">
                        try to by something for yourself, wife, husband,
                        children, parents, friends, colleagues, co-workers, boss
                        (no except this one).
                      </p>
                    </div>
                  )}
                  {/* empty cart state */}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Header;
function parseJson(arg0: string) {
  throw new Error("Function not implemented.");
}
