import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon
} from '@/icons'
import { useSidebar } from '@/context/SidebarContext'

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[]
}

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <PlugInIcon />,
    name: 'Devices',
    subItems: [
      { name: 'Masters', path: '/devices/masters', pro: false },
      { name: 'Sensors', path: '/devices/sensors', pro: false }
    ]
  },
  {
    icon: <PieChartIcon />,
    name: 'Data',
    subItems: [
      { name: 'Historical', path: '/data/historical', pro: false }
    ]
  },
  {
    icon: <UserCircleIcon />,
    name: 'Admin',
    subItems: [
      { name: 'Companies', path: '/admin/companies', pro: false },
      { name: 'Projects', path: '/admin/projects', pro: false },
      { name: 'Locations', path: '/admin/locations', pro: false },
      { name: 'Users', path: '/admin/users', pro: false }
    ]
  }
]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const location = useLocation()

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main'
    index: number
  } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  )

  useEffect(() => {
    let submenuMatched = false
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: 'main',
              index
            })
            submenuMatched = true
          }
        })
      }
    })

    if (!submenuMatched) {
      setOpenSubmenu(null)
    }
  }, [location, isActive])

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.index === index) {
        return null
      }
      return { type: 'main', index }
    })
  }

  const renderMenuItems = (items: NavItem[]) => (
    <ul className='flex flex-col gap-4'>
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                openSubmenu?.index === index
                  ? 'menu-item-active'
                  : 'menu-item-inactive'
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'lg:justify-start'
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.index === index
                    ? 'menu-item-icon-active'
                    : 'menu-item-icon-inactive'
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className='menu-item-text'>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.index === index
                      ? 'rotate-180 text-brand-500'
                      : ''
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                } ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'lg:justify-start'
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive'
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className='menu-item-text'>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`main-${index}`] = el
              }}
              className='overflow-hidden transition-all duration-300'
              style={{
                height:
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`main-${index}`]}px`
                    : '0px'
              }}
            >
              <ul className='mt-2 space-y-1 ml-9'>
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? 'menu-dropdown-item-active'
                          : 'menu-dropdown-item-inactive'
                      }`}
                    >
                      {subItem.name}
                      <span className='flex items-center gap-1 ml-auto'>
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? 'menu-dropdown-badge-active'
                                : 'menu-dropdown-badge-inactive'
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-[240px]'
            : isHovered
            ? 'w-[240px]'
            : 'w-[70px]'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 md:py-8 flex ${
          !isExpanded && !isHovered && !isMobileOpen ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link to='/' className="flex items-center justify-center min-w-0 w-full px-2">
          <img
            className='transition-all duration-300 ease-in-out block max-w-full h-auto dark:hidden'
            src='/images/logo/logo.png'
            alt='Snsorial Logo'
            style={{
              width: (isExpanded || isHovered || isMobileOpen) ? '130px' : '55px',
              minWidth: '45px',
              height: 'auto',
              maxHeight: '38px',
              objectFit: 'contain'
            }}
          />
          <img
            className='transition-all duration-300 ease-in-out hidden dark:block max-w-full h-auto'
            src='/images/logo/logo-negativo.png'
            alt='Snsorial Logo'
            style={{
              width: (isExpanded || isHovered || isMobileOpen) ? '130px' : '55px',
              minWidth: '45px',
              height: 'auto',
              maxHeight: '38px',
              objectFit: 'contain'
            }}
          />
        </Link>
      </div>
      <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
        <nav className='mb-6'>
          <div className='flex flex-col gap-4'>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  'Menu'
                ) : (
                  <HorizontaLDots className='size-6' />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default AppSidebar
