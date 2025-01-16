import { getFormRules } from "../../../../components"

const {
  userNameFormRules,
  requiredFieldRule,
  userLoginFormRules,
  emailFormRule,
  phoneFormRule,
  passwordFormRules,
} = getFormRules()

export const REGISTER_FOR_FIELDS = [
  {
    label: "Email",
    value: "email",
    type: "text",
    rules: [emailFormRule, requiredFieldRule],
  },
  {
    label: "Login",
    value: "login",
    type: "text",
    rules: [userLoginFormRules, requiredFieldRule],
  },
  {
    label: "Name",
    value: "first_name",
    type: "text",
    rules: [userNameFormRules, requiredFieldRule],
  },
  {
    label: "Lastname",
    value: "second_name",
    type: "text",
    rules: [userNameFormRules, requiredFieldRule],
  },
  {
    label: "Phone",
    value: "phone",
    type: "text",
    rules: [phoneFormRule, requiredFieldRule],
  },
  {
    label: "Password",
    value: "password",
    type: "password",
    rules: [passwordFormRules, requiredFieldRule],
  },
  {
    label: "Confirm password",
    value: "confirmPassword",
    type: "password",
    rules: [passwordFormRules, requiredFieldRule],
  },
]
