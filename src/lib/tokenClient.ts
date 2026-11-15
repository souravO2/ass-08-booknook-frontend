import { toast } from "sonner";
import { authClient } from "./auth-client";

export const tokenFromClient = async () => {
  const { data, error } = await authClient.token();
  if (error) {
    toast.error("error");
  }
  return data?.token;
};
