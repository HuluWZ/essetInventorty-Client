import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup, MenuItem } from "@mui/material";


const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    paymentMethod: Yup.string().required("Payment Method is required"),
});


type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleUpdate: (values: any) => void;
    selectedCustomer: any;
    setCustomer: any;
}



const FormDialog = (props: FormDialogProps) => {
    const { open, handleClose, handleAdd, handleUpdate, selectedCustomer, setCustomer } = props;

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {selectedCustomer ? "Update Customer" : "Add Customer"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        id: selectedCustomer?.id || "",
                        fullName: selectedCustomer?.fullName || "",
                        phoneNumber: selectedCustomer?.phoneNumber || "",
                        email: selectedCustomer?.email || "",
                        address: selectedCustomer?.address || "",
                        city: selectedCustomer?.city || "",
                        paymentMethod: selectedCustomer?.paymentMethod || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (selectedCustomer) {
                            handleUpdate(values);
                        } else {
                            handleAdd(values);
                        }
                        setSubmitting(false);
                        handleClose();
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
                        /* and other goodies */
                    }: any) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="fullName"
                                name="fullName"
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
                            <TextField
                                margin="dense"
                                id="phoneNumber"
                                name="phoneNumber"
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
                            <TextField
                                margin="dense"
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                margin="dense"
                                id="address"
                                name="address"
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
                            <TextField
                                margin="dense"
                                id="city"
                                name="city"
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
                            {/* paymentMethod will be a dropdown  */}
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
                            <DialogActions>
                                <ButtonGroup>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                        {selectedCustomer ? "Update" : "Add"}
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
