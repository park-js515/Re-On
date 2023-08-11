import RankerItem from './RankerItem';
import { Container } from '@mui/system';

const DummyData = [
  {
    name: '유저1',
    tier: 'Gold',
  },
  {
    name: '유저2',
    tier: 'Gold',
  },
  {
    name: '유저3',
    tier: 'Gold',
  },
  {
    name: '유저4',
    tier: 'Silver',
  },
  {
    name: '유저5',
    tier: 'Silver',
  },
];
const RankerList = () => {
  const getRankColor = (index) => {
    switch(index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return 'bronze';
      default:
        return 'gray';
    }
  }

  const getRankIcon = (index) => {
    switch(index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return index + 1;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-full py-10 text-white ">
      <h1 className="text-5xl mb-6 font-semibold">🏆 랭크순위</h1>
      {DummyData.map((ranker, index) => (
        <div 
          key={index} 
          className={`w-3/4 py-4 px-6 mb-4 flex items-center justify-between bg-${getRankColor(index)}-200 rounded-lg shadow-lg`}
        >
          <div className="text-2xl font-semibold">
            {getRankIcon(index)} {ranker.name}
          </div>
          <div className="text-xl font-semibold">
            {ranker.tier}
          </div>
        </div>
      ))}
    </div>
  );
};



export default RankerList;