import Image from "next/image";

type TopicCardProps = {
  topic: {
    id: number;
    title: string;
    createdAt: string;
    user: {
      firstName: string;
      middleName: string;
      lastName: string;
      profileImage: string;
    };
  };
};

const TopicCard = ({
  topic: {
    id,
    title,
    createdAt,
    user: { firstName, middleName, lastName, profileImage },
  },
}: TopicCardProps) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <Image
        src={profileImage}
        className="rounded-full w-10 h-10 object-cover"
        alt="User Profile"
        width={100}
        height={100}
      />
      <div>
        <div>
          <span className="font-bold mr-3">
            {firstName} {middleName} {lastName}
          </span>
          <span className="text-black/40">{createdAt}</span>
        </div>
        <div className="text-black/40">{title}</div>
      </div>
    </div>
  );
};

export default TopicCard;
