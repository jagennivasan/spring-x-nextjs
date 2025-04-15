import Image from "next/image";

interface ProductShape {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  releaseData: number;
  available: boolean;
  quantity: number;
}

export default function ProductCard({ product }: { product: ProductShape }) {
  return (
    <div className="flex flex-col w-fit p-5 ">
      <div className="bg-gray-600 space-y-5   p-5 rounded-2xl shadow ">
        {product.id ? (
          <Image
            src={`http://localhost:8080/api/products/${product.id}/image`}
            alt="product image"
            width={200}
            height={200}
          />
        ) : (
          <p>Image not available</p>
        )}
        <h2 className="text-xl">{product.name}</h2>
        <p className="">{product.description}</p>
        <p>{product.brand}</p>
        <p>$ {product.price}</p>
      </div>
    </div>
  );
}
