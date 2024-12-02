import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

interface PensionFormValues {
  desiredIncome: number;
  employerContribution: number;
  personalContribution: number;
  retirementAge: number;
  extraPots?: number;
}

interface PensionFormProps {
  onSubmit: (values: PensionFormValues) => void;
}

const validationSchema = Yup.object({
  desiredIncome: Yup.number()
    .required("Desired annual income is required")
    .positive("Income must be a positive number")
    .integer("Income must be an integer"),
  employerContribution: Yup.number()
    .required("Employer monthly contribution is required")
    .positive("Contribution must be a positive number")
    .integer("Contribution must be an integer"),
  personalContribution: Yup.number()
    .required("Your monthly contribution is required")
    .positive("Contribution must be a positive number")
    .integer("Contribution must be an integer"),
  retirementAge: Yup.number()
    .required("Retirement age is required")
    .min(26, "Retirement age must be at least 26")
    .max(100, "Retirement age must be less than or equal to 100")
    .integer("Age must be an integer"),
  extraPots: Yup.number().positive("Extra pots must be a positive amount"),
});

const PensionForm = ({ onSubmit }: PensionFormProps) => {
  return (
    <Formik
      initialValues={{
        desiredIncome: 0,
        employerContribution: 0,
        personalContribution: 0,
        retirementAge: 65,
        extraPots: undefined,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={3}>
            <Field
              name="desiredIncome"
              as={TextField}
              label="Desired Annual Income"
              variant="outlined"
              fullWidth
              type="number"
              error={touched.desiredIncome && !!errors.desiredIncome}
              helperText={touched.desiredIncome && errors.desiredIncome}
            />

            <Field
              name="employerContribution"
              as={TextField}
              label="Employer Monthly Contribution"
              variant="outlined"
              fullWidth
              type="number"
              error={
                touched.employerContribution && !!errors.employerContribution
              }
              helperText={
                touched.employerContribution && errors.employerContribution
              }
            />

            <Field
              name="personalContribution"
              as={TextField}
              label="Your Monthly Contribution"
              variant="outlined"
              fullWidth
              type="number"
              error={
                touched.personalContribution && !!errors.personalContribution
              }
              helperText={
                touched.personalContribution && errors.personalContribution
              }
            />

            <Field
              name="retirementAge"
              as={TextField}
              label="Retirement Age"
              variant="outlined"
              fullWidth
              type="number"
              error={touched.retirementAge && !!errors.retirementAge}
              helperText={touched.retirementAge && errors.retirementAge}
            />
            <Field
              name="extraPots"
              as={TextField}
              label="Extra pots"
              variant="outlined"
              fullWidth
              type="number"
              error={touched.extraPots && !!errors.extraPots}
              helperText={touched.extraPots && errors.extraPots}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={
                !isValid ||
                !touched.desiredIncome ||
                !touched.employerContribution ||
                !touched.personalContribution ||
                !touched.retirementAge
              }
            >
              Calculate Pension Pot
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PensionForm;
