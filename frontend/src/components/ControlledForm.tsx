import { TextField, Button, Box, BoxProps, ButtonProps } from "@mui/material";
import { useState } from "preact/hooks";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface FormFieldProps {
  fields: Field[];
  submitButton?: { label: string; styles?: ButtonProps };
  onSubmit: (formValues: { [key: string]: string }) => any;
}

const ControlledForm = (props: FormFieldProps & BoxProps) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let errors: { [key: string]: string } = {};
    let isError = false;
    props.fields.forEach((field) => {
      if (!formValues[field.name]) {
        errors[field.name] = `${field.label} is required`;
        isError = true;
      }
    });
    if (isError) {
      setFormErrors(errors);
    } else {
      props.onSubmit(formValues);
      console.log("Form submitted with values:", formValues);
    }
  };

  return (
    <Box as={"form"} {...props} onSubmit={handleSubmit}>
      {props.fields.map((field, index) => (
        <Box key={index} marginBottom={2}>
          <TextField
            fullWidth
            variant="outlined"
            label={field.label}
            name={field.name}
            type={field.type}
            value={formValues[field.name] || ""}
            onChange={handleChange}
            error={!!formErrors[field.name]}
            helperText={formErrors[field.name]}
          />
        </Box>
      ))}
      {props.submitButton && (
        <Button
          {...props.submitButton.styles}
          type="submit"
          variant="contained"
          color="primary"
        >
          {props.submitButton.label}
        </Button>
      )}
    </Box>
  );
};

export default ControlledForm;
