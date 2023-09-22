import { Product } from "../../types/products";
import Button from "../components/Base/Button";
import Dialog from "../components/Base/Dialog";
import { useTailwindBreakpoints } from "../hooks/useTailwindBreakpoints";

const Home = () => {
  const tBreakpoint = useTailwindBreakpoints();
  const moreBtnRef = useRef<HTMLDivElement>(null);
  const [seeMoreDialog, setSeeMoreDialog] = useState<boolean>(false);
  const [mostRecent, setMostRecent] = useState<Product>();

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
          <div ref={moreBtnRef} className="opacity-0 duration-300">
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

      {/* Dialogs */}
      {seeMoreDialog && (
        <Dialog
          onClose={() => {
            setSeeMoreDialog(false);
          }}
        >
          <div className="bg-[#f8f6f6e7] backdrop-blur-xl border overflow-hidden shadow-2xl text-white rounded-2xl sm:w-10/12 relative sm:h-[83.333%] h-full w-full">
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
            <div className="text-black flex h-full w-full sm:p-8 p-5 overflow-auto">
              <div className="sm:w-1/2 w-full">
                <div>
                  <h3 className="sm:text-[7rem] mt-10 text-3xl text-heading text-black font-extrabold">
                    Iphone
                    <strong>
                      <span className="bg-gradient-to-r from-[#7f3c48] to-[#F8A5AE] text-transparent bg-clip-text">
                        15
                      </span>
                    </strong>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-10">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Rerum dolore, veniam quaerat delectus itaque amet assumenda
                    magni, aliquid vero odit ipsam magnam, nemo placeat maxime.
                    Fugiat voluptatum aliquam atque unde?
                  </p>
                </div>
                <div className="mt-5">
                  {/* pick color */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-heading text-sm">Pick a color:</h4>
                  </div>
                  <div>
                    <div>
                      <pre>
                        {mostRecent && JSON.stringify(mostRecent, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Home;
