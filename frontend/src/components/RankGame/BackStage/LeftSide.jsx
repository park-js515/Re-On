import UserInfo from './UserInfo';
import RecentGameList from './RecentGameList';

const LeftSide = () => {
  return (
    <div className="flex flex-col justify-around h-full">
      <UserInfo />
      <RecentGameList />
    </div>
  );
};

export default LeftSide;
