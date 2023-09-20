const Header: React.FC = () => {
  return (
    <header className="p-2 flex justify-center items-center flex-col backdrop-blur-md fixed top-0 left-0 w-full">
      <div className="container mx-auto">
        <div className="w-full flex items-center">
          <span className="w-10 h-10 cursor-pointer select-none flex justify-center items-center border rounded-full  overflow-hidden p-1.5">
            <span className="w-full h-full text-heading flex justify-center items-center rounded-full bg-black text-white dark:text-black dark:bg-white">
              s
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
