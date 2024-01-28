import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../Utilities/ProductCard";

const categories = ["vase", "ceramic", "candle", "diffuser"];

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products/all");
        setAllProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleCategoryChange = (category) => {
    // Toggle the category in the selectedCategories array
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const filteredProducts = allProducts.filter((product) => {
    // If no categories are selected, show all products
    if (selectedCategories.length === 0) {
      return true;
    }
    // Otherwise, filter products based on selected categories
    return selectedCategories.includes(product.product_type);
  });

  return (
    <div className="container-fluid all-products mt-5">
      <div className="row">
        <div className="col-xl-2 col-sm-12 category-filter d-flex flex-column mb-5">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header category-filter__header">
                <button
                  className="accordion-button collapsed category-filter__btn p-md-4"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Filter by Product Type
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body d-flex flex-xl-column category-filter__body">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="category-filter__label me-5"
                    >
                      <input
                        className="category-filter__input"
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-10 col-sm-12 all-products__body">
          <div className="row">
            {filteredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
