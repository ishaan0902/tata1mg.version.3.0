import { useState, useEffect } from "react";
import Papa from "papaparse";
import Filter from "./filter";
import Display from "./display";

const Page = ({ URL, login, entityType }) => {
  const [table, setTable] = useState([]);
  const [tableHeadRow, setTableHeadRow] = useState([]);
  const [tableData, setTableData] = useState({});

  const [city, setCity] = useState();
  const [site, setSite] = useState();
  const [entity, setEntity] = useState();

  useEffect(() => {
    Papa.parse(URL, {
      download: true,
      header: true,
      complete: (results) => {
        setTable(results.data);

        let data = {};
        setTable(results.data);
        for (let j in results.data[0]) {
          setTableHeadRow((prev) => [...prev, j]);
          data[j] = ["NA"];
        }

        for (let i = 1; i < results.data.length; i++) {
          for (let j in results.data[i]) {
            data[j].push(results.data[i][j]);
          }
        }
        setTableData(data);
      },
    });
  }, []);

  const filterOptions = (table, filteredIndex, filteredValue) =>
    !filteredValue || !filteredIndex || filteredValue === "NA"
      ? table
      : table.filter((option) => option[filteredIndex] === filteredValue);

  const getOptions = (table, filteredIndex, filteredValue) =>
    filterOptions(
      filterOptions(table, filteredIndex[0], filteredValue[0]),
      filteredIndex[1],
      filteredValue[1]
    );

  return (
    <div className="App">
      <h1>{entityType}</h1>
      {login && (
        <>
          <Filter
            title={"select site name"}
            table={tableData["Site Name"]}
            inputValue={site}
            setInputValue={setSite}
          />

          {getOptions(table, ["Entity Type", "Site Name"], [entity, site]).map(
            (options, i) => (
              <Display
                key={i}
                options={options}
                tableHeadRow={tableHeadRow}
                i={i}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Page;
