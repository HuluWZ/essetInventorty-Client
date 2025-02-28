import { useSales } from '../../hooks/useSales'
import { useState } from 'react'
import PageView from '../../components/PageView'
import LoadingComponent from '../../components/LoadingComponent'
import { AddCircleRounded } from '@mui/icons-material'
import ConfirmModal from '../../components/ConfirmModal'
import { Alert } from '@mui/material'
import FormDialog from './SalesModal'
import SalesView from './SalesList'

const Sales = () => {
    const { sales, isLoading, error, deleteSaleMutation, createSaleMutation, updateSaleMutation } = useSales();
    const [selectedSales, setSelectedSales] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    
    if (isLoading) return (
        <PageView
            title="Sales"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Sales",
                    handler: () => {
                        setOpen(true)
                        setSelectedSales(null)
                    },
                    otherProps: {
                        sx: {
                            ml: "auto",
                            fontSize: "10px",
                        },
                        variant: "contained",
                    },
                },
            ]}
        >
            <LoadingComponent />
        </PageView>
    )

    if (error) return (
        <PageView
            title="Sales"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Sales",
                    handler: () => {
                        setOpen(true)
                        setSelectedSales(null)
                    },
                    otherProps: {
                        sx: {
                            ml: "auto",
                            fontSize: "10px",
                        },
                        variant: "contained",
                    },
                },
            ]}
        >
            <Alert severity="error">{error.message}</Alert>
        </PageView>
    )

    return (
        <PageView
            title="Sales"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Sales",
                    handler: () => {
                        setOpen(true)
                        setSelectedSales(null)
                    },
                    otherProps: {
                        sx: {
                            ml: "auto",
                            fontSize: "10px",
                        },
                        variant: "contained",
                    },
                },
            ]}
        >
            <ConfirmModal
                open={openConfirm}
                handleClose={() => setOpenConfirm(false)}
                handleConfirm={() => {
                    deleteSaleMutation(selectedSales.id)
                    setOpenConfirm(false)
                }}
                title="Delete Sales"
                description="Are you sure you want to delete this sales?"
                confirmText="Delete"
                cancelText="Cancel"
            />

            <FormDialog
                open={open}
                selectedSales={selectedSales}
                setSelectedSales={setSelectedSales}
                handleAdd={createSaleMutation}
                handleUpdate={updateSaleMutation}
                handleClose={() => setOpen(false)}
            />


            <SalesView
                sales={sales}
                setOpen={setOpen}
                setSelectedSales={setSelectedSales}
                setOpenConfirm={setOpenConfirm}
            />
        </PageView>
    )
}


export default Sales