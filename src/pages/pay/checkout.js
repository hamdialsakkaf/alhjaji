import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams  } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import Form from 'react-bootstrap/Form';

//import { Customerlogin } from '../redux/slices/CustomersSlice';

function getREFNO() {
    // Get the timestamp and convert 
    // it into alphanumeric input
    return Date.now().toString(36);
}

// New REFNO 
let day = getREFNO();

//function Checkout() {
  const Checkout = () => {

   // const persistStorage = localStorage.getItem("persist:root");
    //console.log('persistStorage:', persistStorage.SignIn)
    // const { tiresize, price } = state;

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const getCustomerInfo = useSelector((state) => state.CustomerAccount)
    const { SignIn, statusLogin, errorLogin,CustomerEmail,phoneNumber,CustomerName,AddressStreet,AddressCity } = getCustomerInfo
    //const { SignIn, statusLogin, errorLogin } = getSignIn
    const params = useParams();

    console.log('getSignIn SignIn:',SignIn)
    console.log('Customer Email :',CustomerEmail)

    useEffect(()=>{
      
        if(!SignIn) {
          navigate("/customerlogin")
        } 
    },[SignIn])

/*
    const addOrder = async (e) => {

        e.preventDefault();
        const customer = {
            mobileNumber: mobileNumber,
            passowrd: hashedPassword
             }
      
            try {
                dispatch(Customerlogin(customer))

            } catch (error) {

                setMsg('حصل خطأ اثناء تسجيل الدخول ')
            }
        
    }
*/

   
    return (
        <div className="MainPage">
        <div className='PostContainer'>
        <Form.Text muted className="text-center">
      <h4>
        فاتورة الشراء
      </h4>
      <h4>تفاصيل طلبك في الجدول ادناه
       </h4>
      </Form.Text>
      <Form.Text muted className="text-center">
      <h4>
      اسم العميل: {CustomerName}   
        </h4>
        <h4>
      رقم التلفون : {phoneNumber}   
        </h4>
      <h4>الأيميل:  {CustomerEmail}  
       </h4>
      </Form.Text>
      <Form.Text muted className="text-center">
      <h4>
        المدينة : {AddressCity}   
   </h4>
   <h4>
    العنوان  : {AddressStreet}   
   </h4>
      </Form.Text>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>المنتج</th>
          <th>سعر الوحدة</th>
          <th>الكمية</th>
          <th>اجمالي الفاتورة</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{JSON.stringify(params)}</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>uoio</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
     </div>
        </div>
    )
 }
 
export default Checkout