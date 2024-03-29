import Card from "react-bootstrap/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetBrand } from "../../helper/hooks/asyncFunction";
import { useEffect } from "react";
// import { useGetBrand } from "../../helper/hooks/asyncFunction";

export default function BrandCard({ brandDetails, handleBrand, handleOpen }) {
  const { brand, isLoading, error, refetch } = useGetBrand(brandDetails._id);

  async function getBrandHandle() {
    // refetch and make enabled true when click on brand
    await refetch();
    handleOpen(true);
  }

  useEffect(() => {
    if (!isLoading && !error) {
      handleBrand(brand);
    }
  }, [brand]);

  return (
    <div onClick={getBrandHandle}>
      <Card className="mainShadow">
        <LazyLoadImage
          effect="blur"
          className="w-100 object-fit-cover object-position-center rounded-top-2"
          variant="top"
          src={brandDetails.image}
          alt="brand-img"
        />
        {/* <Card.Img variant="top" src={brandDetails.image} /> */}

        <Card.Body>
          <Card.Title className="text-center">{brandDetails.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
