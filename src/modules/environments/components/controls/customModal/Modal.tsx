import React from "react";
import { Box, Modal, Typography, Stack, Button } from "@mui/material";
import "./style/Custom-modal.scss";
export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  showConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  showActions?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Save",
  cancelText = "Cancel",
  showActions = true,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className="custom-modal">
        <Typography
          variant="h3"
          className="MuiTypography-root"
          mb={2}
        >
          {title}
        </Typography>

        <Stack spacing={2}>{children}</Stack>

        {showActions && (
          <Box className="modal-actions">
            <Button
              className="MuiButton"
              onClick={onClose}
              sx={{ mr: 1 }}
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button
                className="MuiButton"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
