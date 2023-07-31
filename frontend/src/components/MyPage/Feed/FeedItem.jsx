import * as hooks from "./hooks";
import * as ItemDetail from "./FeedItemDetail";

const FeedItem = ({ top, bot, ...props }) => {
  const { isOpen, handleIsOpen } = hooks.useModal();

  return (
    <>
      <div>
        <img
          src={top}
          onClick={handleIsOpen}
          style={{
            boxSizing: "border-box",
            height: "200px",
            width: "340px",
            border: "1px solid black",
            cursor: "pointer",
          }}
          alt="alt"
          {...props}
        />
        <div
          onClick={handleIsOpen}
          style={{
            height: "80px",
            width: "340px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          {bot}
        </div>

        <ItemDetail.Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
          {top}
        </ItemDetail.Modal>
      </div>
    </>
  );
};

export { FeedItem };
