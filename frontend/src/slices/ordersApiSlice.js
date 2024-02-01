import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
// import { addAuthHeaders } from '../utils/authUtils';

let authUser;
const addAuthHeaders = () =>
{
  if (localStorage.getItem('userInfo')) {
    const user = localStorage.getItem('userInfo');
    return user
  }

};

if (addAuthHeaders()) {
  authUser = JSON.parse(addAuthHeaders())
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        headers: {
          // Include your authorization token here
          Authorization: `Bearer ${authUser ? authUser?.token : ""}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${addAuthHeaders()}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
