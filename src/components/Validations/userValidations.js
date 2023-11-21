import * as yup from "yup";

const passwordRules =
  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

// firstname, lastname, email, password, confPassword

export const schema = yup.object().shape({
  firstname: yup
    .string()
    .min(3)
    .max(16)
    .required()
    .trim("White spaces before/after firstname are not allowed"),
  lastname: yup.string().min(1).max(16),
  email: yup.string().min(12).max(50),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "Must contain 8 characters, one Uppercase, one lowercase, one number and one special character ",
    })
    .required(),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords did'nt matched ")
    .required("Required"),
});
