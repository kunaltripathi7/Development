import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const { last } = useParams();
  const numDays = last ? Number(last) : 7;
  const queryDate = subDays(new Date(), numDays).toISOString(); // get the date by subt some days

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`], // diff. query key to refetch when data changes cuz we have bookings key already which will update cache.
  });

  return { isLoading, bookings };
}
