import MUIButton from '@mui/material/Button';
import MUITooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const RecentGameItem = ({ game }) => {
  let backgroundColor;
  let hoverColor;

  switch (game.category) {
    case '승':
      backgroundColor = '#2196F3';
      hoverColor = '#1976d2';
      break;
    case '패':
      backgroundColor = '#ef5350';
      hoverColor = '#d32f2f';
      break;
    case '무':
      backgroundColor = '#4caf50';
      hoverColor = '#2e7d32';
      break;
    case '':
      backgroundColor = '#E9E9E9';
      hoverColor = '#DEDEDE';
      break;
    default:
      backgroundColor = '#fff';
      hoverColor = 'black';
  }

  return (
    <MUITooltip
      title={
        <Typography variant="body2">
          상대 : {game.user2}<br />
          영상 : {game.videoId}<br />
          점수 : {game.point}
        </Typography>
      }
      arrow
      placement="top"
    >
      <MUIButton
        variant="contained"
        size="large" // 큰 크기의 버튼을 사용
        sx={{
    
   
          padding: '1vw 1.5vw', // 좀 더 큰 패딩으로 버튼 크기 조정
          fontSize: '1.1rem', // 폰트 크기 조절
          borderRadius: '20px', // 버튼 모서리 둥글게
          margin: '0vw 0.1vw',
          backgroundColor,
          '&:hover': {
            backgroundColor: hoverColor,
          },
        }}
      >
        {game.category}
      </MUIButton>
    </MUITooltip>
  );
};

export default RecentGameItem;
