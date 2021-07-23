import DataTable from "./DataTable";
import { Layout } from "antd";
import AddButton from "./AddButton";
import Search from "antd/lib/input/Search";
import { Component } from "react";

const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
  state = {
    students: [],
    textSearch: "",
    filter: [],
  };
  componentDidMount() {
    const dataInit = [
      {
        id: "5d2c4703-1648-4404-88a3-8cb370648639",
        fullname: "Phạm Quang Trung",
        birthday: "8/30/1998",
        gender: "Nam",
        email: "trungpq.sondra@gmail.com",
        phone: "84336133339",
        address: "Hà Nội",
      },
      {
        id: "8ecc459e-8a96-4187-9d5a-60b2fa53e812",
        fullname: "Nguyễn Văn A",
        birthday: "7/21/2021",
        gender: "Khác",
        email: "a@gmail.com",
        phone: "84111223344",
        address: "Trương Định, Hoàng Mai",
      },
      {
        id: "06c07dc7-6690-435d-bdc3-f7dea579e1aa",
        fullname: "Trần Thị B",
        birthday: "7/12/2021",
        gender: "Nữ",
        email: "b@gmail.com",
        phone: "84987654321",
        address: "Nam Định",
      },
      {
        id: "4994cdfa-88dd-435e-b0ae-af51716d1ab4",
        fullname: "Bùi Văn C",
        birthday: "7/12/2021",
        gender: "Nam",
        email: "c@gmail.com",
        phone: "84123456789",
        address: "Paris",
      },
      {
        id: "8f357aff-0be3-4b70-9fb2-bbdaa942fb48",
        fullname: "Đào Thị D",
        birthday: "7/13/2021",
        gender: "Nữ",
        email: "aaa@gmail.com",
        phone: "84112345689",
        address: "LA",
      },
      {
        id: "3d5c562c-1fe0-4b2c-b046-795e6357b217",
        fullname: "Lê Bá E",
        birthday: "7/5/2021",
        gender: "Nam",
        email: "abc@gmail.com",
        phone: "84564526588",
        address: "China",
      },
    ];
    const data = localStorage.getItem("students");
    const students = data ? JSON.parse(data) : dataInit;
    this.setState({ students });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const students: object[] = [...this.state.students];
    if (prevState.textSearch !== this.state.textSearch) {
      const textSearch = this.state.textSearch.toLowerCase();
      const filter = students.filter(
        (student: any) =>
          student.fullname.toLowerCase().includes(textSearch) ||
          student.birthday.toLowerCase().includes(textSearch) ||
          student.gender.toLowerCase().includes(textSearch) ||
          student.email.toLowerCase().includes(textSearch) ||
          student.phone.toLowerCase().includes(textSearch) ||
          student.address.toLowerCase().includes(textSearch)
      );
      this.setState({ filter });
    }
  }

  addData = (student: object) => {
    const students: object[] = [...this.state.students];
    students.push(student);
    this.setState({ students });
    localStorage.setItem("students", JSON.stringify(students));
  };

  editData = (student: any) => {
    const students: object[] = [...this.state.students];
    const i = students.findIndex((obj: any) => obj.id === student.id);
    students.splice(i, 1, student);
    this.setState({ students });
    localStorage.setItem("students", JSON.stringify(students));
  };

  deleteData = (id: string) => {
    const oldData: object[] = [...this.state.students];
    const students = oldData.filter((student: any) => student.id !== id);
    this.setState({ students });
    localStorage.setItem("students", JSON.stringify(students));
  };

  render() {
    const { students, textSearch, filter } = this.state;
    return (
      <div>
        <Header className="header">
          <h1>Quản lý sinh viên</h1>
        </Header>
        <Content className="content">
          <div className="header-content">
            <AddButton addData={(student: object) => this.addData(student)} />
            <div className="search">
              <Search
                placeholder="Tìm kiếm..."
                onSearch={(value) => console.log(value)}
                value={textSearch}
                onChange={(e) => this.setState({ textSearch: e.target.value })}
              />
            </div>
          </div>
          <DataTable
            data={textSearch ? filter : students}
            editData={this.editData}
            deleteData={this.deleteData}
          />
        </Content>
        <Footer className="footer">FANXIPAN Company - 2021</Footer>
      </div>
    );
  }
}

export default AppLayout;
