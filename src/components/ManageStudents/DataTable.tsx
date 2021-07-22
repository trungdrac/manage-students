import { Table, Divider, Modal, Button, Popconfirm, message } from "antd";
import { useState } from "react";

function DataTable() {
  type Record = {
    key: string;
    name: string;
    age: number;
    address: string;
  };

  const [editModal, setEditModal] = useState(false);

  const showModal = () => {
    setEditModal(true);
  };

  const handleOk = () => {
    setEditModal(false);
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  const confirm = () => {
    message.success("Click on Yes");
  };

  const cancel = () => {
    message.error("Click on No");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a href="/">{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (tex: string, record: Record) => (
        <span>
          <Button type="primary" onClick={showModal} icon="edit"></Button>
          <Modal
            title="Basic Modal"
            visible={editModal}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
          >
            <p>Some contents...</p>
          </Modal>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon="delete"></Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
}

export default DataTable;
