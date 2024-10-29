import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = '733c53061dac45f695b83396d555d2dc'; 
const baseUrl = 'https://newsapi.org/v2';

const createRequest = (url) => ({ url, headers: { 'X-Api-Key': apiKey } });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(`/everything?q=${newsCategory}&pageSize=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
