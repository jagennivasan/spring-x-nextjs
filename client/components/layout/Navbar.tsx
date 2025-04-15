import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 bg-gray-800 text-white">
      <Link href={"/"}>Logo Ecom</Link>
      <div className="flex space-x-5">
        <Link href={"/add-product"}>Add product</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </nav>
  );
}
