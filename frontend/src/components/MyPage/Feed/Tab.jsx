import './Feed.css';

const TabButton = ({ children, selected, onClick, style }) => {
  const backgroundColor = selected ? '#007bff' : '#f0f0f0';
  const color = selected ? '#fff' : '#333';

  return (
    <>
      <button
        className="Feed-TabButton"
        style={{
          backgroundColor,
          color,
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

const TabContent = ({ children, isActive }) => {
  if (!isActive) {
    return null;
  }
  return <div className="Feed-TabContent">{children}</div>;
};

export { TabButton, TabContent };
