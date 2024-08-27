// components
import PageHeader from '@layout/PageHeader';
import TopProducts from './TopProducts';
import SellerProfilesGrid from '@widgets/SellerProfilesGrid';
import Gallery from '@components/Gallery/Gallery';
import QuickLinks from '@components/QuickLink';
import Carousel from '@components/Carousel/Carousel';
import { getCookie } from '@utils/cookie';
import { jwtDecode } from "jwt-decode";

// Decode JWT Token to get User Info
if (getCookie("user_login")) {
  const token = JSON.parse(getCookie("user_login"));
  try {
    const dataInforUser = jwtDecode(token);
    console.log("Data Infor User:", dataInforUser);
  } catch (error) {
    console.error("Invalid token", error);
  }
}

const MainPage = () => {
  
  return (
    <>
      <PageHeader title="Discover" changePageName={false} />
      <div className="section flex flex-1 flex-col mb-5">
        <Gallery />
      </div>

      <div className="section m-6">
        <QuickLinks />
      </div>
      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">SHOP</h1>
        </div>
        <SellerProfilesGrid numberOfSellers={6} fullGrid={false} />
      </div>

      <div className="section my-5">
        <div className="flex justify-between items-center p-4">
          <div className="text-center">
            <span className="text-3xl  text-blue-600 font-bold gradient-text">
              Tìm kiếm hàng đầu
            </span>
          </div>
          <a
            href="/top_products"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Xem tất cả
            <svg viewBox="0 0 11 11" className="inline-block w-4 h-4 ml-2">
              <path
                fill="white"
                d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"
              ></path>
            </svg>
          </a>
        </div>

        <Carousel />
      </div>
      <div className="section">
        <div
          className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
        >
          <h1 className="flex-1 text-center lg:text-left">TOP PRODUCT</h1>
        </div>
        <TopProducts hasTitle={false} />
      </div>

      <div className="section">
        <a target="_self" href="#">
          <img className="banner-image" src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e" alt="Banner" />   
        </a>
      </div>
    </>
  );
};

export default MainPage; 