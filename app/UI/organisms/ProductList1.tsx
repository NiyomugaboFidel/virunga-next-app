"use client";

import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCardArrival from "../molecules/ProductCardArrival";
import ProductsArrivalLoader from "@/app/skeleton/home/ProductsArrivalLoader";

const ProductList1 = () => {
  const { data, error, isFetched, isLoading } = useFetchProducts({ id: "2f1d6e7e-b728-4f23-8e1d-c13c0f6eb4ac" });

  const products:any = data || []; // Handle the rows correctly

  return (
    <div className="w-full min-h-full h-full">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px] min-h-full h-full">
        {isLoading || error
          ? Array(8)
              .fill(null)
              .map((_, i) => <ProductsArrivalLoader key={i} isLoading={isLoading} />)
          : products?.rows?.slice(0, 8).map((item:any, index:number) => (
              <ProductCardArrival
                key={item.id} // Use `item.id` as the key
                image={
                  item.productimages?.[0]?.url || "/images/product1.png"
                } // Get the first product image or fallback
  
                price={item.price}
                ratings={item.ratings}
                name={item.name}
                title={item.title}
                // isLoading={false} // Pass `false` since it's no longer loading
                descriptions={item.description}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductList1;
