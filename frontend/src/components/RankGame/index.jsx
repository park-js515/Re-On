import { useState } from 'react';
import BackStage from './BackStage';
import BattleRoom from './BattleRoom';
import MUIButton from '@mui/material/Button';

const RankGame = () => {
  const [stage, setStage] = useState('BACK_STAGE'); // 초기 상태 설정
  const handleClick = () => {
    setStage('BATTLE_ROOM'); // 버튼 클릭 시 stage를 'BATTLE_ROOM'으로 변경
  };

  return (
    <div>
      {stage === 'BACK_STAGE' ? (
        <BackStage setStage={setStage} />
      ) : (
        <BattleRoom setStage={setStage} />
      )}
      <MUIButton variant="contained" onClick={handleClick}>
        입장
      </MUIButton>
    </div>
  );
};

export default RankGame;
