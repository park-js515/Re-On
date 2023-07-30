import { useState } from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  return {
    modalVisible,
    toggleModal,
  };
};

export default useModal;
