// import { PRODUCTS_URL } from '../constants';
// import { apiSlice } from './apiSlice';
// // import { addAuthHeaders } from '../utils/authUtils';

// import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// let authUser;
// const addAuthHeaders = () =>
// {
//   if (localStorage.getItem('userInfo')) {
//     const user = localStorage.getItem('userInfo');
//     return user
//   }

// };

// if (addAuthHeaders()) {
//   authUser = JSON.parse(addAuthHeaders())
// }


// export const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber }) => ({
//         url: PRODUCTS_URL,
//         params: { keyword, pageNumber },

//       }),
//       keepUnusedDataFor: 5,
//       providesTags: ['Products'],
//     }),
//     getProductDetails: builder.query({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,

//       }),
//       keepUnusedDataFor: 5,
//     }),
//     createProduct: builder.mutation({
//       query: (newProductData) => ({

//         url: `${PRODUCTS_URL}`,
//         method: 'POST',
//         body: newProductData,
//         headers: {
//           // Include your authorization token here
//           Authorization: `Bearer ${authUser ? authUser?.token : ""}`,
//         },

//       }),
//       invalidatesTags: ['Product'],
//     }),
//     updateProduct: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}`,
//         method: 'PUT',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['Products'],
//     }),
//     uploadProductImage: builder.mutation({
//       query: (data) => ({
//         url: `/api/upload`,
//         method: 'POST',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//     }),
//     deleteProduct: builder.mutation({
//       query: (productId) => ({
//         url: `${PRODUCTS_URL}/${productId}`,
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       providesTags: ['Product'],
//     }),
//     createReview: builder.mutation({
//       query: (data) => ({
//         url: `${PRODUCTS_URL}/${data.productId}/reviews`,
//         method: 'POST',
//         body: data,
//         headers: {
//           Authorization: `Bearer ${addAuthHeaders()}`,
//         },
//       }),
//       invalidatesTags: ['Product'],
//     }),
//     getTopProducts: builder.query({
//       query: () => `${PRODUCTS_URL}/top`,
//       keepUnusedDataFor: 5,
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductDetailsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
//   useDeleteProductMutation,
//   useCreateReviewMutation,
//   useGetTopProductsQuery,
// } = productsApiSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, PRODUCTS_URL } from "../constants";
import axios from "axios";

let initialState = {
  products: [],
}

export const fetchProducts = createAsyncThunk("products/fetch", async (data) =>
{
  try {
    const response = await axios.get(`${BASE_URL}${PRODUCTS_URL}`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => [
    builder.addCase(fetchProducts.fulfilled, (state, action) =>
    {
      state.products = action.payload
    })
  ]
})


export default productSlice.reducer