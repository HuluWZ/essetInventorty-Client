import { useEffect, useState } from "react";
import TotalItem from "./TotalItemCard";
import TotalOrder from "./TotalOrderCard";
import TotalIncome from "./TotalIncome";
import TotalCustomer from "./TotalCustomer";
import RecentOrder from "./ResentOrder";
import { Container, Grid, Typography } from "@mui/material";
import Page from "../../components/Page";
import IncomeAreaChart from "./IncomeAreaChart";
import { useProduct } from "../../hooks/useProduct";
import { useOrder } from "../../hooks/useOrder";
import { useCustomer } from "../../hooks/useCustomer";
import { useSales } from "../../hooks/useSales";
import PageView from "../../components/PageView";
import LoadingComponent from "../../components/LoadingComponent";


const Dashboard = () => {
  const gridSpacing: number = 3;
  const { products } = useProduct();
  const { orders } = useOrder();
  const { customers } = useCustomer();
  const { report, reportByWeek, isLoading } = useSales();


  // console.log(orders);

  var totalSalesMoneyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  }).format(report?.TotalSales ?? 0);


  if (isLoading) {
    <PageView title="Dashboard">
      <LoadingComponent />
    </PageView>
  }

  if (!products || !orders || !customers || !report || !reportByWeek) {
    <PageView title="Dashboard">
      <LoadingComponent />
    </PageView>
  }



  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dashboard
        </Typography>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TotalItem totalItem={products?.product?.length || 0} />
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <TotalOrder totalOrder={orders?.Orders?.length || 0} />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Grid container spacing={1.5}>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalIncome totalSales={totalSalesMoneyFormat || 0} />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6} lg={12}>
                    <TotalCustomer totalCustomer={customers?.customer?.length || 0} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={8}>
                <IncomeAreaChart reportByWeek={reportByWeek?.weeklySalesReport || []} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <RecentOrder orders={orders?.Orders || []} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
