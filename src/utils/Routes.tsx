// import react-router-dom components
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// import layout components
import MainLayout from '../pages/layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import NotFound from '../components/404';

// import pages
import SignIn from '../pages/auth/Login';
import SignUp from '../pages/auth/Register';

import Dashboard from '../pages/dashboard';
import DashboardContent from '../pages/layout/DashboardLayout/Dashboard';

import CustomerList from '../pages/customers';

import CategoriesList from '../pages/categories';

import ProductList from '../pages/products';
import ProductsDetail from '../pages/products/ProductDetail';

import DiscountList from '../pages/discounts';

import OrderList from '../pages/orders';
import OrderDetail from '../pages/orders/OrderDetail';

import SaleList from '../pages/sales';
import SalesDetail from '../pages/sales/SalesDetail';

import ReportList from '../pages/report';
import OrderReport from '../pages/report/OrderReport';
import SalesReport from '../pages/report/SalesReport';
import StokeAlert from '../pages/report/StokeAlert';

import Settings from '../pages/settings';

import Profile from '../pages/profile';


const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/auth" element={<MainLayout />}>
                <Route path="login" element={<SignIn />} />
                <Route path="register" element={<SignUp />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/app/dashboard" />} />
                <Route path="app" element={<DashboardContent />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="categories" element={<CategoriesList />} />
                    <Route path="customers" element={<CustomerList />} />
                    <Route path="sales" element={<Outlet />}>
                        <Route index element={<SaleList />} />
                        <Route path=":id" element={<SalesDetail />} />
                    </Route>
                    <Route path="products" element={<Outlet />}>
                        <Route index element={<ProductList />} />
                        <Route path=":id" element={<ProductsDetail />} />
                    </Route>
                    <Route path="discounts" element={<DiscountList />} />
                    <Route path="orders" element={<Outlet />}>
                        <Route index element={<OrderList />} />
                        <Route path=":id" element={<OrderDetail />} />
                    </Route>
                    <Route path="reports" element={<Outlet />}>
                        <Route index element={<ReportList />} />
                        <Route path="order" element={<OrderReport />} />
                        <Route path="sales" element={<SalesReport />} />
                        <Route path="stoke" element={<StokeAlert />} />
                    </Route>
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};


export default RoutesComponent;