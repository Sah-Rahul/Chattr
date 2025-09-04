import { useEffect, useMemo, useState } from "react";
import useAuth from "../store/auth";
import { getSocket } from "../lib/socket";
import api from "../lib/api";
import toast from "react-hot-toast";
import {
  LogOut,
  Search,
  Send,
  User2,
  Bell,
  BellOff,
  VolumeX,
  Volume,
  X,
  Menu,
} from "lucide-react";
import clsx from "clsx";

export default function Chat() {
  const { user, logout } = useAuth();
  const socket = useMemo(() => getSocket(), []);

  const [convos, setConvos] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [online, setOnline] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [mutedConvos, setMutedConvos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mutedConvos")) || [];
    } catch {
      return [];
    }
  });
  const [showNotifHistory, setShowNotifHistory] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem("mutedConvos", JSON.stringify(mutedConvos));
  }, [mutedConvos]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  function showNotification(msg) {
    if (mutedConvos.includes(msg.conversation)) return;

    const audio = new Audio("/sound.mp3");
    audio.play().catch(() => {});

    if (Notification.permission === "granted") {
      const notification = new Notification(
        `New message from ${msg.sender.name}`,
        {
          body: msg.content,
          icon: "/chat-icon.png",
        }
      );
      notification.onclick = () => window.focus();
    } else {
      toast(`${msg.sender.name}: ${msg.content}`);
    }

    setNotifications((prev) => [msg, ...prev]);
  }

  useEffect(() => {
    api
      .get("/api/conversations")
      .then((r) => setConvos(r.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    socket.on("message:new", (msg) => {
      const isCurrent = msg.conversation === active?._id;

      if (isCurrent) {
        setMessages((m) => [...m, msg]);
      } else {
        showNotification(msg);
      }

      setConvos((prev) =>
        prev.map((c) =>
          c._id === msg.conversation ? { ...c, latestMessage: msg } : c
        )
      );
    });

    socket.on("message:typing", ({ userId, isTyping }) => {
      setTypingUsers((prev) => ({ ...prev, [userId]: isTyping }));
    });

    socket.on("online:users", (list) => setOnline(list));

    return () => {
      socket.off("message:new");
      socket.off("message:typing");
      socket.off("online:users");
    };
  }, [socket, active?._id, mutedConvos]);

  const openConvo = async (c) => {
    setActive(c);
    const { data } = await api.get(`/api/messages/${c._id}`);
    setMessages(data);

    setNotifications((prev) => prev.filter((n) => n.conversation !== c._id));
  };

  const send = async () => {
    const text = input.trim();
    if (!text || !active) return;

    try {
      const { data } = await api.post(`/api/messages/${active._id}`, {
        content: text,
      });

      setInput("");
      setMessages((m) => [...m, data]);
      socket.emit("message:new", data);
    } catch (e) {
      toast.error("Failed to send");
    }
  };

  const onType = (val) => {
    setInput(val);
    if (active)
      socket.emit("message:typing", {
        conversationId: active._id,
        isTyping: val.length > 0,
      });
  };

  const search = async () => {
    const q = query.trim();
    if (!q) return setResults([]);
    const { data } = await api.get(
      "/api/users/search?q=" + encodeURIComponent(q)
    );
    setResults(data);
  };

  const startDM = async (target) => {
    const { data } = await api.post("/api/conversations/dm", {
      userId: target._id,
    });

    if (!convos.find((c) => c._id === data._id)) setConvos([data, ...convos]);
    setResults([]);
    setQuery("");
    openConvo(data);
  };

  const peer = (c) => c.members.find((m) => m._id !== user._id);

  const toggleMute = (convoId) => {
    if (mutedConvos.includes(convoId)) {
      setMutedConvos((m) => m.filter((id) => id !== convoId));
    } else {
      setMutedConvos((m) => [...m, convoId]);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((c) => !c);
  };

  // Toggle notification history sidebar
  const toggleNotifHistory = () => {
    setShowNotifHistory((s) => !s);
  };

  // Count unread notifications
  const unreadCount = notifications.length;

  return (
    <div className="h-screen flex flex-col lg:grid lg:grid-cols-12">
      {/* Mobile top bar for toggle */}
      <div className="lg:hidden flex items-center justify-between p-2 bg-gray-900 border-b border-gray-800">
        <button
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          className="p-1 rounded hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleNotifHistory}
            title="Notifications"
            className="relative p-1 rounded hover:bg-gray-800"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={logout}
            title="Logout"
            className="p-1 rounded hover:bg-gray-800"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "col-span-4 lg:col-span-3 border-r border-gray-800 bg-gray-950/80 backdrop-blur p-4 flex flex-col transition-transform duration-300 ease-in-out",
          sidebarCollapsed
            ? "-translate-x-full lg:translate-x-0 fixed inset-y-0 left-0 w-64 z-50"
            : "translate-x-0 relative"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 grid place-items-center text-white font-bold text-xl select-none">
              {(user?.name || "U")[0]}
            </div>
            <div className="hidden lg:block">
              <div className="font-semibold">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.email}</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={logout}
              className="p-2 rounded-xl hover:bg-gray-800"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
            <button
              onClick={toggleNotifHistory}
              className="relative p-2 rounded-xl hover:bg-gray-800"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search users */}
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && search()}
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:outline-none"
            placeholder="Search people by name/email"
          />
          <Search className="absolute left-3 top-3.5" size={18} />
        </div>

        {/* Search results */}
        {results.length > 0 && (
          <div className="mt-2 bg-gray-900 border border-gray-800 rounded-xl max-h-64 overflow-auto">
            {results.map((u) => (
              <button
                key={u._id}
                onClick={() => startDM(u)}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-800"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-700 grid place-items-center">
                  <User2 size={16} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{u.name}</div>
                  <div className="text-xs text-gray-400">{u.email}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <h3 className="mt-4 mb-2 text-sm uppercase tracking-wider text-gray-400 flex items-center justify-between">
          Chats
        </h3>

        <div className="flex-1 overflow-auto space-y-1">
          {convos.map((c) => {
            const p = peer(c);
            const last = c.latestMessage?.content || "Start chatting";
            const onlineDot = online.includes(p?._id);
            const isMuted = mutedConvos.includes(c._id);

            return (
              <button
                key={c._id}
                onClick={() => openConvo(c)}
                className={clsx(
                  "w-full text-left p-3 rounded-xl border border-gray-800 hover:bg-gray-900 flex items-center justify-between",
                  active?._id === c._id && "bg-gray-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gray-700 grid place-items-center">
                      <User2 size={18} />
                    </div>
                    <span
                      className={clsx(
                        "absolute -right-0 -bottom-0 w-3 h-3 rounded-full",
                        onlineDot ? "bg-green-500" : "bg-gray-600"
                      )}
                    ></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {p?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-1 truncate">
                      {last}
                    </div>
                  </div>
                </div>

                {/* Mute toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(c._id);
                  }}
                  title={isMuted ? "Unmute chat" : "Mute chat"}
                  className="p-1 rounded hover:bg-gray-800"
                >
                  {isMuted ? (
                    <VolumeX size={18} className="text-red-500" />
                  ) : (
                    <Volume size={18} />
                  )}
                </button>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Notification history sidebar */}
      {showNotifHistory && (
        <aside className="fixed right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 p-4 z-50 flex flex-col">
          <header className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={toggleNotifHistory}
              className="p-1 rounded hover:bg-gray-800"
              title="Close Notifications"
            >
              <X size={24} />
            </button>
          </header>
          <div className="flex-1 overflow-auto space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications</p>
            ) : (
              notifications.map((n) => {
                const p = convos.find((c) => c._id === n.conversation);
                const sender = n.sender?.name || "Someone";
                const convoName = p ? peer(p)?.name || "Unknown" : "Unknown";
                return (
                  <div
                    key={n._id}
                    className="p-3 rounded-xl bg-gray-800 border border-gray-700 cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      openConvo(p || { _id: n.conversation, members: [] });
                      setShowNotifHistory(false);
                    }}
                  >
                    <div className="font-semibold">{sender}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {n.content}
                    </div>
                    <div className="text-[10px] opacity-50 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>
      )}

      {/* Chat area */}
      <main
        className={clsx(
          "col-span-8 lg:col-span-9 flex flex-col bg-gradient-to-b from-gray-950 to-black transition-all duration-300",
          sidebarCollapsed && "lg:col-span-full"
        )}
      >
        {!active ? (
          <div className="flex-1 grid place-items-center text-gray-500 px-4">
            Select a chat or search a user to start
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <header className="p-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-700 grid place-items-center">
                <User2 size={18} />
              </div>
              <div>
                <div className="font-semibold">{peer(active)?.name}</div>
                <div className="text-xs text-gray-400 h-4">
                  {Object.entries(typingUsers).some(
                    ([uid, t]) => uid !== user._id && t
                  )
                    ? "Typing..."
                    : "Online"}
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto p-4 space-y-2">
              {messages.map((m) => {
                const mine = m.sender?._id === user._id;
                return (
                  <div
                    key={m._id}
                    className={clsx(
                      "max-w-[75%] rounded-2xl px-4 py-2 break-words",
                      mine
                        ? "ml-auto bg-brand-600 text-white"
                        : "bg-gray-900 border border-gray-800"
                    )}
                  >
                    <div className="text-sm">{m.content}</div>
                    <div className="text-[10px] opacity-60 mt-1">
                      {new Date(m.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-gray-800 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => onType(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:outline-none"
              />
              <button
                onClick={send}
                className="px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-500"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
