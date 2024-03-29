import "./BrandCardLoading.css";

const BrandCardLoading = () => (
  <div className="bg-black opacity-75 w-100 h-100 text-center position-fixed top-0 align-items-center justify-content-center d-flex z-1">
    <span className="brandCardLoader"></span>
  </div>
);

export default BrandCardLoading;
