import { Calendar } from "lucide-react";
import { holidays } from "./holidayData";

const Holidays = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">
          Holidays ({holidays.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S.N</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Occasion</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nepali Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">English Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Day</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.sn} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{holiday.sn}</td>
                <td className="px-4 py-3 text-sm font-medium">{holiday.occasion}</td>
                <td className="px-4 py-3 text-sm">{holiday.nepaliDate}</td>
                <td className="px-4 py-3 text-sm">{holiday.englishDate}</td>
                <td className={`px-4 py-3 text-sm ${
                  holiday.day === "Saturday" ? "text-red-500" : "text-blue-500"
                }`}>
                  {holiday.day}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
