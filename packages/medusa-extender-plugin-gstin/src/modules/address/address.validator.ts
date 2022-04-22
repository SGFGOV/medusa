import { Validator } from 'medusa-extender';
import { AdminPostOrdersReq } from '@medusajs/medusa/dist/api/routes/admin/orders/create-order'
import {AddressPayload} from '@medusajs/medusa/dist/types/common'
import { IsString } from 'class-validator';
import {isValidGSTNumber} from 'sgf-gstin-validator'

function IsGstin()
{
  return function(targetClass: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<() => void>) :  any {
    return isValidGSTNumber(targetClass[propertyKey])
   }
}

@Validator({ override: AddressPayload })
export default class AddressValidator extends AddressPayload {
  
  @IsGstin()
  @IsString()
  gstin: string;
}