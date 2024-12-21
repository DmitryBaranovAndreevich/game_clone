import { Form, Input } from "antd"
import { REGISTER_FOR_FIELDS } from "./register-form-constants"
import styles from "./register-form.module.css"

export const RegisterForm = () => {
  return (
    <div className={styles.form}>
      {REGISTER_FOR_FIELDS.map(el => {
        return (
          <Form.Item label={el.label} name={el.value} key={el.value}>
            <Input
              placeholder={el.label.toLocaleLowerCase()}
              className={styles.input}
            />
          </Form.Item>
        )
      })}
    </div>
  )
}
