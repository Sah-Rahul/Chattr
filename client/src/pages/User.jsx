const User = () => {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="w-10 h-10 bg-pink-700 overflow-hidden rounded-full">
         <img src="https://i.pravatar.cc/40?u=obiwan" alt="user" />
      </div>
      <p className="text-white font-medium">Rahul Sah</p>
    </div>
  );
};

export default User;
