import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USERS_URL } from '../constants';
import { BASE_URL } from '../constants';
import axios from "axios";
let initialState = {
  users: [],
  res: {},
  isLoggedIn: false,
}


export const registerUser = createAsyncThunk("user/registerUser", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}`, data)
    return response.data;
  }
  catch (err) {
    console.log(err)
  }
})

export const loginUser = createAsyncThunk("user/login", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}/auth`, data)
    return response.data;
  } catch (err) {
    console.log(err)
  }
})

export const logoutUser = createAsyncThunk("user/logout", async (data) =>
{
  try {
    const response = await axios.post(`${BASE_URL}${USERS_URL}/logout`, data)
    return response.data;
  } catch (err) {
    console.log(err)
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {


  },
  extraReducers: (builder) => [
    builder.addCase(registerUser.fulfilled, (state, action) =>
    {
      state.users.push(action.payload)
      state.isLoggedIn = true;
    }).addCase(loginUser.fulfilled, (state, action) =>
    {
      // Update the state if needed
      state.res = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", state.isLoggedIn)

    }).addCase(logoutUser.fulfilled, (state, action) =>
    {
      // Update the state if needed
      state.res = action.payload;
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoggedIn");

    })
  ]

})

export default userSlice.reducer


// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/auth`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: 'POST',
//       }),
//     }),
//     profile: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/profile`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     getUsers: builder.query({
//       query: () => ({
//         url: USERS_URL,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       providesTags: ['User'],
//       keepUnusedDataFor: 5,
//     }),
//     deleteUser: builder.mutation({
//       query: (userId) => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     getUserDetails: builder.query({
//       query: (id) => ({
//         url: `${USERS_URL}/${id}`,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       keepUnusedDataFor: 5,
//     }),
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/${data.userId}`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useProfileMutation,
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//   useGetUserDetailsQuery,
// } = userApiSlice;
