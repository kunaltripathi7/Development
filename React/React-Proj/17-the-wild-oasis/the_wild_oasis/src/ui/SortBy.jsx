import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || options.at(0).label;
  // state cn't live in select compo cuz its reusable & performs its own func.
  // same for onchange -> state lives in parent

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortValue}
      onChange={handleChange}
    />
  );
}

export default SortBy;
