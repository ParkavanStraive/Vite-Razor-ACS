import { validateParser, validateSpix } from "@/apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useValidateParser = (xmlPath: string | undefined) => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: validateParser,
    mutationKey: ["validateParser"],

    onError: (error) => {
      toast("Validation Failed", {
        description: `An unexpected error occurred: ${error.message}`,
      });
    },
  });
};

export const useValidateSpix = () => {
  return useMutation({
    mutationFn: validateSpix,
    mutationKey: ["validateSpix"],

    onError: (error) => {
      toast("Validation Failed", {
        description: `An unexpected error occurred: ${error.message}`,
      });
    },
  });
};
