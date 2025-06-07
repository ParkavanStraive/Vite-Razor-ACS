import { validateParser, validateSpix } from "@/apis/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useValidateParser = () => {
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
