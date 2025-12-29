import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06332e] text-white">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      Loading...
    </div>
  );
};

export default Loading;
