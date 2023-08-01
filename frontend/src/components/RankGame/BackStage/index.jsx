import LeftSide from './subcomponents/LeftSide';
import RightSide from './subcomponents/RightSide';

const BackStage = () => {
  return (
    <div className="flex justify-around h-screen">
      <div className="w-128">
        <LeftSide />
      </div>
      <div className="w-64">
        <RightSide />
      </div>
    </div>
  );
};

export default BackStage;
