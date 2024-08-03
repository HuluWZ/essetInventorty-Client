import { createContext, useContext } from 'react';
import { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from '../../api/customerApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '../useNotification';

export const CustomerContext = createContext({} as any);


export const CustomerProvider = ({ children }: any) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification();

    const { data: customers, isLoading: customersLoading, isError, error } = useQuery('customers', getCustomers);

    const { mutate: createCustomerMutation, isLoading: createCustomerLoading } = useMutation(createCustomer, {
        onSuccess: () => {
            showNotification('Create customer successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }

    });

    const { mutate: updateCustomerMutation, isLoading: updateCustomerLoading } = useMutation((data: any) => updateCustomer(data.id, data), {
        onSuccess: () => {
            showNotification('Update customer successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }
    });

    const { mutate: deleteCustomerMutation, isLoading: deleteCustomerLoading } = useMutation(deleteCustomer, {
        onSuccess: () => {
            showNotification('Delete customer successfully', 'success');
            queryClient.invalidateQueries('customers');
        },

        onError: (error: any) => {
            showNotification(error.message, 'error');
        }
    });

    return (
        <CustomerContext.Provider
            value={{
                customers,
                customersLoading,
                isError,
                createCustomerMutation,
                createCustomerLoading,
                updateCustomerMutation,
                updateCustomerLoading,
                deleteCustomerMutation,
                deleteCustomerLoading,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};


export const useCustomer = () => useContext(CustomerContext);
