import React, { useState, useEffect } from "react";
import Search from "@ui/Search";
import Headroom from "react-headroom";
import CustomTooltip from "@ui/CustomTooltip";
import CartPanel from "@components/CartPanel";
import OrdersPanel from "@components/OrdersPanel";
import Logo from "@components/Logo";
import ModalBase from "@ui/ModalBase";
import { useTheme } from "@contexts/themeContext";
import { useSidebar } from "@contexts/sidebarContext";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import { LOCALES } from "@constants/options";

import avatar from "@assets/avatar.webp";
import { checkAvailableLogin } from "@utils/auth";
import { getCookie } from "@utils/cookie";
import { jwtDecode } from "jwt-decode";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LocaleMenu = ({ active, setActive }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {LOCALES.map((locale) => (
        <button
          key={locale.value}
          className="group flex items-center gap-2.5 w-fit"
          onClick={() => setActive(locale.value)}
        >
          <img
            className="rounded-full w-5"
            src={locale.icon}
            alt={locale.label}
          />
          <span
            className={`text-sm font-medium transition group-hover:text-accent ${
              active === locale.value ? "text-accent" : "text-header"
            }`}
          >
            {locale.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const AppBar = () => {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsPanelOpen, setCartPanelOpen] = useState(false);
  const [messagesPanelOpen, setOrdersPanelOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false); 
  const [locale, setLocale] = useState("en-EN");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { width } = useWindowSize();
  const { theme, toggleTheme } = useTheme();
  const { setOpen } = useSidebar();
  const isAuthenticated = checkAvailableLogin();

  const activeLocale = LOCALES.find((l) => l.value === locale);

  let dataInforUser;
  if (getCookie("user_login")) {
    const token = JSON.parse(getCookie("user_login"));
    try {
      dataInforUser = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const roleNames = dataInforUser?.roleNames || [];

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
    } else {
      setCartPanelOpen(true);
    }
  };

  const handleMessagesClick = () => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true); 
    } else {
      setOrdersPanelOpen(true); 
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full px-5 py-5 z-50 bg-white">
      <div className="mb-5 w-full">
        <div style={{ zIndex: 999 }}>
          <div className="flex items-center justify-between">
            {roleNames.includes("shop") && width < 1920 && (
              <button
                className="icon text-2xl leading-none"
                aria-label="Open sidebar"
                onClick={() => setOpen(true)}
              >
                <i className="icon-bars-solid" />
              </button>
            )}
            {width >= 768 && (
              <div className="flex w-full mx-7">
                <Logo />
                <Search wrapperClass="flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0" />
              </div>
            )}
            <div className="flex items-center gap-5 md:ml-5 xl:gap-[26px]">
              {width < 768 && (
                <button
                  className="text-[20px] leading-none text-gray dark:text-gray-red xl:text-2xl"
                  aria-label="Open search"
                  onClick={() => setSearchModalOpen(true)}
                >
                  <i className="icon-magnifying-glass-solid" />
                </button>
              )}
              <button
                className="text-2xl leading-none text-gray dark:text-gray-red"
                aria-label="Change theme"
                onClick={toggleTheme}
              >
                <i
                  className={`icon-${
                    theme === "light" ? "sun-bright" : "moon"
                  }-regular`}
                />
              </button>
              <CustomTooltip
                title={<LocaleMenu active={locale} setActive={setLocale} />}
              >
                <button
                  className="w-6 h-6 rounded-full overflow-hidden xl:w-8 xl:h-8"
                  aria-label="Change language"
                >
                  <img src={activeLocale.icon} alt={activeLocale.label} />
                </button>
              </CustomTooltip>
              <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
                <button
                  className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                  onClick={handleCartClick} 
                  aria-label="Notifications"
                >
                  <i className="fas fa-shopping-cart" />
                </button>
                <span
                  className="absolute w-3 h-3 rounded-full bg-red -top-1.5 -right-1.5 border-[2px] border-body
                                      xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
                >
                  <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                    7
                  </span>
                </span>
              </div>
              <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
                <button
                  className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                  onClick={handleMessagesClick} // Use the new function here
                  aria-label="Messages"
                >
                  <i className="fas fa-truck" title="Theo dõi đơn hàng" />
                </button>
                <span
                  className="absolute w-3 h-3 rounded-full bg-green -top-1.5 -right-1.5 border-[2px] border-body
                                      xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
                >
                  <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                    5
                  </span>
                </span>
              </div>
              <div className="relative">
                <button
                  className="h-8 w-8 rounded-full bg-accent text-widget text-sm flex items-center
                                        justify-center relative xl:w-11 xl:h-11 xl:text-lg"
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/general-settings")
                      : navigate("/login")
                  }
                  aria-label="Account menu"
                >
                  <img
                    className="relative rounded-full w-full h-full"
                    src={dataInforUser?.avatar ? dataInforUser?.avatar : avatar}
                    alt="avatar"
                  />
                </button>
                <span className="badge-online" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBase
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
      >
        <div className="flex flex-col items-center justify-between p-10 w-[400px] bg-slate-100 rounded-xl">
          <h2 className="text-xl font-bold">Bạn cần đăng nhập</h2>
          <p className="mt-2">Vui lòng đăng nhập để tiếp tục.</p>
          <div className="flex w-full justify-between">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setLoginPromptOpen(false);
                navigate("/login"); // Redirect to login page
              }}
            >
              Đăng nhập
            </button>
            <button
              className="text-white bg-rose-500 rounded mt-4 px-4 py-2 hover:opacity-80"
              onClick={() => setLoginPromptOpen(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </ModalBase>
      <CartPanel
        open={notificationsPanelOpen}
        onClose={() => setCartPanelOpen(false)}
      />
      <OrdersPanel
        open={messagesPanelOpen}
        onClose={() => setOrdersPanelOpen(false)}
      />
    </div>
  );
};

export default AppBar;
