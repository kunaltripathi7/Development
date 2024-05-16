import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    // (id) => delete(id) ==>same as deleteId;
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin has been successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // refetch
    },
    onError: (err) => alert(err.message),
  });
  return { isDeleting, deleteCabin };
}
