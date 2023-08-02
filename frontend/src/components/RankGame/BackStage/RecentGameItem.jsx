import MUIButton from '@mui/material/Button';
import MUITooltip from '@mui/material/Tooltip';

const RecentGameItem = ({ game }) => {
  let backgroundColor;
  let hoverColor;

  // 게임 전적에 따른 버튼 색깔 변경
  switch (game.category) {
    case 'win':
      backgroundColor = 'blue';
      hoverColor = 'navy';
      break;
    case 'lose':
      backgroundColor = 'red';
      hoverColor = 'darkred';
      break;
    case 'draw':
      backgroundColor = 'green';
      hoverColor = 'darkgreen';
      break;
    case 'None':
      backgroundColor = 'gray';
      hoverColor = 'black';
      break;
    default:
      backgroundColor = 'gray';
      hoverColor = 'black';
  }

  return (
    <MUITooltip
      title={`
          상대 : ${game.user2}
          영상 : ${game.videoId}
          점수 : ${game.point}`}
      arrow
      placement="top"
    >
      <MUIButton
        sx={{
          color: 'white',
          backgroundColor,
          '&:hover': {
            backgroundColor: hoverColor, // 이 부분을 원하는 색상으로 변경하세요.
          },
        }}
      >
        {game.category}
      </MUIButton>
    </MUITooltip>
  );
};

export default RecentGameItem;
