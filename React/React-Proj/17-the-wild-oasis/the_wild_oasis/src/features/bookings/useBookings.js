import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  // searchParams placed here -> purpose of this hook -> provide boookings as they are -> so it can be reused anywhere -> read it from the url & get it.
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("status");
  const filter =
    filterValue === "all" || !filterValue
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  // { field: "totalPrice", value: 5000, method: "gte" };

  const sortValue = searchParams.get("sortBy") || "startDate-asc"; // fix a defaultValue instead of handling null cases :)
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    error,
    data: { data: bookings, count } = {}, // default as data won't be present at start
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // its in cache so not refetching -> give the dependencies like filter in queryKey, all different versions of filter gets stored in cache -> 4*4 => 16 combinations
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // need to change page+1 to refetch cuz to fetch data queryKey should be unique so page's query key is fetching data above, to fetch next page -> unique query key
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}

// the func. isn't async cuz react query handles it internally.
