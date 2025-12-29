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
      <div className="relative w-80 h-24  rounded-lg overflow-hidden mb-6">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-[#06332e]"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-[#06332e]"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 320 96"
          preserveAspectRatio="none"
        >
          <path
            d="M0,48 L40,48 L45,20 L50,76 L55,48 L100,48 L105,20 L110,76 L115,48 L160,48 L165,20 L170,76 L175,48 L220,48 L225,20 L230,76 L235,48 L280,48 L285,20 L290,76 L295,48 L320,48"
            fill="none"
            stroke="#f7a582"
            strokeWidth="2"
            className="ecg-line"
          />
        </svg>
      </div>

      <style>{`
        @keyframes ecgPulse {
          0%, 100% {
            stroke-dashoffset: 1000;
          }
          50% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes moveDot {
          0% {
            left: -12px;
          }
          100% {
            left: calc(100% + 12px);
          }
        }

        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .ecg-line {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: ecgPulse 2s ease-in-out infinite;
        }

        .moving-dot {
          animation: moveDot 2s ease-in-out infinite;
        }

        .progress-bar {
          animation: progressBar 3s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
