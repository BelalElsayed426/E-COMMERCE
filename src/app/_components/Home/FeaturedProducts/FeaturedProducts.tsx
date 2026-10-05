import { Product } from "@/interfaces/products.interface";
import { getAllProducts } from "@/services/products.service";
import ProductCard from "../../ProductCard/ProductCard";

export default async function FeaturedProducts() {
  const products: Product[] = await getAllProducts();
  return (
    <section className="py-10">
      <div className="container mx-auto px-8">
        <div className="my-8 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-700" />
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
