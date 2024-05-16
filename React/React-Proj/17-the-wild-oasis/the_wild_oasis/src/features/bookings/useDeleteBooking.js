import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookingFn, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      toast.success(`Booking has been successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // will invalidate all the query keys which will have booking in itself.
    },
    onError: () => toast.error("There was an error while deleting the booking"),
  });
  return { deleteBookingFn, isDeleting };
}
