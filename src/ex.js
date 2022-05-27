import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import ExternalPay from './pages/ExternalPay';

import RegisterForm  from './components/paiment/PayForm';
import Counter from './components/paiment/Counter';
import Services from './pages/Services';
// ----------------------------------------------------------------------
/* Services */
import Business from './pages/Business';
import RegisterBusiness  from './components/_dashboard/business/RegisterBusiness';
import RegisterServiceForm  from './components/_dashboard/services/RegisterForm';
import ServiceList  from './components/_dashboard/services/ServiceList';
import Paiement  from './components/_dashboard/services/Paiement';
import PaiementList  from './components/_dashboard/services/PaiementList';
import Service  from './components/_dashboard/services/Service';
import ServiceHome  from './components/_dashboard/services/ServiceHome';
import OutMoneyList  from './components/_dashboard/services/OutMoneyList';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'business', element: <Business />,
          children: [
            { path: 'services', element: <Services />,
              children: [
                { path: '', element: <ServiceList /> },
                { path: 'register', element: <RegisterServiceForm /> },
                { path: ':serviceId', element: <Service />,
                  children: [
                    { path: '', element: <ServiceHome /> },
                    { path: 'reports', element: <Paiement />,
                    children: [
                      { path: '', element: <PaiementList /> },
                      { path: 'outmoney_list', element: <OutMoneyList /> },
                    ]
                    },
                  ]
                },
                { path: 'blog', element: <Blog /> }
              ]
            },
            { path: 'register', element: <RegisterBusiness /> },
            { path: 'home', element: <Service />,
              children: [
                { path: '', element: <ServiceHome /> },
                { path: 'reports', element: <Paiement />,
                children: [
                  { path: '', element: <PaiementList /> },
                  { path: 'outmoney_list', element: <OutMoneyList /> },
                ]
                },
              ]
            },
            { path: 'blog', element: <Blog /> }
          ]
        },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'external_pay/:productId/:amount', element: <ExternalPay />, 
            children: [
              { path: '', element: <RegisterForm /> },
              { path: 'waiting', element: <Counter /> },
              { path: '*', element: <Navigate to="/404" /> }
        ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
