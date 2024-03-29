import ProductCard from "../productCard/ProductCard";

const ShowProducts = ({ products }) => (
  <div className="container">
    <div className="row gx-2 gy-4">
      {products?.length > 0 ? (
        products.map((product, index) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <ProductCard product={product} index={index} />
          </div>
        ))
      ) : (
        <div className="container text-center fw-bold">no product to show</div>
      )}
    </div>
  </div>
);

export default ShowProducts;
