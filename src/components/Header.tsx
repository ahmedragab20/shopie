import React from "react";
import Button from "./Base/Button";
import Dialog from "./Base/Dialog";
import { paseJson } from "../utils/validators";
import { ICartProduct } from "../types/products";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cart: ICartProduct[] = paseJson(
    localStorage.getItem("__shopie__cart___") || "[]"
  );

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
                      <div className="flex items-center backdrop-blur-md justify-between flex-wrap gap-2 border p-2 rounded-lg mb-1 cursor-pointer hover:bg-[#f1f1f1]">
                        <div className="flex items-center">
                          <div className="w-10 h-10 cursor-pointer select-none flex justify-center items-center overflow-hidden">
                            <span className="w-full h-full flex justify-center items-center">
                              <img
                                src={product.images?.[0].url}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </span>
                          </div>
                          <div className="ml-3">
                            <h5 className="text-heading text-sm">
                              {product.name}
                            </h5>
                            <span className="text-xs text-stone-400">
                              {product.chosenColor.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-stone-400">Qty:</span>
                          <span className="text-xs text-stone-400 ml-1">
                            {product.quantity}
                          </span>
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
