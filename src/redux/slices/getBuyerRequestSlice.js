import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

//const url = 'https://jsonplaceholder.typicode.com/posts'
const url = 'http://api.imagemarketing.net/getBuyerRequest'


const initialState = {
    //GtItems: [],
    buyerRequests: [],
    statusBR: 'idle',
    errorGt: null,
    filterOn: false
  }

  // Get all the posts from the API
//export const getGtItems = createAsyncThunk('posts/getGtItems', async (thunkAPI) => {
  export const getBuyerRequests = createAsyncThunk('buyerRequests/getBuyerRequests', async (thunkAPI) => {

    try {
      const res = await axios.get(url)
      console.log('buyerRequests:', res.data)
      return res.data
    } catch (err) {
      // console.error(err.message)
      return thunkAPI.rejectWithValue({ error: err.message })
    }
  })
  
  export const filterGtFunction = createAsyncThunk(
    "basket/filterGtFunction",
    async (data, thunkAPI) => {
      console.log('addBuyerRequest Thunk:', data)
      return data
    }
  )

  //const gtSlice = createSlice({
   const buyerRequestsSlice = createSlice({

    /* The name of the slice[this will also be used as the action type string 
      in combination with the extraReducer name i.e posts/getPosts or posts/addPost] 
    */
    //name: 'gttires',
    name: 'buyerRequests',

    // initialState: initialState[ES6 destructuring syntax]
    initialState,
    // Add reducers for the synchronous actions on the UI
    reducers: {},
    // Add extra reducers for the asynchronous actions on the UI
    extraReducers: (builder) => {
        builder
        .addCase(getBuyerRequests.pending, (state, action) => {
            // When data is being fetched
            state.statusBR = 'loading'
          })
          .addCase(getBuyerRequests.fulfilled, (state, action) => {
            // action is inferred correctly here if using TS
             // When data is fetched successfully
                state.statusBR = 'successful'
        
                // Concat the new data to the existing data in the array
                state.buyerRequests = state.buyerRequests.concat(action.payload)
                //state.GtItems = state.GtItems.push(action.payload)

          })
          .addCase(getBuyerRequests.rejected, (state, action) => {
           // When data is fetched unsuccessfully
                state.statusBR = 'failed'
        
                // Update the error message for proper error handling
                state.errorGt = action.error.message
        
                console.error('errorGt',state.errorGt)
          })
         
          // and provide a default case if no other handlers matched
          .addDefaultCase((state, action) => {})
      },
  })

  //dispatch(getPosts())
  // Export the reducer logic from the slice
export default buyerRequestsSlice.reducer
