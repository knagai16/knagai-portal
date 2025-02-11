const hobbies = [
  "ONE PIECE",
  "ビーチバレー",
  "野球観戦",
  "お酒",
  "Netflix",
  "旅行",
  "読書",
  "FinTech",
  "ヘルスケア",
  "教育",
  "スタートアップ",
];

const Hobies = () => (
  <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      趣味・興味
    </h2>
    <div className="mt-2">
      {hobbies.map((hobby, index) => (
        <span
          key={index}
          className="inline-block bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-200 text-sm px-3 py-1 rounded-full mr-2 mb-2"
        >
          {hobby}
        </span>
      ))}
    </div>
  </div>
);

export default Hobies;
