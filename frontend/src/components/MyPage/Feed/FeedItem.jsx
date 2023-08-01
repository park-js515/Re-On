import * as hooks from "./hooks";
import * as ItemDetail from "./FeedItemDetail";

const FeedItem = ({ top, bot, ...props }) => {
  const { isOpen, handleIsOpen } = hooks.useModal();

  return (
    <>
      <div className="group">
        <img
          className="transition ease-in-out delay-150 group-hover:opacity-70"
          src={top}
          onClick={handleIsOpen}
          style={{

            boxSizing: "border-box",
            height: "200px",
            width: "340px",
            border: "1px solid black",
            cursor: "pointer",
            borderRadius: "5px 5px 0 0"
          }}
          alt="alt"
          {...props}
        />
        <div
          onClick={handleIsOpen}
          className="group-hover:underline"
          style={{
            height: "80px",
            width: "340px",
            border: "1px solid black",
            cursor: "pointer",
            borderRadius: "0 0 5px 5px"
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
