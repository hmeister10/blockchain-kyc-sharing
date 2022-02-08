import * as React from 'react';
import { Message, PhonelinkLock, CheckCircle, PlayCircle } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import PropTypes from 'prop-types';

CustomizedTimeline.propTypes = {
  handleComplete: PropTypes.func
};

export default function CustomizedTimeline({ handleComplete }) {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <Message />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sending OTP for Verification
          </Typography>
          <Typography>A typical Step in KYC where we verify something you have</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <PhonelinkLock />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            OTP verfied
          </Typography>
          <Typography>
            A way to secure this on the blockchain would be to Sign a transaction that completes
            your KYC
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <CheckCircle />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Transaction Complete
          </Typography>
          <Typography>
            This is also secure as only you can sign it using your wallet. However, keep your
            private Key safe
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <PlayCircle />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Get Started
          </Typography>
          <Typography>Thats it, your good to start using the application</Typography>
          <Button sx={{ mt: 3 }} variant="contained" color="primary" onClick={handleComplete}>
            Go to Dashboard
          </Button>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
