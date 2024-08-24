import React, { useState, useEffect } from "react";
import Search from "@ui/Search";
import Headroom from "react-headroom";
import CustomTooltip from "@ui/CustomTooltip";
import NotificationsPanel from "@components/NotificationsPanel";
import MessagesPanel from "@components/MessagesPanel";
import Logo from "@components/Logo";
import ModalBase from "@ui/ModalBase";
import { useTheme } from "@contexts/themeContext";
import { useSidebar } from "@contexts/sidebarContext";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import { LOCALES } from "@constants/options";

import avatar from "@assets/avatar.webp";

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
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [messagesPanelOpen, setMessagesPanelOpen] = useState(false);
  const [locale, setLocale] = useState("en-EN");
  const { width } = useWindowSize();
  const { theme, toggleTheme } = useTheme();
  const { setOpen } = useSidebar();

  const activeLocale = LOCALES.find((l) => l.value === locale);

  useEffect(() => {
    setSearchModalOpen(false);
  }, [width]);

  const infoItems = [
    {
      icon: "https://salt.tikicdn.com/ts/upload/96/76/a3/16324a16c76ee4f507d5777608dab831.png",
      text: "100% hàng thật",
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/0b/f2/19/c03ae8f46956eca66845fb9aaadeca1e.png",
      text: "Hoàn 200% nếu hàng giả",
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/3a/f4/7d/86ca29927e9b360dcec43dccb85d2061.png",
      text: "30 ngày đổi trả",
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/04/c8/6f/3ec1db7c9ac4099df6b31da715614b0e.png",
      text: "Giao nhanh 2h",
    },
    {
      icon: "https://salt.tikicdn.com/ts/upload/6a/81/06/0675ef5512c275a594d5ec1d58c37861.png",
      text: "Giá siêu rẻ",
    },
  ];

  return (
    <>
      <div className="mb-5 w-full">
        <Headroom style={{ zIndex: 999 }}>
          <div className="flex items-center justify-between">
            {width < 1920 && (
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
                  onClick={() => setNotificationsPanelOpen(true)}
                  aria-label="Notifications"
                >
                  <i className="icon-bell-solid" />
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
                  onClick={() => setMessagesPanelOpen(true)}
                  aria-label="Messages"
                >
                  <i className="icon-message-solid" />
                </button>
                <span
                  className="absolute w-3 h-3 rounded-full bg-green -top-1.5 -right-1.5 border-[2px] border-body
                                      xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
                >
                  <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                    2
                  </span>
                </span>
              </div>
              <div className="relative">
                <button
                  className="h-8 w-8 rounded-full bg-accent text-widget text-sm flex items-center
                                        justify-center relative xl:w-11 xl:h-11 xl:text-lg"
                  onClick={() => navigate("/general-settings")}
                  aria-label="Account menu"
                >
                  <img
                    className="relative rounded-full w-full h-full"
                    src={avatar}
                    alt="Maria Smith"
                  />
                </button>
                <span className="badge-online" />
              </div>
            </div>
          </div>
        </Headroom>

        {width < 768 && (
          <ModalBase
            open={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
          >
            <div className="card max-w-[360px] w-full">
              <h3 className="mb-3">Search</h3>
              <Search placeholder="What are you looking for?" />
            </div>
          </ModalBase>
        )}
        <NotificationsPanel
          open={notificationsPanelOpen}
          onOpen={() => setNotificationsPanelOpen(true)}
          onClose={() => setNotificationsPanelOpen(false)}
        />
        <MessagesPanel
          open={messagesPanelOpen}
          onOpen={() => setMessagesPanelOpen(true)}
          onClose={() => setMessagesPanelOpen(false)}
        />
      </div>

      <div className="flex border-2 border-gray-400 p-4 rounded-lg items-center gap-8 bg-white overflow-x-hidden">
        <div className="text-gray-800 font-semibold text-[#003EA1] text-lg whitespace-nowrap">
          Cam kết
        </div>
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <img
              src={item.icon}
              alt={`icon-${index}`}
              className="w-[25px] h-[25px]"
            />
            <div className="text-gray-800 font-medium text-sm whitespace-nowrap">
              {item.text}
            </div>
            {index < infoItems.length - 1 && (
              <div className="w-[2px] bg-gray-400 items-center">|</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AppBar;
