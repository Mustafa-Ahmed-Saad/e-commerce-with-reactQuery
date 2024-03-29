import Card from "react-bootstrap/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetBrand } from "../../helper/hooks/asyncFunction";
import { useEffect, useState } from "react";

export default function BrandCard({ brandDetails, handleBrand, handleOpen }) {
  const [enableGetBrand, setEnableGetBrand] = useState(false);
  const { brand, isLoading, error } = useGetBrand(
    brandDetails._id,
    enableGetBrand
  );

  const getBrandHandle = () => {
    // make enabled true when click on brand
    setEnableGetBrand(true);
    handleOpen(true);
  };

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

        <Card.Body>
          <Card.Title className="text-center">{brandDetails.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
