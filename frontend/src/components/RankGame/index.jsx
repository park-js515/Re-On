import { useState } from 'react';
import BackStage from './BackStage';
import BattleRoom from './BattleRoom';

const RankGame = () => {
  const [stage, setStage] = useState('BACK_STAGE'); // 초기 상태 설정

  return (
    <div>
      {stage === 'BACK_STAGE' ? (
        <>
          <BackStage setStage={setStage} />
        </>
      ) : (
        <>
          <BattleRoom setStage={setStage} />
        </>
      )}
    </div>
  );
};

export default RankGame;
