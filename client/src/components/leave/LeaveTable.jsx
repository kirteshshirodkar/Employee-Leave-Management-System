import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import { useState } from "react";
import DocumentPreviewModal from "./DocumentPreviewModal";
import LeaveTableRow from "./LeaveTableRow";

const LeaveTable = ({
  leaves = [],
  loading = false,
  error = "",
  showHeader = true,
  showViewAll = true,
  showDocument = false,
  maxRows,
  emptyTitle,
  emptyDescription,
  onApplyLeave,
}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const displayedLeaves = maxRows
    ? leaves.slice(0, maxRows)
    : leaves;

  // Loading state
  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-center text-slate-500">
          Loading leave history...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
        <p className="text-center text-red-500">
          {error}
        </p>
      </section>
    );
  }

  // Empty state
  if (displayedLeaves.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onButtonClick={onApplyLeave}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {showHeader && (
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <h2 className="text-2xl font-semibold text-slate-800">
            Leave History
          </h2>

          {showViewAll && (
            <Link
              to="/leave-history"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-50
                px-4
                py-2
                text-sm
                font-medium
                text-blue-600
                transition-all
                duration-200
                hover:bg-blue-100
              "
            >
              View All
              <ArrowRight size={18} />
            </Link>
          )}

        </div>
      )}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm font-semibold text-slate-500">

              <th className="px-6 py-4">
                Leave Dates
              </th>

              <th className="px-6 py-4">
                Reason
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Manager's Remarks
              </th>

              {showDocument && (
                <th className="px-6 py-4">
                  Document
                </th>
              )}

              <th className="px-6 py-4">
                Applied On
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {displayedLeaves.map((leave) => (
              <LeaveTableRow
                key={leave.id}
                leave={leave}
                showDocument={showDocument}
                onViewDocument={(document) =>
                  setSelectedDocument(document)
                }
              />
            ))}

          </tbody>

        </table>

      </div>

      <DocumentPreviewModal
        isOpen={!!selectedDocument}
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

    </section>
  );
};

export default LeaveTable;