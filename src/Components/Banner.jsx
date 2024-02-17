const Banner = () => {
  return (
    <div
      className="rounded-t absolute" // Add rounded top class
      style={{
        backgroundImage: `url('https://assets.wego.com/image/upload/c_fill,fl_lossy,q_auto:best,f_auto,w_2560/v1597920831/web/hero_images/bd_1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh", // Set the height as needed
        borderRadius: "0 0 50% 50%", // Adjust border radius for wave-like shape
        overflow: "hidden", // Hide overflow for the wave effect
        position: "relative", // Position relative for pseudo-element
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0", // Position at the top
          left: "0",
          width: "100%",
          height: "10%", // Adjust height of the wave
          background:
            "linear-gradient(to top right, transparent 100%, white 50%)", // Change direction of gradient
          transform: "scaleY(-1)", // Flip gradient to make it wave-like
        }}
      />
      <h3 className="font-bold text-center text-5xl text-white max-w-3xl mx-auto absolute top-[40%] left-[30%]">
        Discover the real value of travel
      </h3>
    </div>
  );
};

export default Banner;
