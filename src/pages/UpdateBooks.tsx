import { toast } from '@/components/ui/use-toast';
import { useUpdateBooksMutation } from '@/redux/features/products/productApi';
import { useAppSelector } from '@/redux/hook';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
interface IBook {
  image: string;
  email: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
// import { productUpdate, toggleUpdate } from "../features/products/productsSlice";

const UpdateBooks = () => {
  const { register, handleSubmit } = useForm<IBook>();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [updatePost, { isSuccess }] = useUpdateBooksMutation();
  const { id } = useParams();
  console.log(isSuccess);
  const submit = (data: IBook): void => {
    const books = {
      id: id,
      data: {
        title: data.title,
        image: data.image,

        author: data.author,
        genre: data.genre,
        email: user.email,
        publicationDate: data.publicationDate,
      },
    };
    updatePost(books);
    toast({
      description: 'Product Update',
    });
    console.log(books);
  };

  return (
    <div className="flex justify-center  items-center h-full ">
      <form
        className=" shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-indigo-500"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col  w-full max-w-xs">
          <label className="mb-2" htmlFor="model">
            Title
          </label>
          <input type="text" id="title" {...register('title')} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="image">
            Image
          </label>
          <input type="text" id="image" {...register('image')} />
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="price">
            Author
          </label>
          <input type="text" id="author" {...register('author')} />
        </div>

        <div className="flex flex-col w-full max-w-xs"></div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="keyFeature1">
            Genre
          </label>
          <input type="text" id="genre" {...register('genre')} />
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2" htmlFor="keyFeature2">
            Date
          </label>
          <input
            type="text"
            id="publicationDate"
            {...register('publicationDate')}
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <button
            className=" px-4 py-3 bg-white rounded-md font-semibold text-indigo-500 text-lg disabled:bg-gray-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBooks;
