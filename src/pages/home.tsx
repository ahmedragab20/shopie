import Button from "../components/Base/Button";

const Home = () => {
  return (
    <>
      {/* Recently added */}
      <div className="flex items-center flex-col justify-end h-screen max-h-[900px]">
        <div className="flex justify-center flex-col items-center w-full sm:w-3/4 mx-auto px-2">
          <div>
            <h3 className="text-center text-6xl font-extrabold text-heading">
              The New Boy Is Here!
            </h3>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed officiis numquam excepturi animi
              et possimus! Cum sequi praesentium dolore aut, accusamus magni
              eveniet autem deleniti.
            </p>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed
            </p>
          </div>
          <div>
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
          <img
            src="/iphone-15.jpeg"
            alt="iphone 15"
            className="w-full object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
