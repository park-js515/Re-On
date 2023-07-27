import * as Sty from "./style";

const TabButton = ({ children, isActive, onClick }) => {
  return (
    <Sty.STabButton isActive={isActive} onClick={onClick}>
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
