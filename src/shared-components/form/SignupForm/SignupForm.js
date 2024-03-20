import { Form, Formik } from 'formik';
import { getSignUpFormValidationSchema } from './validations';
import { InputField } from '../InputField';
import { Button, Link, Stack, Typography } from '@mui/material';
import { ConnectedFocusError } from 'focus-formik-error';
import { signUpFormInitialValues } from '../LoginForm/utils';
/**
 * @typedef {Object} SignupFormProps
 * @property {function} onSuccess function handler after form is successfully submitted. Should handle the endpoint calls
 * with Backend for logging in.
 * @property {function} footerOnClick
 */

/**
 * A login form that contains everything required for logins, including the submit button.
 * @param {SignupFormProps} props - {@link LoginFormProps} object
 * @type {React.FC<SignupFormProps>}
 */
const SignupForm = ({ handleSubmit, footerOnClick }) => {
  const validationSchema = getSignUpFormValidationSchema();

  return (
    <Formik
      initialValues={signUpFormInitialValues}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <ConnectedFocusError />
          <Stack spacing={1} sx={{ marginTop: '1.5rem' }}>
            <div>
              <Typography variant="subtitle2">
                {'By clicking “Sign up”, you agree to our '}
                <Link
                  href={'http://localhost:3000/legal/terms-of-service'}
                  target="_blank"
                  aria-label="Go to terms and service"
                >
                  Terms of Service
                </Link>{' '}
                {' and acknowledge you have read our '}
                <Link
                  aria-label="Go to privacy policy"
                  href={'http://localhost:3000/legal/terms-of-service'}
                  target="_blank"
                >
                  privacy policy
                </Link>
              </Typography>
            </div>
            <InputField
              name="firstName"
              label="First Name"
              required
              autoComplete=""
            ></InputField>
            <InputField
              name="lastName"
              label="Last Name"
              required
              autoComplete=""
            ></InputField>
            <InputField
              name="email"
              label="Email"
              required
              autoComplete="email"
            ></InputField>
            <InputField
              name="password"
              label="Password"
              required
              helperText="Password must be 8 characters long."
              autoComplete="current-password"
            ></InputField>
            <InputField
              name="verifyPassword"
              label="Verify Password"
              required
            ></InputField>
            <Button
              onClick={formikProps.handleSubmit}
              variant="contained"
              disabled={formikProps.isSubmitting}
            >
              Sign Up
            </Button>
            <Typography variant="subtitle2">
              {'Already have an account? '}
              <Link
                aria-label="Login to existing account"
                variant="subtitle2"
                component="button"
                target="_blank"
                onClick={footerOnClick}
                disabled={formikProps.isSubmitting}
              >
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
export default SignupForm;
