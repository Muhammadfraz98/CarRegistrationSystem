import React, { useEffect, useState } from 'react';
import './styles.css'
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {  Table, Row, Col, Button  } from 'antd';
import CRSModal from '_components/CRSModal';

export { Home };

function Home() {

    const columns = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <a>{text}</a>,
                },
                {
                    title: 'Model',
                    dataIndex: 'model',
                    key: 'model',
                    sorter: (a, b) => a.model - b.model,
                },
                {
                    title: 'Color',
                    dataIndex: 'color',
                    key: 'color',
                },
                {
                    title: 'RegNo',
                    dataIndex: 'regNo',
                    key: 'regNo',
                    sorter: (a, b) => a.regNo - b.regNo,
                },
                {
                    title: 'Category',
                    key: 'category',
                    dataIndex: 'category',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                            <div className='action-group'>
                                    <Button type="link" 
                                        onClick={()=> onEdit("car", record)}
                                    ><EditOutlined /></Button>
                                    <Button danger style={{border: 'none'}}
                                        onClick={()=>{onDeleteCar(record)}}
                                    ><DeleteOutlined /></Button>
                                </div>
                    ),
                },
    ];

    const [cars, setCars] = useState([])
    const [categories, setCategories] = useState([])

    const [isModalOpen, setIsModalOpen] = useState({
        visible: false,
        car: false,
        category: false,
        edit: false,
    });

    const [modalValues, setmodalValues] = useState({
        name: '',
        model: '',
        color: '',
        regNo: '',
        category: ''
    })


    const onAdd =(type, data)=>{
       setmodalValues({
                name: '',
                model: '',
                color: '',
                regNo: '',
                category: ''
        })
        console.log("DATA to be added====>", data);
        if(type === "category"){
            setCategories([
                ...categories,
                {
                    key: categories.length +1,
                    name: data.new_category
                }
            ])
        }
        else{
            setCars([
                ...cars,
                {
                    key:cars.length +1 ,
                    ...data
                }
            ])
        }
    }

    const onDeleteCategory = (data) =>{
        console.log("category to be deleted==>", data);
        setCategories(current =>
            current?.filter(category => {
                return category?.key !== data?.key;
            }),
        );
    }

    const onDeleteCar =(data)=>{
        console.log('car to be deleted==>', data)
        setCars(current =>
            current?.filter(car => {
                        return car?.key !== data?.key;
                    }),
        )
    }

    const onEdit = (type, data)=>{
        console.log("Edit Data ===>", data);
        if(type === "category"){
            setIsModalOpen({
                visible: true,
                car: false,
                category: true,
                edit: true,
            })
            setmodalValues({
                key: data?.key,
                name: '',
                model: '',
                color: '',
                regNo: '',
                category: data?.name
            })
            
        }else{
            setIsModalOpen({
                visible: true,
                car: true,
                category: false,
                edit: true,
            })
            setmodalValues({
                ...data
            })
        }
    }

    useEffect(() => {
      console.log("Cars===>", cars,
        "Categories====>",categories
      );
    }, [cars, categories])
    

    return (
        <div className='crs-container'>
            <div className='crs-header'>
                <h3 className='crs-card-title'>
                    Car Registration System
                </h3> 
                <p>
                    Total: {cars?.length} Cars
                </p>
            </div>
            <Row gutter={16}>
                <Col span={8}>
                    <div className='view-all-categories'>
                        <div className='crs-add-card mb-3'
                            onClick={()=> {setIsModalOpen({
                                visible: true,
                                    car: false,
                                    category: true,
                                    edit: false,
                            })}}
                        >
                            <p className='add-text'><PlusCircleOutlined />Add Category</p>
                        </div>
                        <div className='categories-list'>
                         {categories.map((category, index)=>(
                            <div className='category mb-2' key={index}>
                                <p>{category.name}</p>
                                <div className='action-group'>
                                    <Button type="link" 
                                        onClick={()=> onEdit("category", category)}
                                    ><EditOutlined /></Button>
                                    <Button danger style={{border: 'none'}}
                                        onClick={()=> onDeleteCategory(category)}
                                    ><DeleteOutlined /></Button>
                                </div>
                            </div>
                         ))}   
                        </div>
                    </div>
                </Col>
                <Col span={16}>
                    <div className='view-all-cars'>
                        <div className='crs-add-card mb-3'
                            onClick={()=> setIsModalOpen({
                                visible: true,
                                    car: true,
                                    category: false,
                                    edit: false,
                            })}
                        >
                            <p className='add-text'><PlusCircleOutlined /> Add Car</p>
                        </div>
                        <Table columns={columns} dataSource={cars} 
                            scroll={{
                                y: 200,
                            }}
                        
                        />
                    </div>
                </Col>
            </Row>

            <CRSModal
                cars={cars}
                setCars={setCars}
                categories={categories}
                setCategories={setCategories}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modalValues={modalValues}
                setmodalValues={setmodalValues}
                onAdd={onAdd}
                onEdit={onEdit}
            />
        </div>
    );
}
