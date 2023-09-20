const Home = () => {
  return (
    <>
      {/* Recently added */}
      <div className="flex items-center flex-col justify-end min-h-screen">
        <div className="flex justify-center flex-col items-center container mx-auto">
          <div>
            <h3 className=" text-center text-6xl font-extrabold text-heading">
              The New Boy Is Here!
            </h3>
            <p className=" text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed officiis numquam excepturi animi
              et possimus! Cum sequi praesentium dolore aut, accusamus magni
              eveniet autem deleniti.
            </p>
            <p className=" text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio, id aut eius quod sed
            </p>
          </div>
          <div>
            {/* TODO: create a reusable component for it! */}
            <button
              type="button"
              className="border border-[#dfa5af] rounded-full overflow-hidden p-1 mt-5 duration-300 hover:bg-[#dfa5af] active:scale-95"
            >
              <div className="bg-[#dfa5af] rounded-full w-full h-full text-sm px-5 py-1 text-white font-semibold">
                Buy Now!
              </div>
            </button>
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
