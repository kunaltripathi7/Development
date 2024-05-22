import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries(); // removing the queries from the cache
      toast.success("User has been successfully logged out.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logout, isLoading };
}
