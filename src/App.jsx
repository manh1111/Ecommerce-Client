import ReactGA from "react-ga4";
import { lazy, Suspense } from "react";
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "@styles/theme";
import "@fonts/icomoon/icomoon.woff";
import { SidebarProvider } from "@contexts/sidebarContext";
import { ThemeProvider } from "styled-components";
import { useTheme } from "@contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import ScrollToTop from "@components/ScrollToTop";
import Loader from "@components/Loader";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "@layout/Sidebar";
import AppBar from "@layout/AppBar";
import CreaterProduct from "@pages/CreaterProduct";

const Login = lazy(() => import("@pages/Login"));
const SignUp = lazy(() => import("@pages/SignUp"));
const SalesAnalytics = lazy(() => import("@pages/SalesAnalytics"));
const MainPage = lazy(() => import("@pages/MainPage"));
const SellersList = lazy(() => import("@pages/SellersList"));
const SellersTable = lazy(() => import("@pages/SellersTable"));
const SellersGrid = lazy(() => import("@pages/SellersGrid"));
const SellerProfile = lazy(() => import("@pages/SellerProfile"));
const Shop = lazy(() => import("@pages/Shop"));
const Product = lazy(() => import("@pages/Product"));
const RevenueByPeriod = lazy(() => import("@pages/RevenueByPeriod"));
const TopProducts = lazy(() => import("@pages/TopProducts"));
const ProductsGrid = lazy(() => import("@pages/ProductsGrid"));
const ProductsManagement = lazy(() => import("@pages/ProductsManagement"));
const ProductEditor = lazy(() => import("@pages/EditProduct"));
const StartSelling = lazy(() => import("@pages/StartSelling"));
const Banners = lazy(() => import("@pages/Banners"));
const Orders = lazy(() => import("@pages/Orders"));
const Statistics = lazy(() => import("@pages/Statistics"));
const Reviews = lazy(() => import("@pages/Reviews"));
const Customers = lazy(() => import("@pages/Customers"));
const Transactions = lazy(() => import("@pages/Transactions"));
const GeneralSettings = lazy(() => import("@pages/GeneralSettings"));
const ConnectedApps = lazy(() => import("@pages/ConnectedApps"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

const App = () => {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;

  // Kiểm tra nếu đường dẫn không chứa 'login' hoặc 'sign-up'
  const withSidebar =
    path !== "/login" && path !== "/404" && path !== "/sign-up";

  // Google Analytics init
  const gaKey = import.meta.env.VITE_GA;
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider theme={{ theme: theme }}>
        <ThemeStyles />
        <ToastContainer
          theme={theme}
          autoClose={2000}
          style={{ padding: "20px" }}
        />
        {width < 1280 && withSidebar && <AppBar />}
        <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
          <ScrollToTop />
          {withSidebar && <Sidebar />}
          <div className="app_content">
            {width >= 1280 && withSidebar && <AppBar />}
            <Suspense fallback={<Loader />}>
              <div className={withSidebar ? "main" : ""}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/" element={<MainPage />} />
                  <Route path="/salesAnalytics" element={<SalesAnalytics />} />
                  <Route path="/sellers-list" element={<SellersList />} />
                  <Route path="/sellers-table" element={<SellersTable />} />
                  <Route path="/sellers-grid" element={<SellersGrid />} />
                  <Route
                    path="/products-management"
                    element={<ProductsManagement />}
                  />
                  <Route path="/seller-profile" element={<SellerProfile />} />
                  <Route
                    path="/revenue-by-period"
                    element={<RevenueByPeriod />}
                  />
                  <Route path="/top-products" element={<TopProducts />} />
                  <Route path="/products-grid" element={<ProductsGrid />} />
                  <Route path="/product-editor" element={<ProductEditor />} />
                  <Route path="/product-creater" element={<CreaterProduct />} />
                  <Route path="/category" element={<ProductEditor />} />
                  <Route path="/banners" element={<Banners />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/connected-apps" element={<ConnectedApps />} />
                  <Route
                    path="/general-settings"
                    element={<GeneralSettings />}
                  />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                  <Route path="/start-selling" element={<StartSelling />} />
                  <Route path="/404" element={<PageNotFound />} />
                </Routes>
              </div>
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;
