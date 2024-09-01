const DropDown = ({
  selectedOption,
  handleChange,
}: {
  selectedOption: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      {["supervisor", "head-supervisor", "office staff"].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export { DropDown };
