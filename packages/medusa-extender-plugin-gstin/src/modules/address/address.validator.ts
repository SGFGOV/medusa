import { Validator } from 'medusa-extender';
import {AddressPayload} from '@medusajs/medusa/dist/types/common'
import { IsString } from 'class-validator';
//import {isValidGSTNumber} from 'sgf-gstin-validator'

/*export function IsGstin()
{
  return function(targetClass: any, propertyKey:any, descriptor?: TypedPropertyDescriptor<() => void>) :  any {
    return isValidGSTNumber(propertyKey.value)
   }
}*/

@Validator({ override: AddressPayload })
export default class AddressValidator extends AddressPayload {
  
  //@IsGstin()
  @IsString()
  gstin: string;
}