import { useAxios } from "@/api/index";

export function getUsersApi() {
    return useAxios.get("/users")
}