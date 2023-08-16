import MUIButton from '@mui/material/Button';
import MUITooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const RecentGameItem = ({ game }) => {
  let backgroundColor;
  let hoverColor;

  if (game.point > 0) {
    backgroundColor = '#8ccfd5';
    hoverColor = '#31becb';
    
    
  } else if (game.point < 0) {
    backgroundColor = '#e17389';
    hoverColor = '#d03755';
  } else if (game.point === 0) {
    backgroundColor = '#89cc78';
    hoverColor = '#58c33e';
  } else {
    backgroundColor = '#dcdcdc';
    hoverColor = '#DEDEDE';
  }

  return (
    <MUITooltip
      title={
        <Typography variant="body2">
          {game.point !== '' ? (
            <>
              상대 : {game.opponentNickName}
              <br />
              점수 : {game.point > 0 ? '승리' : game.point < 0 ? '패배' : '무'}
            </>
          ) : (
            '없음'
          )}
        </Typography>
      }
      arrow
      placement="top"
    >
      <MUIButton
        variant="contained"
        size="large" // 큰 크기의 버튼을 사용
        sx={{
          padding: '1.3vw 1.8vw', // 좀 더 큰 패딩으로 버튼 크기 조정
          fontSize: '1.0rem', // 폰트 크기 조절
          borderRadius: '20px', // 버튼 모서리 둥글게
          backgroundColor,
          '&:hover': {
            backgroundColor: hoverColor,
          },
        }}
      >
        {game.category} {game.point > 0 ? '승' : game.point < 0 ? '패' : game.point === 0 ? '무' : '-'} 
      </MUIButton>
    </MUITooltip>
  );
};

export default RecentGameItem;
