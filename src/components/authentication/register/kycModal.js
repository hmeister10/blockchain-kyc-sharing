import * as React from 'react';
import PropTypes from 'prop-types';
import { Stack, TextField, Modal, Box, Typography } from '@mui/material';
import CustomizedTimeline from './kycTimeline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

KycModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleComplete: PropTypes.func
};

export default function KycModal({ open, handleClose, handleComplete }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Complete KYC using the a third-party service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <CustomizedTimeline handleComplete={handleComplete} />
            </Stack>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
