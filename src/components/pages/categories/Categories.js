import SEO from "../../../helper/SEO";
import CategoryCard from "../../categoryCard/CategoryCard";
import { useGetCategories } from "../../../helper/hooks/asyncFunction";

export default function Categories() {
  const { categories } = useGetCategories();

  console.log("categories", categories);

  return (
    <>
      <SEO
        title="Categories"
        description="Category of Ecommerce App"
        facebookType="website"
        twitterType="summary"
      />
      <div className="container my-5">
        <div
          className="row g-4 wow fadeInDown"
          data-wow-offset="10"
          data-wow-delay="0.2s"
          data-wow-iteration="1"
        >
          {categories?.map((category, index) => (
            <div
              key={category._id}
              className="col-12 col-md-6 col-lg-4 col-xl-3"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
