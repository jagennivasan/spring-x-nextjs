import ProductCard from "@/components/layout/product-card";

type Params = Promise<{ id: string }>;

const getproduct = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/products/${id}`);
  return response.json();
};

export default async function Product(props: { params: Params }) {
  const params = await props.params;

  const product = await getproduct(params.id);

  return <ProductCard product ={product}/>;
}
