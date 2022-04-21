import { Validator } from 'medusa-extender';
import { AdminPostOrdersReq } from '@medusajs/medusa/dist/api/routes/admin/orders/create-order'
import {AddressPayload} from '@medusajs/medusa/dist/types/common'
import { IsString } from 'class-validator';

@Validator({ override: AddressPayload })
export default class AddressValidator extends AddressPayload {
  @IsString()
  gstin: string;
}