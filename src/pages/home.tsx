import Button from "../components/Base/Button";
import { useTailwindBreakpoints } from "../hooks/useTailwindBreakpoints";

const Home = () => {
  const tBreakpoint = useTailwindBreakpoints();
  const moreBtnRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Recently added section */}
      <div className="flex items-center flex-col justify-end lg:h-screen min-h-[60vh] lg:min-h-screen max-h-[900px]">
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
            <p className="text-center sm:text-base text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed
            </p>
          </div>
          <div ref={moreBtnRef} className="opacity-0 duration-300">
            {/* TODO: create a reusable component for it! */}
            <Button
              onClick={() => {
                console.log(`🧲`);
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
              muted
              className="w-full object-contain pointer-events-none select-none"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
