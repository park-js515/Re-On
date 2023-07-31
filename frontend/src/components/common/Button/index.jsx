const Button = ({ name, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{name}</button>
    </div>
  );
};

export default Button;
