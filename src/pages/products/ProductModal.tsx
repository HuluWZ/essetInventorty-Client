import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { ButtonGroup, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useCategory } from "../../hooks/useCategory";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";

type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleEdit: (values: any) => void;
    selectedProduct?: any;
    setSelectedProduct?: any;
};

const FormDialog = ({
    open,
    handleClose,
    handleAdd,
    handleEdit,
    selectedProduct,
    setSelectedProduct,
}: FormDialogProps) => {
    const { categories } = useCategory();
    const initialValues = {
        id: selectedProduct ? selectedProduct.id : "",
        name: selectedProduct ? selectedProduct.name : "",
        category: selectedProduct ? selectedProduct.category._id : "",
        description: selectedProduct ? selectedProduct.description : "",
        image: selectedProduct ? selectedProduct.image : "",
        model: selectedProduct ? selectedProduct.model : "",
        colors: selectedProduct ? selectedProduct.colors : "",
        sizes: selectedProduct ? selectedProduct.sizes : "",
        initialQuantity: selectedProduct ? selectedProduct.initialQuantity : "",
        stockAlert: selectedProduct ? selectedProduct.stockAlert : "",
        storeLocation: selectedProduct ? selectedProduct.storeLocation : "",
        buyingPrice: selectedProduct ? selectedProduct.buyingPrice : "",
        sellingPrice: selectedProduct ? selectedProduct.sellingPrice : "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("product name is required"),
        category: Yup.string().required("category is required"),
        description: Yup.string().required("description is required"),
        image: Yup.mixed().required("image is required"),
        model: Yup.string().required("model is required"),
        colors: Yup.string().required("colors is required"),
        sizes: Yup.string().required("sizes is required"),
        initialQuantity: Yup.number().required("initial quantity is required"),
        stockAlert: Yup.number().required("stock alert is required"),
        storeLocation: Yup.string().required("store location is required"),
        buyingPrice: Yup.number().required("buying price is required"),
        sellingPrice: Yup.number().required("selling price is required"),
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                id="form-dialog-title"
            >
                {selectedProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "1rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (selectedProduct) {
                            setSubmitting(true);
                            handleEdit({
                                ...values,
                                colors: values.colors.split(","),
                                sizes: values.sizes.split(","),
                            });
                            setSelectedProduct(null);
                            setSubmitting(false);
                            resetForm();
                            handleClose();
                        } else {
                            setSubmitting(true);
                            handleAdd({
                                ...values,
                                colors: values.colors.split(","),
                                sizes: values.sizes.split(","),
                            });
                            setSelectedProduct(null);
                            setSubmitting(false);
                            resetForm();
                            handleClose();
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
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        id="name"
                                        label="Product Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category">Category</InputLabel>
                                        <Select
                                            labelId="category"
                                            id="category"
                                            variant="standard"
                                            label="Category"
                                            value={values.category ? values.category : ""}
                                            onChange={
                                                (event: any) =>
                                                    setFieldValue("category", event.target.value)
                                            }
                                            onBlur={handleBlur}
                                            error={touched.category && Boolean(errors.category)}
                                        >
                                            {categories.category.map((item: any) => (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.category && errors.category && (
                                            <FormHelperText error>{errors.category}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
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
                                        minRows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="image"
                                        label="Image"
                                        type="file"
                                        fullWidth
                                        variant="standard"
                                        onChange={(event: any) => {
                                            setFieldValue("image", event.target.files[0]);
                                        }}
                                        onBlur={handleBlur}
                                        error={touched.image && Boolean(errors.image)}
                                        helperText={touched.image && errors.image}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="model"
                                        label="Model"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        variant="standard"
                                        value={values.model}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.model && Boolean(errors.model)}
                                        helperText={touched.model && errors.model}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="colors"
                                        label="Colors"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.colors}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.colors && Boolean(errors.colors)}
                                        helperText={touched.colors && errors.colors}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="sizes"
                                        label="Sizes"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.sizes}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.sizes && Boolean(errors.sizes)}
                                        helperText={touched.sizes && errors.sizes}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="initialQuantity"
                                        label="Initial Quantity"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={values.initialQuantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.initialQuantity && Boolean(errors.initialQuantity)
                                        }
                                        helperText={
                                            touched.initialQuantity && errors.initialQuantity
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="stockAlert"
                                        label="Stock Alert"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={values.stockAlert}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.stockAlert && Boolean(errors.stockAlert)}
                                        helperText={touched.stockAlert && errors.stockAlert}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="buyingPrice"
                                        label="Buying Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={values.buyingPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.buyingPrice && Boolean(errors.buyingPrice)}
                                        helperText={touched.buyingPrice && errors.buyingPrice}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="sellingPrice"
                                        label="Selling Price"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        value={values.sellingPrice}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.sellingPrice && Boolean(errors.sellingPrice)}
                                        helperText={touched.sellingPrice && errors.sellingPrice}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="storeLocation"
                                        label="Store Location"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.storeLocation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.storeLocation && Boolean(errors.storeLocation)
                                        }
                                        helperText={touched.storeLocation && errors.storeLocation}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <DialogActions>
                                        <ButtonGroup>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                            >
                                                {isSubmitting ? (
                                                    <ThreeDots color="#fff" height={20} width={20} />
                                                ) : selectedProduct ? (
                                                    "Update"
                                                ) : (
                                                    "Add"
                                                )}
                                            </Button>
                                        </ButtonGroup>
                                    </DialogActions>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;
