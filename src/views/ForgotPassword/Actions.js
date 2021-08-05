import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export const MessageResponse = ({ setCheckMail }) => (
  <CardContent>
    <img
      height="80"
      src="https://res.cloudinary.com/accelerar/image/upload/v1601232929/FrontendAssests/Carousels/mail_t2ecr8.svg"
      alt="Reset Password"
    />
    <div>
      <span>Check your email we have sent you a link for password reset</span>
      <br />
      <span>
        Didn&apos;t get a mail
        <Button
          onClick={() => setCheckMail(false)}
          variant="text"
          color="primary"
        >
          Resend
        </Button>
      </span>
    </div>
  </CardContent>
);
