import { Button, DatePicker, Form, Input, Radio, Typography } from "antd";
import { FormComponentProps } from "antd/es/form";
import moment from "moment";
import React from "react";

const { Text } = Typography;

interface UserFormProps extends FormComponentProps {
  student: any;
  editData: (student: object) => void;
  handleOk: () => void;
}

class UserForm extends React.Component<UserFormProps, any> {
  state = {
    valueRadio: "",
  };

  componentDidMount() {
    this.setState({ valueRadio: this.props.student.gender });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const student = {
          id: this.props.student.id,
          fullname: values.fullname,
          birthday: values.birthday._d.toLocaleDateString("vi-VN"),
          gender: values.gender,
          email: values.email,
          phone: `${values.prefix}${values.phone}`,
          address: values.address,
        };
        console.log(student);

        this.props.editData(student);
        this.props.handleOk();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { student } = this.props;
    const studentBirthday = new Date(student.birthday).toISOString();

    const studentPhone = student.phone.slice(2);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 20,
        },
      },
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "84",
    })(<Text>+84 </Text>);
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Họ và tên" labelAlign="left">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
            initialValue: student.fullname,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Ngày sinh" labelAlign="left">
          {getFieldDecorator("birthday", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
            initialValue: moment(studentBirthday),
          })(<DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Giới tính" labelAlign="left">
          {getFieldDecorator("gender", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
            initialValue: student.gender,
          })(
            <Radio.Group
              onChange={(e) => this.setState({ valueRadio: e.target.value })}
              value={this.state.valueRadio}
            >
              <Radio value={"Nam"}>Nam</Radio>
              <Radio value={"Nữ"}>Nữ</Radio>
              <Radio value={"Khác"}>Khác</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="E-mail" labelAlign="left">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng E-mail!",
              },
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
            initialValue: student.email,
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Số điện thoại" labelAlign="left">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Vui lòng nhập trường này!" },
              { len: 9, message: "Vui lòng nhập đúng số điện thoại!" },
            ],
            initialValue: studentPhone,
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              type="number"
            />
          )}
        </Form.Item>
        <Form.Item label="Địa chỉ" labelAlign="left">
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "Vui lòng nhập trường này!" }],
            initialValue: student.address,
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const EditForm = Form.create<UserFormProps>({})(UserForm);

export default EditForm;
