const Table = ({ T_Name, data, columns, getStatusClass, onRowClick }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">{T_Name}</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="rounded-l-lg rounded-r-lg">
              <tr className="bg-blue-800 text-white rounded-l-xl rounded-r-lg">
                {columns.map((column, index) => (
                  <th key={index} className="px-4 py-2 text-left">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => onRowClick(row)} // Pass clicked row
                >
                  {columns.map((column, idx) => {
                    const cellValue = column.render
                      ? column.render(row)
                      : row[column.accessor];

                    return (
                      <td
                        key={idx}
                        className={`px-4 py-2 capitalize ${
                          column.status && getStatusClass
                            ? getStatusClass(cellValue)
                            : ""
                        }`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
