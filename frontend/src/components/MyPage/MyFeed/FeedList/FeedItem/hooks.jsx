import { useEffect, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return { isOpen, handleIsOpen };
};

export { useModal };
