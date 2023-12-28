import React, { Fragment, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { PopupDeleteType } from "../../interfaces/popup-delete";

const PopupDelete = ({
  isDeleteRecord,
  deleteCategoryWithProduct,
  handleCheckCategoryOrProduct,
  popupTextProduct,
  id,
  onClose,
  setIsDisabled,
  isDisabled,
  popupText
}: PopupDeleteType) => {

  const [topRightModal, setTopRightModal] = useState(true);
  const toggleOpen = () => {
    setTopRightModal(!topRightModal);
    onClose();
    setIsDisabled(false)
  };

  const handleDelete = () =>{
    // isDeleteRecord(id);
    handleCheckCategoryOrProduct(id)
    toggleOpen();
  }

  return (
    <>
      <MDBModal
        animationDirection="right"
        open={topRightModal}
        tabIndex="-1"
        setOpen={setTopRightModal}
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white">
              <MDBBtn
                color="none"
                className="btn-close btn-close-white"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-3 text-center">
                  <i className="fas fa-shopping-cart fa-4x text-info"></i>
                </div>

                <div className="col-9">
                  {/* <p>Are you sure you want to delete this....</p> */}
                  <p>{popupText}</p>
                  <p>{popupTextProduct}</p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                outline
                color="warning"
                disabled={isDisabled}
                onClick={() => {
                  handleDelete()
                }}
              >
                Ok
              </MDBBtn>

              <MDBBtn outline color="info" onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PopupDelete;
