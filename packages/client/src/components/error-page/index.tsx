import {FC} from 'react';
import { Button, Typography } from 'antd';

import styles from './style.module.css';

type TComponentProps = {
  id: string,
  title: string,
  subtitle: string
};

const ErrorPage: FC<TComponentProps> = ({id, title, subtitle}) => {
  return (
    <div id={id} className={styles.container}>
      <Typography.Title level={2} className={styles.title}>{title}</Typography.Title>
      <Typography.Title level={3} className={styles.subtitle}>{subtitle}</Typography.Title>
      <Button className={styles.button} ghost>Back</Button>
    </div>
  )
}

export default ErrorPage;