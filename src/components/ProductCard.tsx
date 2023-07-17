import { IProduct } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { addEmailCart, addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IProduct;
}

export default function ProductCard({ product }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  console.log(product);
  const handleAddProduct = (product: IProduct, user: any) => {
    dispatch(addToCart(product));
    dispatch(addEmailCart(user));
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-2 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${product._id}`} className="w-full">
          <img src={product?.image} alt="product" />
          <h1 className="text-xl font-semibold">{product?.title}</h1>
        </Link>
        <p>Author: {product?.author}</p>
        <p className="text-sm">Genre: {product?.genre}</p>
        <p className="text-sm">Date: {product?.publicationDate}</p>
        <div className="flex justify-between gap-10">
          <Button
            variant="default"
            onClick={() => handleAddProduct(product, user)}
          >
            Add to cart
          </Button>
          <Button>
            <Link to="/checkout">Wishlist</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
