import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/products/productApi';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useSingleBookQuery(id);
  const [postDelete, { isSuccess }] = useDeleteBookMutation();
  const handleDelete = (id: string | undefined) => {
    postDelete(id);
    toast({
      description: 'Product Delete',
    });
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto gap-10 items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.data?.title}</h1>
          <p className="text-xl">Author: {product?.data?.author}</p>
          <p className="text-xl">Genre: {product?.data?.genre}</p>
          <p className="text-xl">Date: {product?.data?.publicationDate}</p>
          <p className="text-xl">Reviews: {product?.data?.reviews}</p>

          <Button>
            <Link to={`/updateProduct/${id}`}>Edit</Link>
          </Button>
          <Button className="bg-red-500 ml-10" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
