import axios from "axios";

 
export async function addRequestToDB (buyerReq)  {
  try {
    await axios.post('http://localhost:5000/addrequest',
      buyerReq 
    ).then((response)=> {
    console.log(response.data);
    //setMsg('تم اضافة الإطار بنجاح ')
    console.log('Sucsess add product')
      //emptyFilds()
    })
    .catch( (error) => {
    console.log('addRequestToDB error', error)
    // setMsg('حصلت مشكلة في الادخال')
    })
    } catch (error) {
      console.log('addRequestToDB error:', error)
    }

 }

   // Kurimi api's
   export async function addKurimiCustomerToDB (user)  {
      console.log('customer data:', user)
    
      await axios.post('http://localhost:5000/kurimiusersReg',
      user
    )
    //.catch((err) => {
    //  console.log('addKurimiCustomerToDB error', err)
    //  return err
  //  })
  
   }

 
