import Button from "./Button";
import RankerList from "./RankerList";

const RightSide = () => {
  return (
    <div className="flex flex-col justify-around h-full">
      <RankerList />
      <Button />
    </div>
  );
};

export default RightSide;
