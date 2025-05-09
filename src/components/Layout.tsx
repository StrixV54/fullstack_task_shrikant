import React, { type ReactNode } from "react";
import { Toaster } from "sonner";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex w-screen min-h-screen items-center justify-center text-black m-auto p-4">
            <Toaster position="top-center" theme="light" />
            {children}
        </div>
    );
};

export default Layout;
