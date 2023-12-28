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
import { PopupNameType } from "../../interfaces/popup-name";

const PopupName = ({ showPopup, handlePopUp, handleClose,textCategory,text }: PopupNameType) => {
  return (
    <Fragment>
      <MDBModal
        animationDirection="right"
        open={showPopup}
        tabIndex="-1"
      >
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white"></MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                <div className="col-3 text-center">
                  <i className="fas fa-shopping-cart fa-4x text-info"></i>
                </div>

                <div className="col-9">
                  <p style={{color:"red"}}>{text}</p>
                  <p style={{color:"red"}}>{textCategory}</p>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn outline color="info" onClick={handleClose}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </Fragment>
  );
};

export default PopupName;
