import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams(); // it returns an obj of KV pairs.. ++ useSearchParams returns mech for reading and writing to searchParams
  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["bookings", bookingId], // o/w it renders from cache, cuz unique key for each id
    queryFn: () => getBooking(bookingId),
    retry: false, // react query tries to fetch data 3 times in case it fails
  });

  return { isLoading, error, booking };
}
