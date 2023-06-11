import React from "react";
import { useModal } from "../../context/Modal";


function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <button 
  style={{backgroundColor:"rgb(168 42 100)", width:"100px", height:"25px", color:"white", border:"none", marginBottom:"20px"}} 
  onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;