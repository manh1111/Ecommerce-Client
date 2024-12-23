// components
import { useParams } from "react-router-dom";
import PageHeader from "@layout/PageHeader";
import ProductEditor from "@widgets/ProductEditor";

const EditProduct = () => {
  const { id } = useParams();
  return (
    <>
      <ProductEditor />
    </>
  );
};

export default EditProduct;
