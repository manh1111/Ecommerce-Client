import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { toast } from "react-toastify";
import {
  deleteProducts,
  publishProducts,
  deletePermanentlyProducts,
  countProducts,
} from "@api/product";
import getProducts, { fetchProducts } from "@db/products_management"; 
import ProductManagementCollapseItem from "@components/ProductManagementCollapseItem";
import FilterItem from "@ui/FilterItem";
import Pagination from "@ui/Pagination";
import Empty from "@components/Empty";
import StyledTable from "./styles";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { PRODUCT_MANAGEMENT_OPTIONS } from "@constants/options";
import usePagination from "@hooks/usePagination";

const ProductManagementTable = () => {
  const { width } = useWindowSize();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("publish");
  const [activeCollapse, setActiveCollapse] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [change, setChange] = useState(false);

  const [productCounts, setProductCounts] = useState({
    totalDraft: 0,
    totalPublic: 0,
    totalDeleted: 0,
  });

  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const counts = await countProducts();
        setProductCounts(counts);
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }
    };

    fetchProductCounts();
  }, []);


  useEffect(() => {
    const loadProducts = async () => {
      console.log("category", category);
      await fetchProducts(category);
      setProducts(getProducts(category)); 
    };
    loadProducts();
  }, [category, change]); 

  const handlePublishProduct = async (productId) => {
    try {
      const response = await publishProducts([productId]);
      toast.success("Sản phẩm đã được xuất bản thành công!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      // Reload products after successful publish
      await fetchProducts(category);
      setProducts(getProducts(category));
      setChange(!change);
    } catch (error) {
      console.error("Error publishing the product:", error);
      toast.error("Lỗi khi xuất bản sản phẩm", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deletePermanentlyProducts([productId]);
      console.log("response", response);
       toast.success("Sản phẩm đã được xóa vĩnh viễn!", {
         position: toast.POSITION.TOP_RIGHT,
         autoClose: 5000,
       });
       await fetchProducts(category);
      setProducts(getProducts(category));
      setChange(!change);
    } catch (error) {
      console.error("Error delete permanently the product:", error);
      toast.error("Lỗi khi xóa sản phẩm", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleDeleteProducts = async () => {
    try {
      if (selectedProducts.length > 0) {
        const response = await deleteProducts(selectedProducts);
        setProducts(getProducts()); 
        setSelectedProducts([]);

        toast.success("Sản phẩm đã được xóa thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        setChange(!change);
      } else {
        toast.warn("Chưa chọn sản phẩm để xóa", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Lỗi khi xóa sản phẩm", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };


  const getQty = (status) => {
    if (status === "all") {
      return (
        productCounts.totalDraft +
        productCounts.totalPublic +
        productCounts.totalDeleted
      );
    }
    if (status === "publish") return productCounts.totalPublic;
    if (status === "draft") return productCounts.totalDraft;
    if (status === "deleted") return productCounts.totalDeleted;
    return 0;
  };


  const dataByStatus = () => {
    return products;
  };

  const pagination = usePagination(dataByStatus(), 8);

  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  const handleCollapse = (sku) => {
    setActiveCollapse(activeCollapse === sku ? "" : sku);
  };

  const handleProductSelect = (sku, isSelected) => {
    setSelectedProducts((prevSelected) =>
      isSelected
        ? [...prevSelected, sku]
        : prevSelected.filter((selectedSku) => selectedSku !== sku)
    );
  };


  const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
    {
      title: (
        <div className="flex items-center justify-center">
          <i className="icon-image-regular text-[26px]" />
        </div>
      ),
      dataIndex: "image",
      width: 45,
      render: (image) => (
        <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
          <img src={image} alt="sản phẩm" />
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => (
        <span className="inline-block h6 !text-sm max-w-[155px]">{text}</span>
      ),
    },
    { title: "SKU", dataIndex: "sku" },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      width: 130,
      render: (stock) => (
        <div className="flex items-center gap-5">
          {stock == null ? (
            "Theo yêu cầu"
          ) : (
            <span>
              <span className={`${stock !== 0 ? "text-green" : "text-red"}`}>
                {stock !== 0
                  ? stock >= 10
                    ? "Còn hàng "
                    : "Tồn kho thấp "
                  : "Hết hàng "}
              </span>
              ({stock})
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => {
        const formattedPrice = price
          ? price.toLocaleString("vi-VN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00";

        return <span>₫{formattedPrice}</span>;
      },
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      render: (category) => (
        <button className="text-accent capitalize">{category}</button>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rateCount",
      render: (rateCount) => (
        <div className="flex items-center gap-2">
          <i
            className={`icon icon-star-${
              rateCount !== 0 ? "solid" : "regular"
            } text-lg leading-none`}
          />
          {rateCount !== 0 && <span className="mt-1">({rateCount})</span>}
        </div>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      render: (date) => (
        <div className="flex flex-col">
          <span>Ngày sửa đổi:</span>
          <span className="font-bold text-header">
            {date && dayjs(date).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (_, product) => (
        <div className="flex items-center justify-end gap-11">
          <NavLink to={`/product-editor/${product.id}`} aria-label="Chỉnh sửa">
            <i className="icon icon-pen-to-square-regular text-lg leading-none" />
          </NavLink>

          {(category === "deleted" || category === "drafted") && (
            <button
              onClick={() => handlePublishProduct(product.id)}
              aria-label="Xuất bản"
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-paper-plane text-lg leading-none" />
            </button>
          )}

          {category === "deleted" && (
            <button
              onClick={() => handleDeleteProduct(product.id)}
              aria-label="Xuất bản"
              className="text-blue-500 hover:text-blue-700"
            >
              <i className="fas fa-trash text-lg leading-none" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-header">Sản phẩm:</span>
        <div>
          {PRODUCT_MANAGEMENT_OPTIONS.map((option, index) => (
            <FilterItem
              key={`filter-${index}`}
              text={option.label}
              qty={getQty(option.value)}
              value={option.value}
              active={category}
              onClick={setCategory}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col-reverse gap-4 mt-4 mb-5 md:flex-row md:justify-between md:items-end md:mt-5 md:mb-6">
        <p>Xem sản phẩm: {pagination.showingOf()}</p>
        <button onClick={handleDeleteProducts} className="btn btn-danger">
          Xóa sản phẩm
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <StyledTable
            columns={[
              {
                title: "Chọn",
                render: (text, product) => (
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) =>
                      handleProductSelect(product.id, e.target.checked)
                    }
                  />
                ),
              },
              ...PRODUCTS_MANAGEMENT_COLUMN_DEFS,
            ]}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.sku}
            locale={{ emptyText: <Empty text="Không tìm thấy sản phẩm" /> }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((product, index) => (
              <ProductManagementCollapseItem
                key={`product-${index}`}
                product={product}
                handleCollapse={handleCollapse}
                activeCollapse={activeCollapse}
              />
            ))}
          </div>
        )}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default ProductManagementTable;
