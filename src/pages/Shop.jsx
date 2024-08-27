import SellerOverview from '@widgets/Shop/SellerOverview';
import TabMenu from '@widgets/Shop/TapMenu';

const Shop = () => {
  const sellerData = {
    backgroundUrl:
      "https://down-tx-vn.img.susercontent.com/dcd3186046be5caa22dc1fe07e8c76c5_tn.webp",
    sellerName: "Lovito.vn",
    lastOnline: "Online 10 giờ trước",
    avatarUrl:
      "https://down-tx-vn.img.susercontent.com/f87c39a4a3702cd4cb149cacd8114a0b_tn.webp",
    productCount: 7000,
    followerCount: 1300000,
    followingCount: 1,
  };
  
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
          discount: "-31%",
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
          discount: "-31%",
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
    // Thêm các danh mục khác vào đây
  ];



    return (
      <>
        <div className="">
          <SellerOverview {...sellerData} />
        </div>
        <div>
          <TabMenu categories={categories} />
        </div>
      </>
    );
}

export default Shop