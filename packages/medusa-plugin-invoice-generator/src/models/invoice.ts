import {
  Entity,
  Index,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Order } from "@medusajs/medusa"

@Entity()
export class Invoice {
  @PrimaryColumn()
  invoice_id: string

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order

  @Column({ type: "jsonb" })
  emails: string[]

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date
}

/**
 * @schema invoice
 * title: "Invoice Generator"
 * description: "Sends Invoices to the list of email addresses specified"
 * x-resourceId: order
 * properties:
 *   order_id:
 *     type: string
 *     description: "The id of the orders that customers have signed up to be notified about,"
 *   emails:
 *     type: string[]
 *     description: "The emails of customers who wish to be notified about restocks."
 *   created_at:
 *     type: string
 *     format: date-time
 *     description: "The date time at which the first restock signup was made."
 *   updated_at:
 *     type: string
 *     format: date-time
 *     description: "The date time at which the first last signup was made."
 */
