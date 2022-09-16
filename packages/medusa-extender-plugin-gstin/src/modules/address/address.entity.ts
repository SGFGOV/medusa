import { Address as MedusaAddress } from "@medusajs/medusa/dist"
import { Column, Entity, Index } from "typeorm"
import { Entity as MedusaEntity } from "medusa-extender"

@MedusaEntity({ override: MedusaAddress })
@Entity()
export class Address extends MedusaAddress {
  @Index()
  @Column({ nullable: true })
  gstin: string
}
