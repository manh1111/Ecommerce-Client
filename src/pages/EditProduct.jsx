// components
import { useParams } from "react-router-dom";
import PageHeader from "@layout/PageHeader";
import ProductEditor from "@widgets/ProductEditor";

const EditProduct = () => {
  const { id } = useParams();
  const title = id ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm";

  return (
    <>
      <PageHeader title={title} />
      <ProductEditor />
    </>
  );
};

export default EditProduct;
