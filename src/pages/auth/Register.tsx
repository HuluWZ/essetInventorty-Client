import React, { useReducer } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import PageView from "../../components/PageView";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { ThreeDots } from "react-loader-spinner";
import { Divider } from "@mui/material";
import { SendSharp } from "@mui/icons-material";


const initialState = {
    loading: false,
    token: null,
    user: null,
    error: null,
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SUCCESS":
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user,
            };
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const Register = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = async (values: any) => {
        dispatch({ type: "REQUEST" });
        try {
            const response = await register(values);
            dispatch({ type: "SUCCESS", payload: response });
            showNotification(response.message, "success");
            // navigate("/login");
        } catch (error: any) {
            dispatch({ type: "ERROR", payload: error });
            showNotification(error.message, "error");
        }
    };

    return (
        <PageView title="Register">
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "95vh",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Formik
                        initialValues={{
                            //userData
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            phoneNumber: "",

                            //orgData
                            orgName: "",
                            orgPhone: "",
                            orgAddress: "",
                            orgEmail: "",
                            tinNumber: "",
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().required("First Name is required"),
                            lastName: Yup.string().required("Last Name is required"),
                            email: Yup.string()
                                .email("Email is invalid")
                                .required("Email is required"),
                            password: Yup.string()
                                .min(6, "Password must be at least 6 characters")
                                .required("Password is required"),
                            phoneNumber: Yup.string().required("Phone Number is required"),

                            orgName: Yup.string().required("Organization Name is required"),
                            orgPhone: Yup.string().required(
                                "Organization Phone Number is required"
                            ),
                            orgAddress: Yup.string().required(
                                "Organization Address is required"
                            ),
                            orgEmail: Yup.string()
                                .email("Organization Email is invalid")
                                .required("Organization Email is required"),
                            tinNumber: Yup.string().required(
                                "Organization TIN Number is required"
                            ),
                        })}
                        onSubmit={(values, { resetForm }) => {
                            const signUpData = {
                                userData: {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    password: values.password,
                                    phoneNumber: values.phoneNumber,
                                },
                                orgData: {
                                    name: values.orgName,
                                    phoneNumber: values.orgPhone,
                                    address: values.orgAddress,
                                    orgEmail: values.orgEmail,
                                    tinNumber: values.tinNumber,
                                },
                            };
                            handleSubmit(signUpData);
                            resetForm();

                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <>
                                <form onSubmit={handleSubmit} noValidate>
                                    <Box display="flex">
                                        <Box p={2}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography variant="h5" gutterBottom>
                                                    User Details
                                                </Typography>
                                                <Divider sx={{ mb: 2 }} />
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        autoComplete="fname"
                                                        name="firstName"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        autoFocus
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.firstName && errors.firstName)}
                                                        helperText={touched.firstName && errors.firstName}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} lg={6} xl={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        autoComplete="lastName"
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.lastName && errors.lastName)}
                                                        helperText={touched.lastName && errors.lastName}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.email && errors.email)}
                                                        helperText={touched.email && errors.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="phoneNumber"
                                                        label="Phone Number"
                                                        type="text"
                                                        id="phoneNumber"
                                                        autoComplete="phone-number"
                                                        value={values.phoneNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(
                                                            touched.phoneNumber && errors.phoneNumber
                                                        )}
                                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="current-password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.password && errors.password)}
                                                        helperText={touched.password && errors.password}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </Box>
                                        <Box flexGrow={1} mb={2} style={{ marginBottom: "auto" }} />
                                        <Divider orientation="vertical" />
                                        <Box p={2}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12}>
                                                    <Typography variant="h5" gutterBottom style={{ marginTop: "0px" }}>
                                                        User account Info.
                                                    </Typography>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="orgName"
                                                        label="Organization Name"
                                                        type="text"
                                                        id="orgName"
                                                        autoComplete="org-name"
                                                        value={values.orgName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.orgName && errors.orgName)}
                                                        helperText={touched.orgName && errors.orgName}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="orgPhone"
                                                        label="Organization Phone Number"
                                                        type="text"
                                                        id="orgPhone"
                                                        autoComplete="org-phone"
                                                        value={values.orgPhone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.orgPhone && errors.orgPhone)}
                                                        helperText={touched.orgPhone && errors.orgPhone}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="orgAddress"
                                                        label="Organization Address"
                                                        type="text"
                                                        id="orgAddress"
                                                        autoComplete="org-address"
                                                        value={values.orgAddress}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.orgAddress && errors.orgAddress)}
                                                        helperText={touched.orgAddress && errors.orgAddress}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="orgEmail"
                                                        label="Organization Email"
                                                        type="text"
                                                        id="orgEmail"
                                                        autoComplete="org-email"
                                                        value={values.orgEmail}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(touched.orgEmail && errors.orgEmail)}
                                                        helperText={touched.orgEmail && errors.orgEmail}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="tinNumber"
                                                        label="TIN Number"
                                                        type="text"
                                                        id="tinNumber"
                                                        autoComplete="tin-number"
                                                        value={values.tinNumber}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={Boolean(
                                                            touched.tinNumber && errors.tinNumber
                                                        )}
                                                        helperText={touched.tinNumber && errors.tinNumber}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 3,
                                        mb: 2,
                                    }}>

                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            {
                                                state.loading ?
                                                    <ThreeDots
                                                        height="20"
                                                        width="30"
                                                        radius="9"
                                                        color="#fff"
                                                        ariaLabel="three-dots-loading"
                                                        wrapperStyle={{}}
                                                        visible={true} />
                                                    :
                                                    "Sign Up"
                                            }
                                        </Button>


                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <Link to="/auth/login">
                                            {"Already have an account? Sign in"}
                                        </Link>
                                    </Box>
                                </form>
                            </>
                        )}
                    </Formik>
                </Box>
            </Container>
        </PageView>
    );
};

export default Register;
