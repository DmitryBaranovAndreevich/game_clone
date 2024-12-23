import {FC} from 'react';
import { Flex, Image, Layout, Table, TableProps, } from 'antd';


const layoutStyle = {
  height: "100vh",
  width: "100vw",
  padding: "50px 0",
  overflow: "hidden",
  color: "#fff"
};

const tableStyle = {
  maxWidth: "950px",
  width: "100%",
  color: "#fff",
};

const imageStyle = {
  maxWidth: "458px",
  width: "100%",
  marginBottom: "100px"
};

interface DataType {
  id: string;
  place: string;
  name: string;
  score: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
    align: 'center'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    align: 'center'
  }
];

const data: DataType[] = [
  {
    id: '1',
    place: '1',
    name: 'John Brown',
    score: 32,
  },
  {
    id: '2',
    place: '2',
    name: 'Jim Green',
    score: 42,
  },
  {
    id: '3',
    place: '3',
    name: 'Joe Black',
    score: 32,
  },
  {
    id: '4',
    place: '4',
    name: 'Joe Black',
    score: 32,
  },
  {
    id: '5',
    place: '5',
    name: 'John Brown',
    score: 32,
  },
  {
    id: '6',
    place: '6',
    name: 'Jim Green',
    score: 42,
  },
  {
    id: '7',
    place: '7',
    name: 'Joe Black',
    score: 32,
  },
  {
    id: '8',
    place: '8',
    name: 'John Brown',
    score: 32,
  },
  {
    id: '9',
    place: '9',
    name: 'Jim Green',
    score: 42,
  },
  {
    id: '10',
    place: '10',
    name: 'Joe Black',
    score: 32,
  },
  {
    id: '11',
    place: '11',
    name: 'John Brown',
    score: 32,
  },
  {
    id: '12',
    place: '12',
    name: 'Jim Green',
    score: 42,
  },
  {
    id: '13',
    place: '13',
    name: 'Joe Black',
    score: 32,
  },
  {
    id: '14',
    place: '14',
    name: 'John Brown',
    score: 32,
  },
  {
    id: '15',
    place: '15',
    name: 'Jim Green',
    score: 42,
  },
];

const Leaderboard: FC = () => {
  return (
    <Layout>
      <Layout.Content style={layoutStyle} id="leaderboard">
        <Flex vertical align="center" style={ {height: "100%"} }>
          <Image 
            src="./src/assets/images/logo/image-logo.png" 
            style={imageStyle} 
            preview={false} />
          <Table<DataType> 
            columns={columns} 
            dataSource={data} 
            pagination={false} 
            scroll={{ y: 350 }}
            style={tableStyle}
             />
        </Flex>
      </Layout.Content>
    </Layout>
  )
}

export default Leaderboard;
