const Navbar = () => {
  return (
    <>
      <div className="fixed z-10 ">
        <div className="grid grid-cols-2  justify-between gap-[5vh] lg:gap-[85vh] py-3 px-3 lg:px-[380px] ">
          <h2 className="font-bold text-xl text-white">Wego</h2>
          <div className="flex justify-evenly gap-2">
            {" "}
            <button className="transferent font-semibold  text-white bg-gray-200/40 px-3 py-1 rounded-lg">
              Login
            </button>
            <button className="btn bg-green-600 font-semibold text-white px-4 py-1 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
