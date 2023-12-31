import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.png';
import hero from '@/assets/images/hero.jpg';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/types/globalTypes';
import { useGetProductsQuery } from '@/redux/features/products/productApi';

export default function Home() {
  const { data } = useGetProductsQuery(undefined);
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            Book <br /> MARKET PLACE
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Importance of Books in Our Life
          </p>
          <div className="text-primary mt-20">
            <p>A better understanding of yourself </p>
            <p>Emotionally strong and expressive </p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" />
        </div>
      </div>
      <div>
        <h1 className="text-center text-4xl font-bold"> #TOP BOOK </h1>
        <div className="border-t-4 border-indigo-500 m-10">
          <div className="col-span-9 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20 mt-10">
            {data?.data?.data?.map((product: IProduct) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The future of new books is here
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/products">Brows all products</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
