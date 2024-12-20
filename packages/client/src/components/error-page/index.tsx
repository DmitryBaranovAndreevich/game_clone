import {FC} from 'react';
import { Button, Flex, Layout, Typography } from 'antd';

type TComponentProps = {
  id: string,
  title: string,
  subtitle: string
};

const layoutStyle = {
  height: "100vh",
  width: "100vw",
  backgroundColor: "#000",
  backgroundImage: "url(src/assets/images/image/image.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "bottom -230px left -300px",
  color: "#fff"
};

const ErrorPage: FC<TComponentProps> = ({id, title, subtitle}) => {
  return (
    <Layout>
      <Layout.Content style={layoutStyle} id={id}>
        <Flex vertical align="center" justify="center" style={ {height: "100%"} }>
          <Typography.Title style={{color: "#fff"}}>{title}</Typography.Title>
          <Typography.Title level={2}  style={{color: "#fff"}}>{subtitle}</Typography.Title>
          <Button ghost  style={{width: "100%", maxWidth: "200px"}}>Back</Button>
        </Flex>
      </Layout.Content>
    </Layout>
  )
}

export default ErrorPage;
