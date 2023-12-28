
  
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

interface PopupDeleteType {
  deleteCategoryWithProduct?: Function | any;
  id: number;
  onClose: Function;
  setIsDisabled?: any;
  isDisabled?: boolean;
  popupTextProduct?: string;
  popupText?: string;
  isDeleteRecordData?:Function|any;
}

const CategoryProductDelete = ({
  deleteCategoryWithProduct,
  popupTextProduct,
  id,
  onClose,
  setIsDisabled,
  isDisabled,
  popupText,
  isDeleteRecordData,
}: PopupDeleteType) => {
  const [topRightModal, setTopRightModal] = useState(true);

  const toggleOpen = () => {
    setTopRightModal(!topRightModal);
    onClose();
    setIsDisabled(false);
  };

  const storeFun = () => {
      isDeleteRecordData(id);
    deleteCategoryWithProduct(id);
    toggleOpen();
  };


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
                  <p>{popupText}</p>
                  <p>{popupTextProduct}</p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                outline
                color="danger"
                onClick={() => {
                  storeFun();
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

export default CategoryProductDelete;
