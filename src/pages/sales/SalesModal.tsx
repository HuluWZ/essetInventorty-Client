import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import { useProduct } from "../../hooks/useProduct";
import { useCustomer } from "../../hooks/useCustomer";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    customer: Yup.string().required("Customer is required"),
    description: Yup.string().required("Description is required"),
    items: Yup.array().of(
        Yup.object().shape({
            product: Yup.string().required("Product is required"),
            quantity: Yup.number().required("Quantity is required"),
        })
    ),
    salesDate: Yup.date().required("Sales Date is required"),
});

type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (data: any) => void;
    handleUpdate: (data: any) => void;
    selectedSales: any;
    setSelectedSales: any;
};

const FormDialog = ({
    open,
    handleClose,
    handleAdd,
    handleUpdate,
    selectedSales,
    setSelectedSales,
}: FormDialogProps) => {
    const {
        products,
        isLoading: isLoadingProduct,
        error: errorProduct,
    } = useProduct();
    const {
        customers,
        isLoading: isLoadingCustomer,
        error: errorCustomer,
    } = useCustomer();

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <Formik
                    initialValues={{
                        id: selectedSales?.id || "",
                        name: selectedSales?.name || "",
                        customer: selectedSales?.customer || "",
                        description: selectedSales?.description || "",
                        items: selectedSales?.items || [
                            {
                                product: "",
                                quantity: 0,
                            },
                        ],
                        salesDate: selectedSales?.salesDate || new Date(),
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting , resetForm}) => {
                        setSubmitting(true);
                        if (selectedSales) {
                            handleUpdate(values);
                            resetForm();
                            setSubmitting(false);
                            // handleClose();
                        } else {
                            setSubmitting(true);
                            handleAdd(values);
                            resetForm();
                            setSubmitting(false);
                            // handleClose();
                        }

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
                            <DialogTitle id="form-dialog-title">
                                {selectedSales ? "Update Sales" : "Add Sales"}
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Name"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                            error={Boolean(touched.customer && errors.customer)}
                                        >
                                            <InputLabel id="demo-simple-select-label">
                                                Customer
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={values.customer}
                                                label="Customer"
                                                onChange={(e: SelectChangeEvent) =>
                                                    setFieldValue("customer", e.target.value)
                                                }
                                            >
                                                {customers.customer.map((customer: any) => (
                                                    <MenuItem key={customer._id} value={customer._id}>
                                                        {customer.fullName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>
                                                {touched.customer && errors.customer}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
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
                                            error={Boolean(touched.description && errors.description)}
                                            helperText={touched.description && errors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                label="Sales Date"
                                                value={values.salesDate}
                                                onChange={(newValue) => {
                                                    setFieldValue("salesDate", newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={Boolean(
                                                            touched.salesDate && errors.salesDate
                                                        )}
                                                        helperText={
                                                            touched.salesDate && errors.salesDate
                                                        }
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FieldArray
                                            name="items"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {
                                                        values.items.map((item: any, index: number) => (
                                                            <div key={index}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <FormControl
                                                                            fullWidth
                                                                            variant="standard"
                                                                            error={Boolean(
                                                                                touched.items &&
                                                                                touched.items[index] &&
                                                                                touched.items[index].product &&
                                                                                errors.items &&
                                                                                errors.items[index] &&
                                                                                errors.items[index].product
                                                                            )}
                                                                        >
                                                                            <InputLabel id="demo-simple-select-label">
                                                                                Product
                                                                            </InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={item.product}
                                                                                label="Product"
                                                                                onChange={(e: SelectChangeEvent) =>
                                                                                    setFieldValue(
                                                                                        `items.${index}.product`,
                                                                                        e.target.value
                                                                                    )
                                                                                }
                                                                            >
                                                                                {products.product.map((product: any) => (
                                                                                    <MenuItem
                                                                                        key={product._id}
                                                                                        value={product._id}
                                                                                    >
                                                                                        {product.name}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                            <FormHelperText>
                                                                                {touched.items &&
                                                                                    touched.items[index] &&
                                                                                    touched.items[index].product &&
                                                                                    errors.items &&
                                                                                    errors.items[index] &&
                                                                                    errors.items[index].product}
                                                                            </FormHelperText>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <TextField
                                                                            margin="dense"
                                                                            id="quantity"
                                                                            label="Quantity"
                                                                            type="number"
                                                                            fullWidth
                                                                            variant="standard"
                                                                            value={item.quantity}
                                                                            onChange={(e: any) =>
                                                                                setFieldValue(
                                                                                    `items.${index}.quantity`,
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(
                                                                                touched.items &&
                                                                                touched.items[index] &&
                                                                                touched.items[index].quantity &&
                                                                                errors.items &&
                                                                                errors.items[index] &&
                                                                                errors.items[index].quantity
                                                                            )}
                                                                            helperText={
                                                                                touched.items &&
                                                                                touched.items[index] &&
                                                                                touched.items[index].quantity &&
                                                                                errors.items &&
                                                                                errors.items[index] &&
                                                                                errors.items[index].quantity
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <ButtonGroup>

                                                                    <Button
                                                                        variant="outlined"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        -
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        onClick={() =>
                                                                            arrayHelpers.insert(index, "")
                                                                        }
                                                                    >
                                                                        +
                                                                    </Button>
                                                                </ButtonGroup>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <ButtonGroup>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" variant="contained">
                                            {
                                                isSubmitting ? (
                                                    <CircularProgress size={24} />
                                                ) : (
                                                    selectedSales ? "Update" : "Save"
                                                )
                                                
                                            }
                                        </Button>
                                    </ButtonGroup>
                                </DialogActions>

                            </DialogContent>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default FormDialog;
