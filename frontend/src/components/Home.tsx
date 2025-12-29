import { useEffect } from "react"; 

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-screen   flex items-center justify-between">
      <div className="h-full pt-24 w-1/2 flex flex-col justify-center gap-4   px-10 text-white">
        <h4 className="text-xl uppercase tracking-widest text-[#f7a582] font-semibold">
          We take care of your health
        </h4>

        <h2 className="text-5xl text-[#06332e] font-bold leading-tight">
          We Are Providing Best & Affordable Health Care.
        </h2>

        <span className="text-base text-gray-600 leading-relaxed max-w-md">
          Our goal is to deliver the highest quality healthcare services. We
          believe that everyone deserves access to excellent medical care
          without compromising on quality.
        </span>
      </div>

      <div className="h-full  w-1/2 relative flex   items-center justify-center  ">
        <img
          src="/images/doctor.png"
          alt="doctor"
          className=" mt-28 object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
