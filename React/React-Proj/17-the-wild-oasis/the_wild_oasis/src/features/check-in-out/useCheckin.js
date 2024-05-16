import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (
      { bookingId, breakfast } // way to pass -> make anothr obj & spread
    ) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast, // spreading all prprties of breakfast
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in.`);
      queryClient.invalidateQueries({ active: false }); // ez way to stale all active queries
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}

//useQuery is primarily used for fetching and caching data, while useMutation is used for modifying data or triggering side-effects.
