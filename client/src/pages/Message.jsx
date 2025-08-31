import { Send, Settings } from "lucide-react";
import User from "./User";

const messages = [
  {
    id: 1,
    user: {
      name: "Obi-Wan Kenobi",
      avatar: "https://i.pravatar.cc/40?u=obiwan",
    },
    text: "You were the Chosen One!",
    time: "2 hours ago",
    status: "Seen",
  },
  {
    id: 2,
    user: {
      name: "Obi-Wan Kenobi",
      avatar: "https://i.pravatar.cc/40?u=obiwan",
    },
    text: "I loved you.",
    time: "2 hours ago",
    status: "Delivered",
  },
];

const Message = () => {
  return (
    <>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 h-20 px-6 flex items-center justify-between bg-[#064232] shadow">
        <div className="flex flex-col items-center justify-center">
          <User />
          <span className="text-xs text-green-300 -mt-5 ml-5">● online</span>
        </div>
        <Settings className="cursor-pointer text-white" />
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-6">
        {messages.map(({ id, user, text, time, status }) => (
          <div key={id} className="chat chat-start flex items-start gap-3">
            {/* User Avatar */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />

            <div>
              <div className="chat-header text-sm text-gray-400 flex items-center gap-2">
                {user.name}
                <time className="ml-2 text-xs opacity-60">{time}</time>
              </div>
              <div className="chat-bubble bg-blue-500 text-white">{text}</div>
              <div className="chat-footer text-xs opacity-50">{status}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex gap-6 items-center bottom-0 fixed h-20 bg-[#3E3F29] w-full">
        <input
          type="text"
          placeholder="Type a message"
          className="  w-[875px] bg-[#075B5E] text-white rounded-full px-4 py-3 focus:outline-none placeholder-red-200"
        />
        <button
          className="flex cursor-pointer items-center gap-2    bg-[#064232]
                   text-white rounded-full px-6 py-3 font-semibold 
                   shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out 
                   active:scale-95"
        >
          <Send className="w-5 h-5" />
          Send
        </button>
      </div>
    </>
  );
};

export default Message;
