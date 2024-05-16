import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />

      {/* naming convention follow in value */}
      <SortBy
        sortField="sortBy"
        options={[
          { value: "name-asc", label: "Sort by Name (a-z)" },
          { value: "name-desc", label: "Sort by Name (z-a)" },
          { value: "regularPrice-asc", label: "Sort by Price (lowest first)" },
          {
            value: "regularPrice-desc",
            label: "Sort by Price (Highest First)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity (Lowest First)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity (Highest First)",
          },
        ]}
        type="white"
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
