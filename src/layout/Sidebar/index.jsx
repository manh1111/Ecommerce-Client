// styled components
import Drawer from './styles';

// components
import Logo from '@components/Logo';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import { Fragment } from 'react';

// hooks
import { useSidebar } from '@contexts/sidebarContext';
import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

// constants
import ROUTES from '@constants/routes';

const Sidebar = () => {
  const { width } = useWindowSize();
  const { open, setOpen } = useSidebar();
  const [active, setActive] = useState('Dashboard');
  const isPermanent = width >= 1920;
  const navigate = useNavigate()


  return (
    <div className='flex gap-8 h-full flex-1'>
      <div className='col-span-1 h-[calc(100vh-150px)] card w-1/5'>
        <div className="flex flex-col space-y-4">
          {ROUTES.map((route, index) => {
            return (
              <div key={route.name} className='cursor-pointer font-semibold'>
                {route.links && (
                  <>
                    <div>
                      <div
                        className={`flex items-center justify-between ${active === route.name ? "text-blue-700 font-bold" : ""
                          }`}
                        onClick={() => {
                          setActive(active === route.name ? "" : route.name)
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <i className={`icon icon-${route.icon}`} />
                          <span className="text">{route.name}</span>
                        </div>
                        <button
                          className="xl:hidden 4xl:block"
                          aria-label="Toggle submenu"
                        >
                          <i className="icon icon-caret-right-solid" />
                        </button>
                      </div>
                      <Collapse
                        in={active === route.name}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="flex flex-col gap-2.5 my-4 ms-3">
                          {route.links.map((link) => {
                            return (
                              <NavLink
                                className={`${active === link.name ? "text-blue-700 font-bold" : ""}`}
                                to={`/shop/${link.path}`}
                                key={link.name}
                                onClick={() => setActive(active === link.name ? "" : link.name)}
                              >
                                <span className="flex items-center gap-2.5">
                                  <i className="icon icon-circle-solid" />
                                  <span>{link.name}</span>
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </Collapse>
                    </div>
                    {index === ROUTES.length - 2 && (
                      <span className="menu_divider" />
                    )}
                  </>
                )}
                {!route.links && (
                  <>
                    <div
                      className={`${active === route.name ? "text-blue-700 font-bold" : ""}`}
                      onClick={() => {
                        setActive(active === route.name ? "" : route.name)
                        navigate(`/shop/${route.path}`)
                      }}>
                      <div className="flex items-center gap-2.5">
                        <i className={`icon icon-${route.icon}`} />
                        <span className="text">{route.name}</span>
                      </div>
                    </div>
                    {index === ROUTES.length - 2 && (
                      <span className="menu_divider" />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className='flex-1 overflow-y-auto mb-[40px] '>
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar