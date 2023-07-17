import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books/',
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    deleteBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books/create-book`,
        method: 'POST',
        body: data,
      }),
    }),
    getComment: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  usePostCommentMutation,
  useCreateBookMutation,
  useDeleteBookQuery,
  useSingleBookQuery,
} = productApi;
