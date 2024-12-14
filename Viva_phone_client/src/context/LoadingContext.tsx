import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (state: boolean) => void;
}

// Tạo context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Tạo provider để cung cấp context
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook để sử dụng loading state
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
