import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

// centralized logic -> toast each time u use create cabin anywhere
export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been successfully created");
      queryClient.invalidateQueries(["cabins"]);
      //   reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
