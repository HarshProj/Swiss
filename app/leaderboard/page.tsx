import { users } from "../data/users";

const Leaderboard = () => {
  const sortedUsers = [...users].sort((a, b) => b.engagementScore - a.engagementScore);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🏆 MemeVerse Leaderboard</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        {sortedUsers.slice(0, 10).map((user, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 border-b border-gray-300 dark:border-gray-700">
            <span className="text-xl font-bold">{index + 1}.</span>
            <img src={user.profilePic} alt={user.name} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.bio}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                🔥 Engagement Score: <span className="font-bold">{user.engagementScore}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
