import React from "react";
import Button from "./Base/Button";
import Dialog from "./Base/Dialog";

interface HeaderRefs {
  ref?: React.RefObject<HTMLDivElement>;
}

const Header = React.forwardRef<HTMLDivElement, HeaderRefs>((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header
        ref={ref}
        className="p-2 flex justify-center items-center flex-col backdrop-blur-md fixed top-0 left-0 w-full"
      >
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
      <Dialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="black-bg overflow-hidden shadow-2xl text-white rounded-2xl sm:w-10/12 relative sm:h-[83.333%] h-full w-full">
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="absolute top-2 right-2 text-heading cursor-pointer bg-white px-3 py-0.5 font-bold text-black rounded-full duration-300 active:scale-95"
          >
            Close
          </div>

          <div className="flex">
            <div className="sm:w-1/2 w-full h-full py-3 px-5 sm:p-10">
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
              </div>
            </div>
            <div className="sm:w-1/2 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                className="w-full h-full object-contain pointer-events-none select-none"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
});

export default Header;
