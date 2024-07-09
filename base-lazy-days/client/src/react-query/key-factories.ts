import { queryKeys } from "./constants";

export function generateUserKey(userId: number, userToken: string) {
  // deliberately exclude the userToken from the dependency array
  //  to keep key consistent for userId regardless of token changes
  return [queryKeys.user, userId];
}

export function generateUserAppointmentsKey(userId: number, userToken: string) {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
}
