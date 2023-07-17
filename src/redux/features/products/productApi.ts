import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/books/',
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({ url: `/books/${id}`, method: 'DELETE' }),
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBooks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
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
  useDeleteBookMutation,
  useSingleBookQuery,
  useUpdateBooksMutation,
} = productApi;
