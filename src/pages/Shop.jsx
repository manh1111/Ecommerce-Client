import Gallery from '@components/Gallery/Gallery';
import ProductGallery from '@components/Gallery/ProductGallery';
import CategoryList from '@widgets/Shop/CategoryList';
import CategoryMenu from '@widgets/Shop/CategoryMenu';
import ProductGrid from '@widgets/Shop/ProductGrid_1';
import ProductGrid_2 from '@widgets/Shop/ProductGrid_2';
import ProductGrid_3 from '@widgets/Shop/ProductGrid_3';
import SellerOverview from '@widgets/Shop/SellerOverview';
import TabMenu from '@widgets/Shop/TapMenu';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//api
import { getCatalogByShopId } from '@api/catalog ';
import { getProductsByCatalogShop } from "@api/product";
import { getShopById } from '@api/shop';

const Shop = () => {
  const [shop, setShop] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const { id } = useParams();
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const sellerData = {
    backgroundUrl: shop?.logo,
    Desc: shop.description,
    avatarUrl: shop?.logo,
    productCount: shop?.productCount || getRandomNumber(10, 100),
    followerCount: shop?.followerCount || getRandomNumber(10, 100),
    followingCount: shop?.followingCount || getRandomNumber(10, 100),
    sellerName: shop.shop_name,
    joinDate: shop.createdAt,
  };

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopDetails = await getShopById(id);
        setShop(shopDetails);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    const fetchCatalogData = async () => {
      try {
        const catalog = await getCatalogByShopId(id);
        setCatalogs(catalog); // Cập nhật catalogs tại đây
        console.log(catalog);
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      }
    };

    fetchShopData();
    fetchCatalogData();
  }, [id]); // Chỉ gọi fetchShopData và fetchCatalogData khi id thay đổi

  useEffect(() => {
    const fetchProductsForCatalogs = async () => {
      const productPromises = catalogs?.map(async (catalog) => {
        const catalogId = catalog._id;
        console.log("catalogId", catalogId);
        return await getProductsByCatalogShop(id, catalogId);
      });

      try {
        const products = await Promise.all(productPromises);
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Chỉ gọi fetchProductsForCatalogs khi catalogs có dữ liệu
    if (catalogs?.length > 0) {
      fetchProductsForCatalogs();
    }
  }, [catalogs, id]); // Theo dõi sự thay đổi của catalogs và id

  const categories = [
    {
      id: 1,
      name: "Electronics",
      products: [
        {
          imageSrc:
            "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
          altText:
            "Lovito Áo thun dây rút trơn thông thường cho nữ áo kiểu áo đi chơi LNA27322 (Hồng)",
          promotionOverlaySrc:
            "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzaej1859qch70",
          price: "111.000",
          discount: "31%",
          rating: 4.8,
          soldCount: "14,7k",
          promotionText: "Rẻ Vô Địch",
          voucherText: "19% Giảm",
        },
        {
          imageSrc:
            "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
          altText:
            "Lovito Áo thun dây rút trơn thông thường cho nữ áo kiểu áo đi chơi LNA27322 (Hồng)",
          promotionOverlaySrc:
            "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzaej1859qch70",
          price: "111.000",
          discount: "31%",
          rating: 4.8,
          soldCount: "14,7k",
          promotionText: "Rẻ Vô Địch",
          voucherText: "19% Giảm",
        },
        ,
        {
          imageSrc:
            "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
          altText:
            "Lovito Áo thun dây rút trơn thông thường cho nữ áo kiểu áo đi chơi LNA27322 (Hồng)",
          promotionOverlaySrc:
            "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzaej1859qch70",
          price: "111.000",
          discount: "31%",
          rating: 4.8,
          soldCount: "14,7k",
          promotionText: "Rẻ Vô Địch",
          voucherText: "19% Giảm",
        },
        ,
        {
          imageSrc:
            "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
          altText:
            "Lovito Áo thun dây rút trơn thông thường cho nữ áo kiểu áo đi chơi LNA27322 (Hồng)",
          promotionOverlaySrc:
            "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzaej1859qch70",
          price: "111.000",
          discount: "31%",
          rating: 4.8,
          soldCount: "14,7k",
          promotionText: "Rẻ Vô Địch",
          voucherText: "19% Giảm",
        },
        {
          imageSrc:
            "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
          altText:
            "Lovito Áo thun dây rút trơn thông thường cho nữ áo kiểu áo đi chơi LNA27322 (Hồng)",
          promotionOverlaySrc:
            "https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lzaej1859qch70",
          price: "111.000",
          discount: "31%",
          rating: 4.8,
          soldCount: "14,7k",
          promotionText: "Rẻ Vô Địch",
          voucherText: "19% Giảm",
        },
      ],
    },
    {
      id: 2,
      name: "Clothing",
      products: [
        {
          id: 201,
          name: "T-Shirt",
          imageUrl: "https://example.com/tshirt.jpg",
          price: "$19",
          discount: "5%",
          rating: 4.3,
          soldCount: 200,
          promotionText: "Limited Edition!",
          voucherText: "Get $5 off",
          promotionOverlaySrc: "https://example.com/overlay.png",
        },
        {
          id: 202,
          name: "Jeans",
          imageUrl: "https://example.com/jeans.jpg",
          price: "$49",
          discount: "10%",
          rating: 4.6,
          soldCount: 150,
          promotionText: "Best Seller!",
          voucherText: "Get $10 off",
          promotionOverlaySrc: "https://example.com/overlay.png",
        },
        // Thêm các sản phẩm khác vào đây
      ],
    },
  ];

  const defaultProducts = [
    {
      link: "https://shp.ee/nymx3s4",
      imgSrc:
        "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jig46uaa2.webp",
    },
    {
      link: "/lovito.vn?shopCollection=244627923#product_list",
      imgSrc:
        "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jigb7oi76.webp",
    },
    {
      link: "/lovito.vn?shopCollection=246707654#product_list",
      imgSrc:
        "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jigcm8y95.webp",
    },
    {
      link: "/lovito.vn?shopCollection=143450997#product_list",
      imgSrc:
        "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jige0te72.webp",
    },
  ];

  const productData = {
    imageSrc:
      "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lr44bgxap1nxbe.webp",
    links: [
      {
        href: "/lovito.vn?shopCollection=249704111#product_list",
        top: "0%",
        left: "0%",
        width: "100%",
        height: "54.2667%",
      },
      {
        href: "https://shopee.vn/product/446089250/24609117543",
        top: "54.8%",
        left: "0%",
        width: "34.1333%",
        height: "45.2%",
      },
      {
        href: "https://shopee.vn/product/446089250/22263682984",
        top: "54.6667%",
        left: "34.4%",
        width: "31.0667%",
        height: "45.3333%",
      },
      {
        href: "https://shopee.vn/product/446089250/23863678516",
        top: "54.6667%",
        left: "65.8667%",
        width: "34.1333%",
        height: "45.3333%",
      },
    ],
  };
  const productData2 = {
    imageSrc:
      "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jig9t4268.webp",
    links: [
      {
        href: "https://shopee.vn/product/446089250/20605417536",
        top: "10.9312%",
        left: "0.133333%",
        width: "34.2667%",
        height: "44.6356%",
      },
      {
        href: "https://shopee.vn/product/446089250/22037952162",
        top: "11.1336%",
        left: "35.2%",
        width: "31.4667%",
        height: "44.6356%",
      },
      {
        href: "https://shopee.vn/product/446089250/23078250099",
        top: "11.0324%",
        left: "66.8%",
        width: "33.2%",
        height: "44.6356%",
      },
      {
        href: "https://shopee.vn/product/446089250/25706389809",
        top: "56.3765%",
        left: "0.266667%",
        width: "34.2667%",
        height: "43.5223%",
      },
      {
        href: "https://shopee.vn/product/446089250/24703374097",
        top: "56.7814%",
        left: "35.3333%",
        width: "30.4%",
        height: "43.1174%",
      },
      {
        href: "https://shopee.vn/product/446089250/25252316222",
        top: "56.8826%",
        left: "66%",
        width: "34%",
        height: "43.1174%",
      },
      {
        href: "/lovito.vn?shopCollection=243230552#product_list",
        top: "0%",
        left: "0%",
        width: "100%",
        height: "10.6275%",
      },
    ],
  };

  const productData3 = {
    imageSrc:
      "https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lyx29jigffduc5.webp",
    links: [
      {
        href: "https://shopee.vn/product/446089250/10651730416",
        top: "0.177936%",
        left: "0%",
        width: "34.4%",
        height: "80.7829%",
      },
      {
        href: "https://shopee.vn/product/446089250/25671535292",
        top: "0%",
        left: "34.5333%",
        width: "31.6%",
        height: "79.8932%",
      },
      {
        href: "https://shopee.vn/product/446089250/25969955327",
        top: "0%",
        left: "66.2667%",
        width: "33.7333%",
        height: "81.3167%",
      },
      {
        href: "/lovito.vn?shopCollection=243230552#product_list",
        top: "81.6726%",
        left: "0%",
        width: "100%",
        height: "18.3274%",
      },
    ],
  };

  return (
    <>
      <div className="w-full">
        <SellerOverview {...sellerData} />
      </div>
      <div>
        <TabMenu categories={categories} />
      </div>
      <div className="mt-4">
        <Gallery slidesPerView={1} />
      </div>
      <div className="mt-4">
        <ProductGallery products={defaultProducts} />
      </div>
      <div className="mt-4">
        <ProductGrid data={productData} />
      </div>
      <div className="mt-4">
        <ProductGrid_2
          imageSrc={productData2.imageSrc}
          links={productData2.links}
        />
      </div>
      <div className="mt-4">
        <ProductGrid_3
          imageSrc={productData3.imageSrc}
          links={productData3.links}
        />
      </div>

      <div className="category flex flex-row mt-5">
        <CategoryMenu categories={categories} />
        <CategoryList categories={categories} />
      </div>
    </>
  );
}

export default Shop