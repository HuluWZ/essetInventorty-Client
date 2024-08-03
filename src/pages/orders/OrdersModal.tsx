import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import { useProduct } from "../../hooks/useProduct";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  description: Yup.string().required("Description is required"),
  orderDate: Yup.string().required("Order date is required"),
  items: Yup.array().required("Items is required"),
});

type FormDialogProps = {
  order: any;
  open: boolean;
  handleClose: () => void;
  handleAdd: (values: any) => void;
  handleEdit: (values: any) => void;
  selectedOrder?: any;
  setSelectedOrder?: any;
};

const FormDialog = ({
  open,
  handleClose,
  handleAdd,
  handleEdit,
  selectedOrder,
  setSelectedOrder,
}: FormDialogProps) => {
  const { products } = useProduct();

  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date()
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {!selectedOrder ? "Add Order" : "Edit Order"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: selectedOrder ? selectedOrder.id : "",
            fullName: selectedOrder ? selectedOrder.fullName : "",
            phoneNumber: selectedOrder ? selectedOrder.phoneNumber : "",
            address: selectedOrder ? selectedOrder.address : "",
            email: selectedOrder ? selectedOrder.email : "",
            city: selectedOrder ? selectedOrder.city : "",
            description: selectedOrder ? selectedOrder.description : "",
            orderDate: selectedOrder ? selectedOrder.orderDate : "",
            paymentMethod: selectedOrder ? selectedOrder.paymentMethod : "",
            items: selectedOrder
              ? selectedOrder.items
              : [
                {
                  product: "",
                  quantity: 0,
                },
              ],
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting , resetForm}) => {
            if (selectedOrder) {
              handleEdit(values);
              resetForm();
              handleClose();
            } else {
              handleAdd(values);
              resetForm();
              handleClose();
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }: any) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    id="paymentMethod"
                    name="paymentMethod"
                    label="Payment Method"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.paymentMethod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.paymentMethod && Boolean(errors.paymentMethod)}
                    helperText={touched.paymentMethod && errors.paymentMethod}
                    select
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Credit">Credit</MenuItem>
                    <MenuItem value="Check">Check</MenuItem>
                    <MenuItem value="Transfer">Transfer</MenuItem>
                    <MenuItem value="TeleBirr">TeleBirr</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <div>
                        {values.items.map((item: any, index: any) => (
                          <div key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Product
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={item.product}
                                    onChange={(e: any) => {
                                      arrayHelpers.replace(index, {
                                        ...item,
                                        product: e.target.value,
                                      });
                                    }}
                                  >
                                    {products?.product?.map((product: any) => (
                                      <MenuItem
                                        key={product._id}
                                        value={product._id}
                                      >
                                        {product.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormHelperText error>
                                  {touched.items &&
                                    touched.items[index] &&
                                    touched.items[index].product &&
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].product}
                                </FormHelperText>

                                <TextField
                                  margin="dense"
                                  id="quantity"
                                  label="Quantity"
                                  type="number"
                                  fullWidth
                                  variant="standard"
                                  value={item.quantity}
                                  onChange={(e: any) => {
                                    arrayHelpers.replace(index, {
                                      ...item,
                                      quantity: e.target.value,
                                    });
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                        <Button
                          color="primary"
                          onClick={() =>
                            arrayHelpers.push({
                              product: "",
                              quantity: 0,
                            })
                          }
                          sx={{
                            mt: 2,
                            mb: 2,
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "primary.contrastText",
                            },
                          }}
                        >
                          Add Item +
                        </Button>
                      </div>
                    )}
                  />
                </Grid>
                <Grid item lg={12} xs={6}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Order Date"
                      value={selectedDate}
                      onChange={(newValue) => {
                        handleDateChange(newValue);
                        setFieldValue("orderDate", newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <DialogActions>
                <ButtonGroup>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {selectedOrder ? "Update" : "Create"}
                  </Button>
                </ButtonGroup>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
