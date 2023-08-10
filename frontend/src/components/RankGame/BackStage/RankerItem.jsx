const RankerItem = ({ result }) => {
  return (
    
    <div className="flex ">
      
      <div>{result.tier}</div>
      <div>{result.name}</div>
    </div>
  );
};

export default RankerItem;
