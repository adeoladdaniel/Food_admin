import {
  lazy
} from 'react';
import {
  Main as MainLayout,
  Minimal
} from '../layouts';

import {
  mainRoutes
} from './paths';

import Roles from '../utils/Roles';

const Dashboard = lazy(() => import('../views/Dashboard/Dashboard'));
const AccountView = lazy(() => import('../views/Account/Account'));
const SignInView = lazy(() => import('../views/SignIn/SignIn'));
const SettingsView = lazy(() => import('../views/Settings/Settings'));

//* ****Super Admin********//
const SuperAdminView = lazy(() => import('../views/SuperAdmin/SuperAdminView'));
const Partnership = lazy(() => import('../views/partnerships/Partnership'));

//* *** Admin to Approve Products ******//

const ProductUploads = lazy(() => import('../views/Products/NewProductUpload'));
const ProductDetails = lazy(() => import('../views/Products/DetailsPage/DetailsPage'));
const QuickMarket = lazy(() => import('../views/Products/QuickMarket/Upload/MarketForm'));
const AddMeasurementType = lazy(() => import('../views/Products/AddMeasurement'));
const ProductEdit = lazy(() => import('../views/Products/EditProduct'));
const ProductPlatform = lazy(() => import('../views/Products/ProductByPlatforms'));
const ProductsList = lazy(() => import('../views/Products/Products'));
const ProductReUpload = lazy(() => import('../views/Products/ReUpload'));

//* ******Sales Personnel******//
const Sales = lazy(() => import('../views/Sales/Sales'));

//* *****Passwords**** *//
const CreatePassword = lazy(() => import('../views/CreatePassword/CreatePassword'));
const ForgotPassword = lazy(() => import('../views/ForgotPassword/ForgotPassword'));

//* **Coopeast coop */
const CoopAdmin = lazy(() => import('../views/CoopAdmin/CoopAdmin'));
const CoopAdminSettlement = lazy(() => import('../views/CoopAdmin/CoopEastSettlements'));

/**
 * Reconcilation
 */

const Reconciliation = lazy(() => import('../views/Reconciliation/Reconciliation'));
const ReconciliationProducts = lazy(() => import('../views/Reconciliation/ProductsDetails'));

const {
  ACCOUNTS,
  COOP_ORDERS,
  COOP_SETTLEMENTS,
  CREATE_PASSWORD,
  FORGOT_PASSWORD,
  RECONCILIATION_PRODUCTS,
  HOME,
  PARTNERSHIP,
  PRODUCTS,
  RECONCILIATION,
  SALES,
  SETTINGS,
  SIGN_IN,
  SUPER_ADMIN,
  PRODUCT_EDIT,
  PLATFORM_PRODUCT,
  PRODUCT_UPLOAD,
  PRODUCT_RE_UPLOAD,
  QUICK_MARKET,
  PRODUCT_DETAILS,
  PRODUCT_MEASUREMENT_TYPE
} = mainRoutes;

export const appRoutes = [
  {
    path: HOME,
    role: [],
    layout: MainLayout,
    component: Dashboard,
    authPath: SIGN_IN,

  },
  {
    path: SUPER_ADMIN,
    role: [Roles.SUPER_ADMIN],
    layout: MainLayout,
    component: SuperAdminView,
    authPath: SIGN_IN
  },
  {
    path: QUICK_MARKET,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: QuickMarket,
    authPath: SIGN_IN
  },
  {
    path: PRODUCT_UPLOAD,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductUploads,
    authPath: SIGN_IN
  },
  {
    path: PRODUCT_MEASUREMENT_TYPE,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: AddMeasurementType,
    authPath: SIGN_IN
  },
  {
    path: PRODUCT_EDIT,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductEdit,
    authPath: SIGN_IN
  },
  {
    path: PRODUCT_DETAILS,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductDetails,
    authPath: SIGN_IN
  },
  {
    path: PLATFORM_PRODUCT,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductPlatform,
    authPath: SIGN_IN
  },
  {
    path: PRODUCTS,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductsList,
    authPath: SIGN_IN
  },
  {
    path: PRODUCT_RE_UPLOAD,
    role: [Roles.PRODUCT],
    layout: MainLayout,
    component: ProductReUpload,
    authPath: SIGN_IN
  },
  {
    path: PARTNERSHIP,
    role: [Roles.SALES],
    layout: MainLayout,
    component: Partnership,
    authPath: SIGN_IN
  },
  {
    path: COOP_ORDERS,
    role: [Roles.SALES],
    layout: MainLayout,
    component: CoopAdmin,
    authPath: SIGN_IN
  },
  {
    path: COOP_SETTLEMENTS,
    role: [Roles.SALES],
    layout: MainLayout,
    component: CoopAdminSettlement,
    authPath: SIGN_IN
  },
  {
    path: COOP_ORDERS,
    role: [Roles.COOP_ADMIN],
    layout: MainLayout,
    component: CoopAdmin,
    authPath: SIGN_IN
  },
  {
    path: SALES,
    role: [Roles.SALES],
    layout: MainLayout,
    component: Sales,
    authPath: SIGN_IN
  },
  {
    path: RECONCILIATION,
    role: [Roles.COOP_ADMIN],
    layout: MainLayout,
    component: Reconciliation,
    authPath: SIGN_IN
  },
  {
    path: RECONCILIATION_PRODUCTS,
    role: [Roles.COOP_ADMIN],
    layout: MainLayout,
    component: ReconciliationProducts,
    authPath: SIGN_IN
  },
  {
    path: ACCOUNTS,
    role: [],
    layout: MainLayout,
    component: AccountView,
    authPath: SIGN_IN
  },
  {
    path: SETTINGS,
    role: [],
    layout: MainLayout,
    component: SettingsView,
    authPath: SIGN_IN
  },
  {
    path: CREATE_PASSWORD,
    role: [],
    layout: Minimal,
    component: CreatePassword,
    authPath: SIGN_IN,
    routeAccess: true
  },
  {
    path: FORGOT_PASSWORD,
    role: [],
    layout: Minimal,
    component: ForgotPassword,
    authPath: SIGN_IN,
    routeAccess: true
  },
  {
    path: SIGN_IN,
    role: [],
    layout: Minimal,
    component: SignInView,
    authPath: SIGN_IN,
    routeAccess: true
  },
];
