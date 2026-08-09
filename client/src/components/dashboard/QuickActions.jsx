import { CalendarPlus2, FileText } from "lucide-react";
import QuickActionCard from "./QuickActionCard";

const QuickActions = ({ onApplyLeave }) => {
  return (
    <section className="mt-6 sm:mt-8">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <QuickActionCard
          title="Apply Leave"
          description="Submit a new leave request in just a few clicks."
          icon={CalendarPlus2}
          onClick={onApplyLeave}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          arrowBg="bg-blue-600"
        />

        <QuickActionCard
          title="View Leave History"
          description="Check the status and details of your previous requests."
          icon={FileText}
          to="/leave-history"
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
          arrowBg="bg-emerald-600"
        />
      </div>
    </section>
  );
};

export default QuickActions;