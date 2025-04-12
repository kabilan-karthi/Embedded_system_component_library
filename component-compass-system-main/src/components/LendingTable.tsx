
import { LendingRecord } from "@/lib/types";
import { formatDate } from "@/lib/mockData";

interface LendingTableProps {
  lendings: LendingRecord[];
  showRollNumber?: boolean;
  selectable?: boolean;
  onSelect?: (lendingId: string, selected: boolean) => void;
  selectedIds?: string[];
}

const LendingTable = ({
  lendings,
  showRollNumber = false,
  selectable = false,
  onSelect,
  selectedIds = []
}: LendingTableProps) => {
  if (!lendings.length) {
    return <div className="text-center py-8 text-muted-foreground">No lending records found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    onChange={(e) => {
                      if (onSelect) {
                        lendings.forEach((lending) => {
                          onSelect(lending.id, e.target.checked);
                        });
                      }
                    }}
                    checked={selectedIds.length === lendings.length && lendings.length > 0}
                  />
                  <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                </div>
              </th>
            )}
            {showRollNumber && <th scope="col" className="px-6 py-3">Roll Number</th>}
            <th scope="col" className="px-6 py-3">Component</th>
            <th scope="col" className="px-6 py-3">Quantity</th>
            <th scope="col" className="px-6 py-3">Borrowed On</th>
            <th scope="col" className="px-6 py-3">Returned On</th>
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {lendings.map((lending) => (
            <tr key={lending.id} className="bg-white border-b hover:bg-gray-50">
              {selectable && (
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${lending.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                      checked={selectedIds.includes(lending.id)}
                      onChange={(e) => {
                        if (onSelect) {
                          onSelect(lending.id, e.target.checked);
                        }
                      }}
                      disabled={lending.returnDate !== null}
                    />
                    <label htmlFor={`checkbox-${lending.id}`} className="sr-only">checkbox</label>
                  </div>
                </td>
              )}
              {showRollNumber && <td className="px-6 py-4">{lending.rollNumber}</td>}
              <td className="px-6 py-4">{lending.componentName}</td>
              <td className="px-6 py-4">{lending.quantity}</td>
              <td className="px-6 py-4">{formatDate(lending.borrowDate)}</td>
              <td className="px-6 py-4">{formatDate(lending.returnDate)}</td>
              <td className="px-6 py-4">
                {lending.returnDate ? (
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                    Returned
                  </span>
                ) : (
                  <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                    Borrowed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LendingTable;
