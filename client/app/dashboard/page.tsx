import Image from "next/image";
import Link from "next/link";

interface ProductShape {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  releaseDate: number;
  available: boolean;
  quantity: number;
  imageFile: Buffer | null;
}

export default async function Dashboard() {
  const data = await fetch("http://localhost:8080/api/products", {
    cache: "no-store",
  });
  const products: ProductShape[] = await data.json();

  return (
    <div className="flex space-x-5">
      {products.map((item, index) => (
        <Link
          className="bg-gray-600 space-y-5   p-5 rounded-2xl shadow "
          key={item.id}
          href={`product/${item.id}`}
        >
          <h2 className="text-xl">{item.name}</h2>
          <p className="">{item.description}</p>
          <p>{item.brand}</p>
          <p>
            {new Date(item.releaseDate).toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>$ {item.price}</p>
          {item.available ? (
            <p>the product is avalible</p>
          ) : (
            <p>the product is out of stock</p>
          )}
          {item.id ? (
            <Image
              src={`http://localhost:8080/api/products/${item.id}/image`}
              alt="product image"
              width={200}
              height={200}
            />
          ) : (
            <p>Image not available</p>
          )}
        </Link>
      ))}
    </div>
  );
}
