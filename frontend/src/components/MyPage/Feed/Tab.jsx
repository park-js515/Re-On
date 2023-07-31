const TabButton = ({ children, selected, onClick }) => {
  const backgroundColor = selected ? "#007bff" : "#f0f0f0";
  const color = selected ? "#fff" : "#333";

  return (
    <button
      style={{
        border: "none",
        padding: "10px 20px",
        marginRight: "10px",
        height: "50px",
        cursor: "pointer",
        backgroundColor,
        color,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const TabContent = ({children, isActive}) => {
  if (!isActive) {
    return null;
  }
  return <div style={{ boxSizing: "border-box" }}>{children}</div>;
};

export { TabButton, TabContent };
