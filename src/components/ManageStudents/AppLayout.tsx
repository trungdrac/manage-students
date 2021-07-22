import DataTable from "./DataTable";
import AddData from "./AddData";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  return (
    <div>
      <Header className="header">
        <h1>Quản lý sinh viên</h1>
      </Header>
      <Content className="content">
        <AddData />
        <DataTable />
      </Content>
      <Footer className="footer">FANXIPAN Company - 2021</Footer>
    </div>
  );
}

export default AppLayout;
