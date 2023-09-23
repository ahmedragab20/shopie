import { Color, Product } from "../../types/products";
import Button from "../components/Base/Button";
import Dialog from "../components/Base/Dialog";
import useHomeProducts from "../hooks/useHomeProducts";
import { useTailwindBreakpoints } from "../hooks/useTailwindBreakpoints";

const Home = () => {
  const tBreakpoint = useTailwindBreakpoints();
  const moreBtnRef = useRef<HTMLDivElement>(null);
  const [seeMoreDialog, setSeeMoreDialog] = useState<boolean>(false);
  const [mostRecent, setMostRecent] = useState<Product>();
  const [selectedColor, setSelectedColor] = useState<Color>();
  const ativeImage = mostRecent?.images?.find(
    (image) => image.color === selectedColor?.name
  );
  const products = useHomeProducts();

  useEffect(() => {
    const moreBtn = moreBtnRef.current;

    if (moreBtn && tBreakpoint) {
      if (
        tBreakpoint === "xs" ||
        tBreakpoint === "sm" ||
        tBreakpoint === "md"
      ) {
        moreBtn.classList.remove("opacity-0");

        return;
      }

      setTimeout(() => {
        moreBtn.classList.add("opacity-100");
        moreBtn.classList.remove("opacity-0");
      }, 5500);
    }
  }, [tBreakpoint]);

  useEffect(() => {
    if (!seeMoreDialog) return;

    (async () => {
      const { product } = await $catch({
        ep: "most-recent-product.json",
        cache: "RELOAD", // no need to check refetching the same data. that will handle it.
      });

      setMostRecent(product);
      setSelectedColor(product?.colors?.[0]);
    })();
  }, [seeMoreDialog]);

  return (
    <>
      {/* Recently added section */}
      <div className="flex items-center flex-col justify-end md:h-screen min-h-[40hv] md:min-h-screen max-h-[900px] mt-28 md:mt-0">
        <div className="flex justify-center flex-col items-center w-full sm:w-3/4 mx-auto px-2 mb-8">
          <div>
            <h3 className="text-center sm:text-6xl text-4xl font-extrabold text-heading">
              The New Boy Is Here!
            </h3>
            <p className="text-center sm:text-base text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed officiis numquam excepturi animi
              et possimus! Cum sequi praesentium dolore aut, accusamus magni
              eveniet autem deleniti.
            </p>
          </div>
          <div ref={moreBtnRef} className="opacity-0 duration-300 mt-5">
            {/* TODO: create a reusable component for it! */}
            <Button
              onClick={() => {
                setSeeMoreDialog(true);
              }}
              bgColor="bg-[#D594A0]"
              outlineBorderColor="border-[#D594A0]"
            >
              ✨ More Coolness! ✨
            </Button>
          </div>
        </div>

        <div className="w-full">
          {tBreakpoint === "xs" ||
          tBreakpoint === "sm" ||
          tBreakpoint === "md" ? (
            <img
              src="/iphone-15-sm.jpg"
              alt="iPhone 15"
              className="w-full object-contain pointer-events-none select-none"
            />
          ) : (
            <video
              src="/iphone-15-video.mp4"
              autoPlay
              playsInline
              muted
              className="w-full object-contain pointer-events-none select-none"
            />
          )}
        </div>
      </div>

      {/* products */}
      <div className="my-10">
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-heading text-4xl sm:text-5xl">Recent Products</h3>
        </div>
        <div className="my-5">
          <div className="flex justify-center items-center flex-wrap gap-5">
            {products?.length &&
              products.map((product, i) => (
                <div
                  className="w-40 relative sm:w-60 rounded-2xl overflow-hidden border hover:border-none hover:shadow-2xl duration-200"
                  key={i}
                >
                  <div className="w-full h-48 p-3 sm:p-6">
                    <img
                      src={product?.images?.[0]?.url}
                      alt={product?.images?.[0]?.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center w-full justify-center flex-col py-3">
                    <div className="border border-slate-900 text-heading rounded-full text-slate-800 py-1 px-4">
                      {product?.currencySymbol} {product?.price}
                    </div>
                    <h5 className="text-center text-lg mt-3 text-heading max-w-full truncate px-2">
                      {product.name}
                    </h5>
                  </div>
                  {/* blury effect */}
                  <div
                    className="absolute inset-0 w-full h-full blur-lg cursor-pointer opacity-0 hover:opacity-25 duration-200"
                    style={{
                      backgroundImage: `linear-gradient(to right top, ${product.colors?.[0]?.lighter_hex}, ${product.colors?.[0]?.darker_hex})`,
                      zIndex: 0,
                    }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* TOODO:: Refactore this to display the other dialogs as well */}

      {/* Dialogs */}
      {seeMoreDialog && (
        <Dialog
          onClose={() => {
            setSeeMoreDialog(false);
          }}
        >
          <div className="bg-[#FAFAFA] backdrop-blur-xl py-5 border overflow-hidden shadow-2xl text-white rounded-2xl sm:w-10/12 relative sm:h-auto min-h-[70svh] max-h-screen w-full">
            {/* close icon */}
            <div
              onClick={() => {
                setSeeMoreDialog(false);
              }}
              className="absolute select-none top-2 right-2 text-heading cursor-pointer black-bg px-3 py-0.5 text-white rounded-full duration-300 active:scale-95"
            >
              Close
            </div>

            {/* content */}
            <div className="text-black flex h-full w-full flex-col-reverse sm:flex-row sm:p-8 p-5 overflow-auto">
              {/* details */}
              <div className="sm:w-1/2 w-full">
                <div>
                  <h3 className="sm:text-[7rem] mt-10 text-5xl text-heading text-[#333] font-extrabold">
                    {mostRecent?.brand}
                    <strong
                      style={{
                        backgroundImage: `linear-gradient(to right, ${selectedColor?.lighter_hex}, ${selectedColor?.darker_hex})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {mostRecent?.model}
                    </strong>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-10">
                    {mostRecent?.description}
                  </p>
                </div>
                <div className="mt-5">
                  {/* pick color */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-lg text-heading">
                      Pick a color
                    </h4>
                  </div>
                  <div>
                    <div>
                      <div className="flex gap-2">
                        {mostRecent?.colors.map((color, i) => (
                          <div
                            className="p-0.5 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full duration-300 active:scale-95"
                            key={i}
                            style={{
                              border:
                                selectedColor?.hex === color.hex
                                  ? `1px solid ${color.hex}`
                                  : "none",
                            }}
                            onClick={() => {
                              setSelectedColor(color);
                            }}
                          >
                            <div
                              className={`rounded-full h-full w-full`}
                              style={{
                                backgroundColor: color.hex,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  {/* Order now */}
                  <div>
                    <div className="text-sm mb-2 opacity-80 p-1">
                      🚚 Arrives in 2-3 weeks (Free Shipping)
                    </div>
                    <Button
                      bgColor="bg-[#333]"
                      outlineBorderColor="border-[#333]"
                    >
                      <div className="flex gap-2 items-center w-full">
                        <div className="py-0.5 px-2 rounded-full bg-white font-bold text-[#222]">
                          {mostRecent?.currencySymbol} {mostRecent?.price}
                        </div>
                        <div>Order Now!</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              {/* Product Preview */}
              <div className="sm:w-1/2 w-full">
                <div className="flex h-full justify-center items-center">
                  <div className="relative h-full">
                    <div className=" w-full h-full">
                      <img
                        src={ativeImage?.url}
                        alt={ativeImage?.alt}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* blury effect */}
            <div
              className="absolute -bottom-1/3 -right-10 w-96 h-96 rounded-full"
              style={{
                backgroundImage: `linear-gradient(to right, ${selectedColor?.lighter_hex}, ${selectedColor?.darker_hex})`,
                filter: "blur(100px)",
                zIndex: -1,
                opacity: 0.5,
              }}
            ></div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Home;
