
const holidays = [
  { sn: 1, occasion: "Nepali New Year", nepaliDate: "01 Baisakh, 2081", englishDate: "13th April, 2024", day: "Saturday" },
  { sn: 2, occasion: "International Worker’s Day", nepaliDate: "19 Baisakh, 2081", englishDate: "1st May, 2024", day: "Wednesday" },
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
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">List of Holidays 2081</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">S.N</th>
              <th className="border border-gray-300 px-4 py-2">Occasion</th>
              <th className="border border-gray-300 px-4 py-2">Nepali Date</th>
              <th className="border border-gray-300 px-4 py-2">English Date</th>
              <th className="border border-gray-300 px-4 py-2">Day</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{holiday.sn}</td>
                <td className="border border-gray-300 px-4 py-2">{holiday.occasion}</td>
                <td className="border border-gray-300 px-4 py-2">{holiday.nepaliDate}</td>
                <td className="border border-gray-300 px-4 py-2">{holiday.englishDate}</td>
                <td className="border border-gray-300 px-4 py-2">{holiday.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HolidayTable;
