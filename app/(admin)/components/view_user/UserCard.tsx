import UserAvatar from "@/app/components/ui/UserAvatar";

const UserCard = () => {
  return (
    <>
      {/* Profile photo and cover */}
      <div
        style={{ backgroundImage: `url("https://placehold.co/900x200")` }}
        className="bg-cover bg-center h-48 w-full flex items-center justify-center relative"
      >
        <div className="flex flex-col items-center justify-center absolute bottom-[-50%] left-10">
          <div className="relative w-32 h-32 mb-4">
            <UserAvatar alt="JD" className="rounded-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500"></p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
