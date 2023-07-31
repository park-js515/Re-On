import * as Sty from "./style";

const TabButton = ({ children, selected, onClick }) => {
  return (
    <Sty.STabButton selected={selected} onClick={onClick}>
      {children}
    </Sty.STabButton>
  );
};

const TabContent = ({ children, isActive }) => {
  if (!isActive) {
    return;
  }

  return <Sty.STabContent>
    {children}
  </Sty.STabContent>
};

export {TabButton, TabContent}
