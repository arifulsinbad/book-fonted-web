import { HiCheck, HiOutlineTrash } from 'react-icons/hi';
import { Button } from './ui/button';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addToCart, removeFromCart } from '@/redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function Whishlist() {
  const { user } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
      <h1 className="text-center text-5xl font-bold ">WhishList</h1>
      <div className="border-t-4 border-indigo-500 m-10"></div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20 ">
        {products.map((product) => (
          <div className="" key={product.title}>
            <div className="">
              <Link to={`/product-details/${product._id}`} className="w-full">
                <img
                  src={product?.image}
                  alt=""
                  className=""
                  style={{ width: '100%' }}
                />
              </Link>
            </div>
            <div className="">
              <h1 className="text-2xl self-center">{product?.title}</h1>
              <p>Genre: {product.genre}</p>
              <p className="text-xl">Author: {product.author}</p>
              <p className="text-xl">Date: {product.publicationDate}</p>
            </div>
            <div className="">
              <div className="flex justify-between gap-10">
                {user.email && (
                  <Button
                    onClick={() => dispatch(removeFromCart(product._id))}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-400"
                  >
                    <HiOutlineTrash size="20" />
                  </Button>
                )}
                {(product.quantity as number) > 1 ? (
                  <HiCheck className=" text-4xl text-green-500"></HiCheck>
                ) : (
                  <Button onClick={() => dispatch(addToCart(product))}>
                    Finished
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
