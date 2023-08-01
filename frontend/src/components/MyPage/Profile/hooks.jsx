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
    };
  }, [isOpen]);

  return { isOpen, handleIsOpen };
};

const useInputImg = (initialValue) => {
  const [img, setImg] = useState({
    src: initialValue,
  });

  const handleSetImg = (event) => {
    const file = event.target.files[0];
    setImg((current) => {
      return { ...current, src: URL.createObjectURL(file) };
    });
  };

  return [img, handleSetImg];
};

const useInputText = (initialValue, validator) => {
  const [text, setText] = useState(initialValue);

  const handleSetText = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setText(value);
    }
  };

  return [text, handleSetText];
};

export { useModal, useInputImg, useInputText };
