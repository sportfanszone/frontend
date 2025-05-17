import Image from "next/image";

type LeagueCardProps = {
  leagueName: string;
  topics: number;
  lastActivity: string;
  description: string;
  logo: string;
};

const LeagueCard = ({
  leagueName,
  topics,
  lastActivity,
  description,
  logo,
}: LeagueCardProps) => {
  return (
    <div className="shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-6 max-w-80 min-w-66 cursor-pointer transition-all duration-150 ease-in-out">
      <div className="mb-4 shadow-card rounded-3xl px-5 py-6 text-white bg-green-500">
        <h1 className="font-bold text-xl">{leagueName}</h1>
      </div>
      <div className="flex justify0between align-center gap-3">
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">TOPICS</span>
          <span className="font-bold text-lg">{topics}</span>
        </div>
        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-sm mb-1">LAST ACTIVITY</span>
          <span className="font-bold text-lg">{lastActivity}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center mb-4">
        <span className="text-gray-500 text-sm mb-1">DESCRIPTION</span>
        <div className="flex justify-start items-center gap-3">
          <Image
            src={logo}
            width={200}
            height={200}
            alt="League logo"
            className="h-10 w-10 object-cover rounded-full"
          />
          <span className="text-sm">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;
