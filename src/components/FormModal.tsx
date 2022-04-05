import React, { FC } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  boxShadow: 12,
  p: 4
};

type FormModalPropsType = {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
};

export const FormModal: FC<FormModalPropsType> = ({
  setOpenModal,
  openModal,
  children
}) => {
  const handleModalCloseClick = () => setOpenModal(false);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleModalCloseClick}
        sx={{
          backgroundColor: "#fff"
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
