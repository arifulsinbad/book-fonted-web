import ProductCard from '@/components/ProductCard';

import { Slider } from '@/components/ui/slider';

import {
  useGetFilterProductsQuery,
  useGetProductsQuery,
  useGetSearchProductsQuery,
} from '@/redux/features/products/productApi';
import { setPriceRange } from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data } = useGetProductsQuery(undefined);
  console.log(data?.data?.data);

  const { yearsRange, status, searchTerm } = useAppSelector(
    (state) => state.product
  );
  const { data: product } = useGetSearchProductsQuery(searchTerm);
  const { data: filter } = useGetFilterProductsQuery(yearsRange);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  let productsData;
  if (status) {
    productsData = product?.data?.data;
  } else if (yearsRange > 1900) {
    productsData = filter?.data?.data;
  } else {
    productsData = data?.data?.data;
  }
  console.log(productsData);

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Year Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[1900]}
              max={2023}
              min={1900}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 1900 Year To {yearsRange} Year</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
