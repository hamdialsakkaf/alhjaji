import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import bcrypt from 'bcryptjs'

//const url = 'https://jsonplaceholder.typicode.com/posts'
// initialize userToken from local storage
/*
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
*/
const initialState = {
  userInfo: null,
  userToken: null,
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
export const adminlogins = createAsyncThunk(
  'auth/adminlogins', 
  async (userdata,{rejectWithValue }) => {
  console.log('getLogin userdata:', userdata['email'] + userdata['passowrd'])
  const user = {
    email: userdata['email'],
    passowrd: userdata['passowrd'] 
  }
  // الاوصل الصالح مع try
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await axios
      .post("http://localhost:5000/adminlogins", 
       //await axios.post('https://api.imagemarketing.net/Customerlogin', 
        user,
        config,
        { withCredentials: true }
    )
    console.log('Authenticated successfully:', response.data);
      return response.data
    

    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
     /*
       axios
       .post("http://localhost:5000/adminlogins", 
        //await axios.post('https://api.imagemarketing.net/Customerlogin', 
         user,
         config,
         { withCredentials: true }
     ).then(response => {
       console.log('Authenticated successfully:', response.data);
       return response.data
     }).catch(err => {
      console.log('adminlogins err:', err)
     })
    */
    })
  
    
     //Access the Set-Cookie header from the response
    //const setCookieHeader = response.headers['auth_token'];
    
   // const setCookieHeader = instance.headers['set-cookie'];

    // You can now store the cookie or use it for subsequent requests
    //console.log('Cookie received:', setCookieHeader);
// السابق الصالح
 /*
    const res = await axios.post('http://localhost:5000/adminlogin', 
     //await axios.post('https://api.imagemarketing.net/Customerlogin', 
      user,
      config
  ).then(response => {
    console.log('Authenticated successfully:', response.data);
  })
*/
  // Store the authentication token for subsequent requests
 // const token = res.data;
    // store user's token in local storage
   // localStorage.setItem('userToken', res.data)
   // console.log("Sign in successful", res.data);
  //console.log(" res client token", token);

  //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 //return res.data
 //return res


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
          .addCase(adminlogins.pending, (state, action) => {
            // When data is being fetched
            //state.SignIn = false
            state.statusAdminLogin = '...انتظار'
          })
          //.addCase(adminlogin.fulfilled, (state, action) => {
            .addCase(adminlogins.fulfilled, (state, { payload } ) => {
            state.SignInAdmin = true
            state.statusAdminLogin = 'تم تسجيل الدخول  بنجاح'
            console.log('action.payload.token:', payload.auth_token)
           // state.userToken = action.payload
            state.userInfo = payload.auth_token
            state.userToken = payload.auth_token
          })
          .addCase(adminlogins.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusAdminLogin = 'خطأ في تسجيل الدخول، قد يكون رقم تلفونك او ايميلك مسجل من قبل!!'
                state.SignInAdmin = false
                state.errorAdminLogin = true
                state.userToken = null
          })

          .addCase(AdminLogOut.pending, (state, action) => {
            // When data is being fetched
            //state.SignIn = false
            state.statusAdminLogin = '...انتظار'
          })
          //.addCase(adminlogin.fulfilled, (state, action) => {
            .addCase(AdminLogOut.fulfilled, (state, { payload } ) => {
            state.SignInAdmin = false
            state.statusAdminLogin = 'تم تسجيل الخروج  بنجاح'
            state.userToken = null
            state.userInfo = null
        
          })
          .addCase(AdminLogOut.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusAdminLogin = ' تم تسجيل الخروج'
                state.SignInAdmin = false
                state.errorAdminLogin = true
                state.userToken = null
          })
          // and provide a default case if no other handlers matched
          .addDefaultCase((state, action) => {})
      },
  })

  //dispatch(getPosts())
  // Export the reducer logic from the slice
export default AdminAccountSlice.reducer
//export default KurimiSlice.reducer

