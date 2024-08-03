import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { getOrgs } from "../../api/orgApi";


export const OrgContext = createContext({} as any);

export const OrgProvider = ({ children }: any) => {
    const { data, isLoading, isError } = useQuery("org", getOrgs);
    return (
        <OrgContext.Provider value={{ data, isLoading, isError }}>
            {children}
        </OrgContext.Provider>
    );
};

export const useOrg = () => useContext(OrgContext);

