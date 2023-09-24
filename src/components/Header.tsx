import React from "react";
import Button from "./Base/Button";
import Dialog from "./Base/Dialog";
import { useCartContext } from "../contexts/CartContext";

const Header: React.FC = () => {
  const { cart } = useCartContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(cart);
  }, [cart, isOpen]);
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
          <div className="black-bg overflow-hidden shadow-2xl text-white rounded-2xl sm:w-10/12 relative sm:h-[83.333%] h-full w-full">
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute select-none top-2 right-2 text-heading cursor-pointer bg-white px-3 py-0.5 text-black rounded-full duration-300 active:scale-95"
            >
              Close
            </div>

            <div className="w-full h-full py-3 px-5 sm:p-10">
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
                  <span className="text-sm">0 items</span>
                </div>
                {/* cart items */}
                <div className="mt-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 hover:bg-stone-900 border p-2 border-stone-700 rounded-lg mb-1 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 cursor-pointer select-none flex justify-center items-center border rounded-full  overflow-hidden p-1.5">
                        <span className="w-full h-full text-heading flex justify-center items-center rounded-full black-bg text-white dark:text-[#222] dark:bg-white">
                          s
                        </span>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-heading text-sm">Product Name</h5>
                        <span className="text-xs text-stone-400">$12.99</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-stone-400">Qty:</span>
                      <span className="text-xs text-stone-400 ml-1">1</span>
                    </div>
                  </div>
                  {/* empty cart state */}
                  {/* <div className="py-10 flex justify-center items-center flex-col">
                    <h4 className="text-stone-300 text-lg text-heading">
                      Your cart is empty
                    </h4>
                    <p className="text-center text-stone-400">
                      try to by something for yourself, wife, husband, children,
                      parents, friends, colleagues, co-workers, boss (no except
                      this one),
                      <br />
                      <strong>Give us some money dude!!!!🤑</strong>
                    </p>
                  </div> */}
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
