import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { ButtonGroup, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import TextareaAutosize from '@mui/base/TextareaAutosize';


type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleEdit: (values: any) => void;
    selectedCategory?: any;
    setSelectedCategory?: any;
};


const FormDialog = ({
    open,
    handleClose,
    handleAdd,
    handleEdit,
    selectedCategory,
    setSelectedCategory,
}: FormDialogProps) => {
    const initialValues = {
        id: selectedCategory ? selectedCategory.id : "",
        name: selectedCategory ? selectedCategory.name : "",
        description: selectedCategory ? selectedCategory.description : "",
        image: selectedCategory ? selectedCategory.image : "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        image: Yup.mixed().required("Required"),
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" sx={{
            }}>
                {selectedCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "1rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (selectedCategory) {
                            handleEdit(values);
                            setSelectedCategory(null);
                        } else {
                            handleAdd(values);
                        }
                        resetForm();
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
                        setFieldValue,
                    }: any) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
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
                                sx={{
                                    marginBottom:2
                                }}
                            />
                            <TextField
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
                                sx={{
                                    marginBottom:4
                                }}
                            />
                            <TextField
                                id="image"
                                label="Image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={(event: any) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}
                                error={Boolean(touched.image && errors.image)}
                                helperText={touched.image && errors.image}
                                sx={{
                                    marginBottom:4
                                }}
                              
                            />
                            <DialogActions>
                                <ButtonGroup>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <ThreeDots
                                                color="#fff"
                                                height={20}
                                                width={20}
                                            />
                                        ) : selectedCategory ? (
                                            "Edit"
                                        ) : (
                                            "Add"
                                        )}
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