import axios from "axios";

export async function updateInprogressReq (reqDetaile)  {
    await axios.post('http://api.imagemarketing.net/Inprogress',
    reqDetaile 
  )
  .then((response)=> {
  console.log(response.data);
  //setMsg('تم اضافة الإطار بنجاح ')
  console.log('Sucsess update inprogress request')
    //emptyFilds()
  })
  .catch( (error) => {
  console.log('update inprogress request error', error)
   // setMsg('حصلت مشكلة في الادخال')
  }  
  )
   }