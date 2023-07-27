import RankerItem from "./RankerItem";

const DummyData = [
  {
    name: "유저1",
    tier: "M",
  },
  {
    name: "유저2",
    tier: "D5",
  },
  {
    name: "유저3",
    tier: "D5",
  },
  {
    name: "유저4",
    tier: "P5",
  },
  {
    name: "유저5",
    tier: "G5",
  },
];

const RankerList = () => {
  return (
    <div>
      <div>랭크순위</div>
      {DummyData.map((ranker, index) => (
        <RankerItem key={index} result={ranker} />
      ))}
    </div>
  );
};

export default RankerList;
