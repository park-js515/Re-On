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
    tier: 'silver',
  },
  {
    name: '유저5',
    tier: 'silver',
  },
];
const RankerList = () => {


  return (
    <Container>
     
  
      <div className="profile-container">
      
        🏆랭크순위
   
        {DummyData.map((ranker, index) => (
        <RankerItem key={index} result={ranker} />
        ))}
      </div>

    
    </Container>
  );
};


export default RankerList;