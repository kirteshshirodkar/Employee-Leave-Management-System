import ManagerLayout from "../../layouts/ManagerLayout";

const ManagerDashboard = () => {
    return (
        <ManagerLayout>
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Manager Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                    Welcome to your manager portal.
                </p>
            </div>
        </ManagerLayout>
    );
};

export default ManagerDashboard;