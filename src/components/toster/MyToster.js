import { Toaster } from "react-hot-toast";

const options = { position: "top-right", reverseOrder: true };

const MyToster = () => (
  <div>
    <Toaster {...options} />
  </div>
);

export default MyToster;
