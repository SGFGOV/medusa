import { adminCustomerKeys } from "./queries"
import { AdminCustomersRes, AdminPostCustomersReq } from "@medusajs/medusa"
import { Response } from "@medusajs/medusa-js"
import { useMutation, UseMutationOptions, useQueryClient } from "react-query"
import { useMedusa } from "../../../contexts/medusa"
import { buildOptions } from "../../utils/buildOptions"

export const useAdminCreateCustomer = (
  options?: UseMutationOptions<
    Response<AdminCustomersRes>,
    Error,
    AdminPostCustomersReq
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()

  return useMutation(
    (payload: AdminPostCustomersReq) => client.admin.customers.create(payload),
    buildOptions(queryClient, adminCustomerKeys.lists(), options)
  )
}

export const useAdminUpdateCustomer = (
  id: string,
  options?: UseMutationOptions<
    Response<AdminCustomersRes>,
    Error,
    AdminPostCustomersReq
  >
) => {
  const { client } = useMedusa()
  const queryClient = useQueryClient()
  return useMutation(
    (payload: AdminPostCustomersReq) =>
      client.admin.customers.update(id, payload),
    buildOptions(
      queryClient,
      [adminCustomerKeys.lists(), adminCustomerKeys.detail(id)],
      options
    )
  )
}
