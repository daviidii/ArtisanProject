import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Utilities/ProductCard";

export default function ProductsCollection() {
  const { collection } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductCollection = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/products/" + collection
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductCollection();
  }, [collection]);

  return (
    <section className="prod-collection containfer-fluid">
      <div className="row prod-collection__body">
        {products.map((item) => (
          <ProductCard key={item.product_id} product={item} />
        ))}
      </div>
    </section>
  );
}
