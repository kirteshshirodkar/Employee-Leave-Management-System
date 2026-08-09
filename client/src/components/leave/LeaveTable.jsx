import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import EmptyState from "./EmptyState";
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

  // Loading
  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-slate-500 sm:text-base">
            Loading leave history...
          </p>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-center py-10">
          <p className="text-center text-sm text-red-500 sm:text-base">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // Empty
  if (displayedLeaves.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          onApplyLeave={onApplyLeave}
        />
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
        {/* Header */}
        {showHeader && (
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                Leave History
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Your recent leave requests
              </p>
            </div>

            {showViewAll && (
              <Link
                to="/leave-history"
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-50
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-blue-600
                  transition-all
                  duration-200
                  hover:bg-blue-100
                  sm:px-4
                  sm:text-sm
                "
              >
                View All
                <ArrowRight size={16} className="sm:size-[18px]" />
              </Link>
            )}
          </div>
        )}

        {/* ========================= */}
        {/* MOBILE VIEW */}
        {/* ========================= */}

        <div className="divide-y divide-slate-100 md:hidden">
          {displayedLeaves.map((leave) => (
            <LeaveTableRow
              key={leave.id}
              leave={leave}
              showDocument={showDocument}
              mobile
              onViewDocument={(document) =>
                setSelectedDocument(document)
              }
            />
          ))}
        </div>

        {/* ========================= */}
        {/* DESKTOP / TABLET VIEW */}
        {/* ========================= */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="whitespace-nowrap px-5 py-4 lg:px-6">
                  Leave Dates
                </th>

                <th className="whitespace-nowrap px-5 py-4 lg:px-6">
                  Reason
                </th>

                <th className="whitespace-nowrap px-5 py-4 lg:px-6">
                  Status
                </th>

                <th className="whitespace-nowrap px-5 py-4 lg:px-6">
                  Manager's Remarks
                </th>

                {showDocument && (
                  <th className="whitespace-nowrap px-5 py-4 lg:px-6">
                    Document
                  </th>
                )}

                <th className="whitespace-nowrap px-5 py-4 lg:px-6">
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
      </section>

      {/* Document Preview */}
      <DocumentPreviewModal
        isOpen={!!selectedDocument}
        fileUrl={selectedDocument?.url}
        fileName={selectedDocument?.name}
        onClose={() => setSelectedDocument(null)}
      />
    </>
  );
};

export default LeaveTable;