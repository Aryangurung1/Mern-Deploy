import { CalendarDays } from "lucide-react";

const holidays = [
  { sn: 1, occasion: "Nepali New Year", nepaliDate: "01 Baisakh, 2081", englishDate: "13th April, 2024", day: "Saturday" },
  { sn: 2, occasion: "International Worker's Day", nepaliDate: "19 Baisakh, 2081", englishDate: "1st May, 2024", day: "Wednesday" },
  { sn: 3, occasion: "Janai Purnima / Rakshya Bandhan", nepaliDate: "3 Bhadra, 2081", englishDate: "19th August, 2024", day: "Monday" },
  { sn: 4, occasion: "Ghatasthapana", nepaliDate: "17 Ashoj, 2081", englishDate: "3rd October, 2024", day: "Thursday" },
  { sn: 5, occasion: "Phulpati (Dashain)", nepaliDate: "24 Ashoj, 2081", englishDate: "10th October, 2024", day: "Thursday" },
  { sn: 6, occasion: "Maha Astami/Maha Nawami (Dashain)", nepaliDate: "25 Ashoj, 2081", englishDate: "11th October, 2024", day: "Friday" },
  { sn: 7, occasion: "Bijaya Dashami (Dashain)", nepaliDate: "26 Ashoj, 2081", englishDate: "11th October, 2024", day: "Saturday" },
  { sn: 8, occasion: "Ekadashi (Dashain)", nepaliDate: "27 Ashoj, 2081", englishDate: "13th October, 2024", day: "Sunday" },
  { sn: 9, occasion: "Duwadashi (Dashain)", nepaliDate: "28 Ashoj, 2081", englishDate: "14th October, 2024", day: "Monday" },
  { sn: 10, occasion: "Laxmi Puja (Tihar)", nepaliDate: "15 Kartik, 2081", englishDate: "31st October, 2024", day: "Thursday" },
  { sn: 11, occasion: "Gai Puja (Tihar)", nepaliDate: "16 Kartik, 2081", englishDate: "1st November, 2024", day: "Friday" },
  { sn: 12, occasion: "Mha Puja / Gobardhan Puja (Tihar)", nepaliDate: "17 Kartik, 2081", englishDate: "2nd November, 2024", day: "Saturday" },
  { sn: 13, occasion: "Bhai Tika / Kija Puja (Tihar)", nepaliDate: "18 Kartik, 2081", englishDate: "3rd November, 2024", day: "Sunday" },
  { sn: 14, occasion: "Maha Sivaratri", nepaliDate: "14 Falgun, 2081", englishDate: "26th February, 2025", day: "Wednesday" },
  { sn: 15, occasion: "Fagu Purnima", nepaliDate: "29 Falgun, 2081", englishDate: "13th March, 2025", day: "Thursday" }
];

const HolidayTable = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">List of Holidays 2081</h2>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">Total: {holidays.length} Holidays</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">S.N</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Occasion</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nepali Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">English Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Day</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {holidays.map((holiday) => (
              <tr key={holiday.sn} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{holiday.sn}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{holiday.occasion}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{holiday.nepaliDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{holiday.englishDate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    holiday.day === "Saturday"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {holiday.day}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayTable;
