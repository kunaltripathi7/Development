// using react query to check the auth
// mutation func. cuz something changes on the server as user gets logged in + handling success & error states

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiLogin";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
      toast.success("User has been successfully authenticated");
    },
    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading };
}

// making these custom hooks so that these can be reusable, seperation of concerns. Why react query? -> remote state management lib
//could have done via onclick but react query -> convenient way like giving loading state etc.
