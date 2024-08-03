import PageView from "../../components/PageView";
import { styled } from "@mui/system";
import { useQuery } from "react-query";
import { Divider, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { getSalesDetails } from "../../api/salesApi";
import moment from "moment";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const SalesDetail = () => {
  const { id }: any = useParams();
  const { data: sales, isLoading } = useQuery(
    ["salesdetail", id],
    () => getSalesDetails(id),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    <PageView title="Sales Detail">
      <LoadingComponent />
    </PageView>;
  }

  if (!sales) {
    return (
      <PageView title="Loading . . .">
        <LoadingComponent />
      </PageView>
    );
  }
  return (
    <PageView title="Sales Detail" backPath="/sales">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
              variant="outlined"
            >
              <Typography variant="h4" gutterBottom component="div">
                Sales Detail
              </Typography>
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Sales ID
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {sales && sales[0]?._id.substring(0, 5)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Sales Date
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {moment(sales?.salesDate).format("DD do MMM YYYY")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="h2" gutterBottom component="div">
                    Sales Total
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {sales &&
                      sales[0]?.items
                        ?.map(
                          (item: any) =>
                            item.product.sellingPrice * item.quantity
                        )
                        .reduce((a: any, b: any) => a + b, 0)
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
              variant="outlined"
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="h4" gutterBottom component="div">
                    Customer Detail
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Customer Name
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {sales && sales[0]?.customer?.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Customer Phone
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {sales && sales[0]?.customer?.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Customer Address
                  </Typography>

                  <Typography variant="body2" gutterBottom component="div">
                    {sales && sales[0]?.customer?.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Customer Email
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {sales && sales[0]?.customer?.email}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
              variant="outlined"
            >
              <Typography variant="h4" gutterBottom component="div">
                Sales Items
              </Typography>
              <Timeline>
                {sales &&
                  sales[0]?.items?.map((item: any) => (
                    <TimelineItem key={item._id}>
                      <TimelineOppositeContent sx={{ m: "auto 0" }}>
                        <Typography variant="body2" color="text.secondary">
                          {moment(item.createdAt).format("DD do MMM YYYY")}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          color={item.product.quantity > 0 ? "success" : "info"}
                        />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper sx={{ p: 2 }} variant="outlined">
                          <Typography variant="h6" component="span">
                            {item.product.name}
                          </Typography>
                          <Typography>Quantity: {item.quantity}</Typography>
                          <Typography>
                            Price: {item.product.sellingPrice}
                          </Typography>
                          <Typography>
                            Amount: {item.product.sellingPrice * item.quantity}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
              </Timeline>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </PageView>
  );
};

export default SalesDetail;
