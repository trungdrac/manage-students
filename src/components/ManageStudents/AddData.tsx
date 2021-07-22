import { Button, Input, Modal } from "antd";
import { useState } from "react";
import AddForm from "./AddForm";

const { Search } = Input;

function AddData() {
  const [addModal, addEditModal] = useState(false);

  const showModal = () => {
    addEditModal(true);
  };

  const handleOk = () => {
    addEditModal(false);
  };

  const handleCancel = () => {
    addEditModal(false);
  };

  return (
    <div className="add-data">
      <Button type="primary" onClick={showModal} icon="plus">
        Thêm
      </Button>
      <Modal
        title="Thêm sinh viên"
        visible={addModal}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        {/* <AddForm /> */}
      </Modal>
      <div className="search">
        <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          enterButton
        />
      </div>
    </div>
  );
}

export default AddData;
