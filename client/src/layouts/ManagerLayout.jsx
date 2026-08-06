import { useState } from "react";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerNavbar from "../components/manager/ManagerNavbar";
import { useAuth } from "../hooks/useAuth";

const ManagerLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            <ManagerSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={logout}
            />

            <div className="min-h-screen lg:pl-[260px]">

                <ManagerNavbar
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="px-5 py-6 sm:px-7 lg:px-8">
                    <div className="mx-auto w-full max-w-[1500px]">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default ManagerLayout;