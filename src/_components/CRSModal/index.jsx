import React, { useEffect } from 'react'
import { Button, Row, Col, Form, Input, Modal,Select } from 'antd';

const CRSModal = ({isModalOpen, setIsModalOpen, onAdd, categories, cars, modalValues, setmodalValues, setCategories,setCars}) => {
    
    useEffect(() => {
      console.log("Modal values", isModalOpen, modalValues);
    }, [isModalOpen, modalValues])

    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        console.log('Success:', values);
        form.resetFields();
        if(isModalOpen?.category && !isModalOpen?.edit){
            onAdd('category', values)
        }else if(isModalOpen?.car && !isModalOpen?.edit){
            onAdd('car', values)
        }else if(isModalOpen?.category && isModalOpen?.edit){
            const newState = categories?.map(obj => {
                if (obj.key === modalValues.key) {
                    return {
                        ...obj,
                        name: values.new_category
                    };
                }
                return obj;
             })
            console.log("EDited categ", newState)
            setCategories(newState)
            setIsModalOpen({
                visible: false,
                car: false,
                category: false,
                edit: false
            })
        }else{
            const newState = cars?.map(obj => {
                if (obj.key === modalValues.key) {
                    return {
                        ...obj,
                        name: values.name,
                        model: values.model,
                        category: values.category,
                        color: values.color,
                        regNo: values.regNo
                    };
                }
                return obj;
            })
            console.log('edited car value==>', newState)
            setCars(newState)
            setIsModalOpen({
                visible: false,
                car: false,
                category: false,
                edit: false
            })
        }
    };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

  return (
    <Modal
        title={(
            <div className='modal-title'>
                {(isModalOpen?.car && isModalOpen?.edit) && <p>Edit Car</p>}  
                 {(isModalOpen?.car && !isModalOpen?.edit) && <p>Add Car</p>}  
                  {(isModalOpen?.category && isModalOpen?.edit) && <p>Edit Category</p>}  
                   {(isModalOpen?.category && isModalOpen?.edit === false) && <p>Add Category</p>}  
            </div>
            )
        }
        open={isModalOpen?.visible}
        onCancel={()=> {
            setIsModalOpen({
                visible: false,
                car: false,
                category: false
            })
            // setModalValues null
             setmodalValues({
                name: '',
                model: '',
                color: '',
                regNo: '',
                category: ''
        })
        }}
        footer={null}
    >

        <div className='mt-4'>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                fields={[
                    {
                    name: ["new_category"],
                    value: modalValues?.category,
                    },
                    {
                    name: ["name"],
                    value: modalValues?.name,
                    },
                    {
                    name: ["model"],
                    value: modalValues?.model,
                    },
                    {
                    name: ["color"],
                    value: modalValues?.color,
                    },
                    {
                    name: ["regNo"],
                    value: modalValues?.regNo,
                    },
                     {
                    name: ["category"],
                    value: modalValues?.category,
                    },
                ]}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
             {
                (isModalOpen?.car)
                ?
                <>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input name of car !',
                                },
                                ]}
                            >
                                <Input 
                                    value={modalValues?.name}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Model"
                                name="model"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input model of car',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                     <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input color of car !',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Reg No"
                                name="regNo"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please select category of car',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row  gutter={16}>
                        <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Please select category of car',
                                    },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a category"
                                        optionFilterProp="children"
                                        allowClear
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={categories?.map((category) => ({
                                                label: category.name,
                                                value:  category.name,
                                                }))}
                                     />
                        </Form.Item>
                    </Row>
                 
                 
                </>
                :
                    <Form.Item
                            label="Category Name"
                            name="new_category"
                            rules={[
                            {
                                required: true,
                                message: 'Please input category',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
             }
                


                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{width: '150px'}}>
                         {(isModalOpen?.edit)
                        ? "Edit " : "Add "
                         } 
                    </Button>
                </Form.Item>
            </Form>

        </div>

    </Modal>
  )
}

export default CRSModal