import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getStock } from "../../api/productApi";
import { useNotification } from '../useNotification';
import { useParams } from 'react-router-dom';

export const ProductContext = createContext({} as any);



export const ProductProvider = ({ children }: any) => {

    const queryClient = useQueryClient();
    
    const { showNotification } = useNotification()

    const { data: products, isLoading, error } = useQuery('products', getProducts);

    const { data: stock, isLoading: stockLoading, error: stockError } = useQuery('stock', getStock);

    const { mutate: createProductMutation } = useMutation(createProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            showNotification('Product created successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message, 'error')
        }

    });

    const { mutate: updateProductMutation } =
        useMutation((data: any) => updateProduct(data.id, data), {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
                showNotification('Product updated successfully', 'success')
            },

            onError: (error: any) => {
                showNotification(error.message.response.data.message, 'error')
            }
        });


    const { mutate: deleteProductMutation } = useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            showNotification('Product deleted successfully', 'success')
        },

        onError: (error: any) => {
            showNotification(error.message.response.data.message, 'error')
        }
    });



    const value = {
        products,
        stock,
        stockLoading,
        stockError,
        isLoading,
        error,
        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => useContext(ProductContext);




