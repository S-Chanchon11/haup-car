import React, { useEffect, useState } from 'react';
import { getAllCar, deleteCar, addCar } from '../api/api';
import { Card, Button, Modal, Form, Input, message } from 'antd';
import { SettingOutlined, PlusOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const deleteCard = async (carId, indexToDelete) => {
    try {
      setLoading(true);
      await deleteCar({ carId });
      const newData = data.filter((_, index) => index !== indexToDelete);
      setData(newData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async (values) => {
    try {
      setLoading(true);
      const newCar = await addCar(values);
      setData([...data, newCar]);
      message.success('Car added successfully');
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsModalVisible(false);
  };
  const showCarDetailsModal = (car) => {
    if (!editMode) {
      setSelectedCar(car);
      setIsModalVisible(true);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCar();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <SettingOutlined onClick={toggleEditMode} style={{ marginBottom: '16px' }}>
        {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
      </SettingOutlined>
      <PlusOutlined type="primary" onClick={showModal} style={{ marginLeft: '16px' }}>

      </PlusOutlined>
      <Modal
        title="Add new car"
        open={open}
        onOk={() => form.submit()}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleAddCar}
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Plate Number"
            name="plateNumber"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="carBrand"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="carModel"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Remarks"
            name="remark"
          >
            <Input.TextArea />
          </Form.Item>


        </Form>
      </Modal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {data.map((item, key) => (
          <Card
            hoverable
            onClick={() => showCarDetailsModal(item)}
            cover={<img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>}
            style={{ width: 240, paddingBottom: 4, position: 'relative' }}
          >
            <div >
              {editMode && (
                <>
                  <CloseOutlined
                    onClick={() => deleteCard(item._id, key)}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                  />
                  <EditOutlined
                    onClick={() => handleCardClick(item._id)}
                    style={{ position: 'absolute', top: '10px', left: '10px' }}
                  />
                </>
              )}
            </div>
            <Card.Meta title={item.carBrand} description={item.carModel} />
          </Card>
        ))}
      </div>
      
      <Modal
        title={selectedCar ? `${selectedCar.carBrand} - ${selectedCar.carModel}` : 'Car Details'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {selectedCar && (
          <div>
            <p><strong>Plate Number:</strong> {selectedCar.plateNumber}</p>
            <p><strong>Car Brand:</strong> {selectedCar.carBrand}</p>
            <p><strong>Car Model:</strong> {selectedCar.carModel}</p>
            <p><strong>Remarks:</strong> {selectedCar.remark}</p>
          </div>
        )
        }
      </Modal>

    </>


  );
}

export default HomePage;




