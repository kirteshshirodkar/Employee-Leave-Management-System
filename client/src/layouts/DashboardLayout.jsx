import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-50">

            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">

                <Navbar />

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>

            </main>

        </div>
    );
};

export default DashboardLayout;