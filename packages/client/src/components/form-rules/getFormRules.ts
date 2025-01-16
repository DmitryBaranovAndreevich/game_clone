import { RuleObject } from "antd/es/form"

export const getFormRules = () => {
  const userNameFormRules: RuleObject = {
    pattern: /[A-ZА-ЯЁ]{1}[a-zа-яё-]/,
    message: "Имя пользователя должно начинаться с заглавной буквы",
  }

  const requiredFieldRule: RuleObject = {
    required: true,
    pattern: /\S(.*\S)?/,
    message: "Необходимо заполнить поле",
  }

  const userLoginFormRules: RuleObject = {
    pattern: /(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/,
    message: "Логин пользователя должно должен быть длиннее 3 символов",
  }

  const emailFormRule: RuleObject = {
    pattern: /[a-zA-Z0-9_-]{1,}@{1}[a-zA-Z]{1,}[.]{1}[a-zA-Z]{1,}/,
    message: "Не корректный email",
  }

  const phoneFormRule: RuleObject = {
    pattern: /[+]{0,1}[0-9]{10,15}/,
    message: "",
  }

  const passwordFormRules: RuleObject = {
    pattern: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z]{8,40}/,
    message: "",
  }

  return {
    userNameFormRules,
    requiredFieldRule,
    userLoginFormRules,
    emailFormRule,
    phoneFormRule,
    passwordFormRules,
  }
}
