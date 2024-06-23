import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addKurimiCustomerToDB } from '../../apis/apis'
import axios from 'axios'
//const url = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  SignIn: false,
  CustomerToken:null,
    email:null,
    CustomerEmail:null,
    SCustID: null,
    CustomerId: null,
    CustomerZone: null,
    permission: null,
  
    statusLogin: 'idle',
    statusReg: 'idle',
    errorReg: false,
    errorLogin: false,
    permissionError: false,
    emailError: false,
    CustomerName: null, 
    AddressCity: null, 
    AddressStreet: null,
    phoneNumber: null,
    password: null,
    auth: false,
  }

  // Get all the getLogin from the API
//export const getLogin = createAsyncThunk('login/getLogin', async (userdata,thunkAPI) => {
    export const postKurimiRegister = createAsyncThunk(
      //'kurimi/postKurimiRegister', 
      'customers/postKurimiRegister', 
      
      async (data,thunkAPI) => {
          console.log('register customer Customer Request:', data)
          /*
          const user = {
            SCustID: 'SCustID',
            customerName: data['customerName'],
            email: data['email'],
            CustomerZone: data['addressCity'],
            password: data['password'],
            addressCity: data['addressCity'],
            addressStreet: data['addressStreet'],
            phoneNumber: data['phoneNumber'],
          }
          */
        try {
          const res = await addKurimiCustomerToDB(data)
          return res
        } catch (e) {
          console.log('error addKurimiCustomerToDB:', e.message)
          return thunkAPI.rejectWithValue(e.message);
        }
  })

    // Get all the getLogin from the API
export const custlogin = createAsyncThunk(
  'login/customerlogin', 
  async (userdata,{rejectWithValue }) => {
  console.log('getLogin userdata:', userdata['mobileNumber'] + userdata['passowrd'])
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  const user = {
    mobileNumber: userdata['mobileNumber'],
    passowrd: userdata['passowrd'] 
  }
  try {
    const response = await axios
    .post("http://localhost:5000/customerlogin", 
     //await axios.post('https://api.imagemarketing.net/Customerlogin', 
      user,
      config,
      { withCredentials: true }
  )
  console.log('Authenticated Customer successfully:', response.data.auth_CustomerToken);
  console.log('response.data.data Customer :', response.data.rows);

    return response.data
  

  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }

  
})

export const CustomerLogOut = createAsyncThunk(
 // 'kurimi/CustomerLogOut', 
  'customers/CustomerLogOut', 
  async (thunkAPI) => {
      console.log('CustomerLogOut:')
    try {

      console.log('loginCustomer setLoginCustomer:')
     
      
    } catch (e) {
      console.log('error CustomerLogOut:')
      return null;
    }
})

  //const KurimiSlice = createSlice({
    const CustomerAccountSlice = createSlice({

    /* The name of the slice[this will also be used as the action type string 
      in combination with the extraReducer name i.e posts/getPosts or posts/addPost] 
    */
    //name: 'kurimi',
    name: 'customers',

    // initialState: initialState[ES6 destructuring syntax]
    initialState,
    // Add reducers for the synchronous actions on the UI
    reducers: {},
    // Add extra reducers for the asynchronous actions on the UI
    extraReducers: (builder) => {
        builder
        .addCase(postKurimiRegister.pending, (state, action) => {
            // When data is being fetched
            state.SignIn = false
            state.statusReg = '...انتظار'
          })
          .addCase(postKurimiRegister.fulfilled, (state, action) => {
            state.statusReg = 'تم تسجيل حسابك بنجاح'

          })
          .addCase(postKurimiRegister.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.status = 'خطأ في تسجيل حسابك، قد يكون رقم تلفونك او ايميلك مسجل من قبل!!'
                state.SignIn = false
                state.errorReg = true
          })
          .addCase(custlogin.pending, (state, action) => {
            // When data is being fetched
            //state.SignIn = false
            state.statusLogin = '...انتظار'
          })
          .addCase(custlogin.fulfilled, (state, action) => {
            state.SignIn = true
            state.statusLogin = 'تم تسجيل الدخول  بنجاح'
            console.log('action.payload.Email:',action.payload.rows.Email)
            state.CustomerEmail = action.payload.rows.Email
            state.phoneNumber = action.payload.rows.MobileNumber
            state.SCustID = action.payload.rows.SCustID
            state.CustomerId = action.payload.rows.CustomerId
            state.CustomerName = action.payload.rows.CustomerName
            state.AddressCity = action.payload.rows.AddressCity
            state.AddressStreet = action.payload.rows.AddressStreet
            state.CustomerToken = action.payload.auth_CustomerToken
          })
          .addCase(custlogin.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusLogin = 'خطأ في تسجيل الدخول، قد يكون رقم تلفونك او ايميلك مسجل من قبل!!'
                state.SignIn = false
                state.errorLogin = true
                state.CustomerToken = null
          })
          .addCase(CustomerLogOut.fulfilled, (state, action) => {
            state.SignIn = false    
            state.statusLogin = 'تم تسجيل الخروج  '
            state.CustomerToken = null
          })
          .addCase(CustomerLogOut.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusLogin = '   خطأ في تسجيل الخروج!! تم تسجيل الخروج لحمايتك!'
                state.SignIn = false
                state.errorLogin = true
                state.CustomerToken = null
          })
          
          // and provide a default case if no other handlers matched
          .addDefaultCase((state, action) => {})
      },
  })

  //dispatch(getPosts())
  // Export the reducer logic from the slice
export default CustomerAccountSlice.reducer
//export default KurimiSlice.reducer

