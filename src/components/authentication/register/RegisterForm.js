import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KycModal from './kycModal';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setUserData } = useMoralis();

  const navigate = useNavigate();
  const completeKYC = async () => {
    // When KYC check passes,
    console.log({ formik });

    // Set user data
    await setUserData({
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email
    });

    // navigate to next page
    navigate('/dashboard', { replace: true });
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    publicId: Yup.string().required('Public ID is required to perform e-KYC')
  });

  const formik = useFormik({
    initialValues: {
      firstName: 'Tony',
      lastName: 'Stank',
      email: 'edith@marvel.com',
      publicId: '1800EDITH'
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // Perform KYC check here
      handleOpen();
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            label="Public Id (eg. Aadhar Number)"
            {...getFieldProps('publicId')}
            error={Boolean(touched.publicId && errors.publicId)}
            helperText={touched.publicId && errors.publicId}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
      <KycModal open={open} handleClose={handleClose} handleComplete={completeKYC} />
    </FormikProvider>
  );
}
