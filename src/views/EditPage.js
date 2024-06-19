import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Form, Button, Spin, message } from 'antd';
import { getACar,updateCar } from '../api/api';

const EditPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(()=>{
    const fetchData = async(id) => {
      try {
        const result = await getACar(id);
        setItem(result)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error)
      }
    }
    fetchData(_id)
  })

  const handleUpdateCar = async (values) => {
    try {
      updateCar(_id, values);
      message.success('Car updated successfully');
      navigate('/')
    } catch (error) {
      message.error('Failed to update car');
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h2>Edit Item</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateCar}
        initialValues={item}
      >
        <Form.Item
          label="Plate Number"
          name="plateNumber"
          rules={[{ required: true, message: 'Please enter the plate number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Car Brand"
          name="carBrand"
          rules={[{ required: true, message: 'Please enter the car brand' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Car Model"
          name="carModel"
          rules={[{ required: true, message: 'Please enter the car model' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Remark"
          name="remark"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button 
          type="primary" 
          htmlType="submit" >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default EditPage;
