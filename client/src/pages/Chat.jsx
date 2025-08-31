import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";

const Chat = () => {
  return (
    <div>
      <div className="flex">
        <UserSidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Chat;
