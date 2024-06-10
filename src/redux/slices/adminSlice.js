import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import bcrypt from 'bcryptjs'

//const url = 'https://jsonplaceholder.typicode.com/posts'
// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  userInfo: null,
  userToken,
  success: false,
    email:null,
    //CustomerEmail:null,
    AdminEmail:null,
    permissionAdmin: null,
    SignInAdmin: false,
    statusAdminLogin: 'idle',
    statusAdminReg: 'idle',
    errorAdminReg: false,
    errorAdminLogin: false,
    permissionAdminError: false,
    emailAdminError: false,
  }

  // Get all the getLogin from the API
//export const getLogin = createAsyncThunk('login/getLogin', async (userdata,thunkAPI) => {
    //export const postKurimiRegister = createAsyncThunk(

    export const registerUser = createAsyncThunk(
      'auth/registerUser',
      async ({ name, email, passowrd }, { rejectWithValue }) => {
        const hashedPassword = bcrypt.hashSync(passowrd, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up

        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
          const user = {
            name: name,
            email: email,
            passowrd: hashedPassword,
        }
        console.log('registeruser data', user.email + ' ' + user.passowrd + ' '+ user.name)
        console.log('hashedPassword:', hashedPassword)
          await axios.post(
            'http://localhost:5000/users',
            user,
            config
          )
        } catch (error) {
        // return custom error message from backend if present
          if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
          } else {
            return rejectWithValue(error.message)
          }
        }
      }
    )

    // Get all the getLogin from the API
export const adminlogin = createAsyncThunk(
  'auth/adminlogin', 
  async (userdata,{rejectWithValue }) => {
  console.log('getLogin userdata:', userdata['email'] + userdata['passowrd'])
  const user = {
    email: userdata['email'],
    passowrd: userdata['passowrd'] 
  }
  // الاوصل الصالح مع try
 try { 
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post('http://localhost:5000/adminlogin', 
     //await axios.post('https://api.imagemarketing.net/Customerlogin', 
      user,
      config
  )

  // Store the authentication token for subsequent requests
  const token = res.data;
    // store user's token in local storage
    localStorage.setItem('userToken', res.data)
    console.log("Sign in successful", res.data);
  //console.log(" res client token", token);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 return res.data
 //return res

} catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  
})

export const AdminLogOut = createAsyncThunk(
 // 'kurimi/CustomerLogOut', 
  'auth/AdminLogOut', 
  async (thunkAPI) => {
      console.log('AdminLogOut:')
    try {

      console.log('AdminLogOut :')
     
      
    } catch (e) {
      console.log('error AdminLogOut:')
      return null;
    }
})

  //const KurimiSlice = createSlice({
    const AdminAccountSlice = createSlice({

    /* The name of the slice[this will also be used as the action type string 
      in combination with the extraReducer name i.e posts/getPosts or posts/addPost] 
    */
    //name: 'kurimi',
    name: 'auth',

    // initialState: initialState[ES6 destructuring syntax]
    initialState,
    // Add reducers for the synchronous actions on the UI
    reducers: {},
    // Add extra reducers for the asynchronous actions on the UI
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state, action) => {
          state.loading = true
          state.error = null
          state.statusAdminLogin = '...انتظار'
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false
          state.success = true // registration successful
          state.statusAdminLogin = 'تم التسجيل بنجاح'
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
          // When data is fetched unsuccessfully
               state.statusAdminLogin = 'خطأ في تسجيل حسابك! قد يكون رقم تلفونك او ايميلك مسجل من قبل!!'
               state.loading = false
               state.error = payload
         })
          .addCase(adminlogin.pending, (state, action) => {
            // When data is being fetched
            //state.SignIn = false
            state.statusAdminLogin = '...انتظار'
          })
          //.addCase(adminlogin.fulfilled, (state, action) => {
            .addCase(adminlogin.fulfilled, (state, action) => {

            state.SignInAdmin = true
            state.statusAdminLogin = 'تم تسجيل الدخول  بنجاح'
            console.log('action.payload.token:',action.payload)
           // state.userToken = action.payload
            state.userInfo = action.payload
            state.userToken = action.payload
            //localStorage.setItem("customerlogin", 'true');
            //setAuth(true);
             //navigate("/HomePage", { replace: true });

          })
          .addCase(adminlogin.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusAdminLogin = 'خطأ في تسجيل الدخول، قد يكون رقم تلفونك او ايميلك مسجل من قبل!!'
                state.SignInAdmin = false
                state.errorAdminLogin = true
                state.userToken = null
                //localStorage.setItem("persist:root", 'false');
                //setAuth(true);
                 //navigate("/customerlogin");
          })
          
          // and provide a default case if no other handlers matched
          .addDefaultCase((state, action) => {})
      },
  })

  //dispatch(getPosts())
  // Export the reducer logic from the slice
export default AdminAccountSlice.reducer
//export default KurimiSlice.reducer

