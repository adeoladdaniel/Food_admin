import { useState, useEffect } from 'react';
import {
  List,
  BusinessCenter,
  PeopleAltTwoTone,
  BusinessCenterOutlined,
  Settings as SettingsIcon,
  DataUsage as DataUsageIcon,
  Dashboard as DashboardIcon,
  SendRounded as DeliveryIcon,
  AccountBox as AccountBoxIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from '@material-ui/icons';
import Roles from '../../../../../utils/Roles';

const PublicNavBar = [
  {
    title: 'Account',
    href: '/account',
    icon: AccountBoxIcon,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
  }
];

const RoleBasedNavBar = [
  {
    title: 'Dashboard',
    href: '/',
    icon: DashboardIcon,
    permission: [Roles.SALES, Roles.SUPER_ADMIN],
    child: [
      {
        title: 'Settlements',
        href: '/settlements',
        icon: BusinessCenterOutlined
      },
      {
        title: 'Market Analysis',
        href: '/products/market-analysis',
        icon: List
      }
    ]
  },
  {
    title: 'Management',
    href: '/super-admin',
    icon: DataUsageIcon,
    permission: [Roles.SUPER_ADMIN],
  },
  {
    title: 'Partnerships',
    href: '/partnerships',
    icon: PeopleAltTwoTone,
    permission: [Roles.PRODUCT, Roles.SUPER_ADMIN],
  },
  {
    title: 'Products',
    href: '/products/all/platform',
    beta: 'Beta',
    icon: ShoppingBasketIcon,
    permission: [Roles.PRODUCT, Roles.SUPER_ADMIN],
  },
  {
    title: 'Shell Coop East ',
    href: '/coopeast-orders',
    icon: DashboardIcon,
    permission: [Roles.COOP_ADMIN, Roles.SUPER_ADMIN],
  },
  {
    title: 'Settlement',
    href: '/coopeast/settlements',
    icon: BusinessCenter,
    permission: [Roles.COOP_ADMIN, Roles.SUPER_ADMIN],
  },
  {
    title: 'Sales',
    href: '/sales-deliveries',
    icon: DeliveryIcon,
    permission: [Roles.SALES, Roles.SUPER_ADMIN],
  },
];

const useNavBar = (roles = []) => {
  const [navBar, setNavBar] = useState([]);

  const getNavByRole = (roles) => {
    const allowedNav = RoleBasedNavBar.filter((item) => (
      item.permission.some((item) => roles.includes(item))
    ));

    setNavBar([
      ...allowedNav,
      ...PublicNavBar,
    ]);
  };

  useEffect(() => {
    getNavByRole(roles);
  }, [roles]);

  return {
    navBar
  };
};

useNavBar.defaultProps = {
  roles: []
};

export default useNavBar;
