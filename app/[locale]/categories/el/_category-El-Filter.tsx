import { useState } from "react";
import { Search } from "lucide-react";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCard1Skeleton from "@/app/skeleton/home/ProductCard1Skeleton";
import ProductCard from "@/app/UI/molecules/ProductCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdClose } from "react-icons/md";
import IndexPage from "./_category-El-Sidebar";
import SiderbarFilter from "./_category-El-Sidebar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
  sale?: boolean;
}

interface FilterOption {
  name: string;
  count: number;
}

function CategoryElFilter() {
  const [priceRange, setPriceRange] = useState([340, 1250]);

  const categories: FilterOption[] = [
    { name: "Smartphones", count: 218 },
    { name: "Accessories", count: 377 },
    { name: "Tablets", count: 110 },
    { name: "Wearable Electronics", count: 142 },
    { name: "Computers & Laptops", count: 156 },
    { name: "Cameras, Photo & Video", count: 78 },
    { name: "Headphones", count: 121 },
    { name: "Video Games", count: 89 },
  ];

  const brands: FilterOption[] = [
    { name: "Apple", count: 12 },
    { name: "Asus", count: 47 },
    { name: "Cobra", count: 52 },
    { name: "Dell", count: 48 },
    { name: "Lenovo", count: 112 },
    { name: "ZE Gaming", count: 13 },
    { name: "AdRock", count: 35 },
  ];
  const { data, error, isFetched, isLoading } = useFetchProducts({ id: "2f1d6e7e-b728-4f23-8e1d-c13c0f6eb4ac" });

  const products: any = data;
  return (
    <div className="py-[30px] flex flex-col items-center justify-center w-full h-full gap-5">
      {/* search */}
      <div className="w-full h-full ">
        <div className="px-3 w-full flex items-center justify-center gap-2 border  border-gray-200 dark:border-Gary-700 rounded-full">
          <span>
            <Search />
          </span>
          <input
            type="text"
            placeholder="Search Products ..."
            className=" border-none outline-none w-full p-2 bg-transparent"
          />
        </div>
      </div>
      {/* sorts */}
      <div className="w-full flex flex-row  justify-between items-start lg:items-center ">
        <div className="hidden lg:flex w-full items-center justify-start gap-2 ">
         <div>
         <p className="  text-bodySmall px-2 pb-2">
            {" "}
            Found <span className="font-semibold"> 789 </span> Items
          </p>
         </div>
          <div className="h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 items-center justify-center">
           {Array(5).fill(null).map((_,i)=>(
             <button className="bg-Gary-100 dark:bg-Gary-700 text-bodySmall rounded-[6px] p-1 px-3 flex gap-1 items-center justify-center" key={i}><MdClose/> Sale</button>
           ))}
           <button className=" underline text-bodySmall">Clear all</button>
          </div>
        </div>
        <div className="w-full items-center justify-end flex  px-2  gap-2">
          <span className="w-full text-bodySmall font-semibold text-start lg:text-end">
            Sort by:
          </span>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Most Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mostpopular">Most Popular</SelectItem>
                <SelectItem value="newarrivals">New Arrivals </SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <div className="w-[290px]  hidden lg:block ">
          <SiderbarFilter />
      
        </div>
        

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px] py-[24px]">
            {isLoading || !products
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <ProductCard1Skeleton key={i} />)
              : products?.rows?.map((item: any, index: number) => (
                  <ProductCard
                  key={item.id}
                  index={index}
                  image={
                    item?.productimages && item.productimages?.length > 0
                      ? item.productimages?.[0]?.url
                      : ""
                  }
                  id={item.id}
                  ratings={item.ratings}
                  price={item.price}
                  descriptions={item.description}
                  name={item.name}
                  alt={item.productimages?.[0]?.alt_text}
                  bonus={item.bonus}
                  title={item.title}
                  isLoading={isLoading}
                  createdAt={item.createdAt}
                  />
                ))}
          </div>
  <hr className="w-full border border-textColor-dark dark:border-Gary-700 " />
          {/* Pagination */}
       <div className="flex w-full  items-center justify-center p-5  ">
         <button className="p-2 flex items-center justify-start hover:bg-Gary-100 dark:hover:bg-Gary-700 rounded-full "><FaAngleLeft /></button>
         <div className="w-full h-full flex justify-center items-center gap-2 ">
            {[1, 2, 3, 4, "...", 16].map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  page === 1 ? "dark:bg-Gary-700 bg-gray-200 " : "dark:bg-Gary-800 bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className=" flex items-center justify-end p-2 hover:bg-Gary-100 dark:hover:bg-Gary-700 rounded-full"><FaAngleRight /></button>
       </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryElFilter;
