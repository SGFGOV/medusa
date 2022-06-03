import { MedusaError } from "medusa-core-utils"
import { BaseService } from "medusa-interfaces"
import {createInvoice} from "./create-invoice"
/**
 * Restock notifications can be used to keep track of customers who wish to be
 * notified when a certain item is restocked. Restock notifications can only
 * apply to sold out items and will be deleted once items are restocked.
 */
class InvoiceService extends BaseService {
  constructor(
    {
      manager,
      eventBusService,
      orderService,
      invoiceModel,
    },
    options
  ) {
    super()

    this.manager_ = manager

    this.options_ = options

    this.orderService_ = orderService

    this.invoiceModel_ = invoiceModel

    this.eventBus_ = eventBusService
  }

  withTransaction(transactionManager) {
    if (!transactionManager) {
      return this
    }

    const cloned = new InvoiceService(
      {
        manager: transactionManager,
        options: this.options_,
        eventBusService: this.eventBus_,
        orderService: this.orderService_,
        invoiceModel: this.invoiceModel_,
      },
      this.options_
    )

    cloned.transactionManager_ = transactionManager

    return cloned
  }

  /**
   * Retrieves a invoice given an invoice id.
   * @param {string} invoiceId - the invoice id to retrieve 
   *  for
   * @return {Promise<Invoice>} The Invoice
   */
  async retrieve(invoiceId) {
    const  invoiceRepo = this.manager_.getRepository(
      this.invoiceModel_
    )
    return await invoiceRepo.findOne({ where: { invoice_id: invoiceId } })
  }

  /**
   * Adds an email to be notified when a certain invoice is ready for download
   * the order is fulfilled in part.
   * @param {string} email - the email to signup
   * @param {string} order_id (optional) - the order id to create an invoice for
   * @return {Promise<Invoice>} The resulting invoice 
   */
  async addEmail(email,order_id) {
    return this.atomicPhase_(async (manager) => {
      const invoiceRepo = manager.getRepository(this.invoiceModel_)
      const existing = await this.orderService_.retrieve(order_id)

      if (existing) {
        // Converting to a set handles duplicates for us
        const emailSet = new Set(existing.emails)
        emailSet.add(email)

        existing.emails = Array.from(emailSet)
        return await invoiceRepo.save(existing)
      } else {
        
           throw new MedusaError(
            MedusaError.Types.NOT_ALLOWED,
            "You cannot add email notifications for orders that don't exist"
          )
        }

        return invoice
      }
    )
  }

  /**
   * Checks if anyone has signed up for invoice notifications 
   * @param {string} orderId - the order id to trigger invoice creation for
   * @return The resulting invoice notification
   */
  async triggerInvoice(orderId,items={}) {
    const delay = this.options_?.trigger_delay ?? 0
    if (delay) {
      return await this.eventBus_.emit(
        "order-invoice-creation.execute",
        { order_id: order-id,items:items },
        { delay }
      )
    }

    return await this.createInvoice(orderId,items)
  }

  


  async createInvoice(orderId,items) {
    return await this.atomicPhase_(async (manager) => {
      const invoiceRepo = manager.getRepository(this.invoiceModel_)

      const order = await this.orderService_.retrieve(orderId,{
        select: [
          "subtotal",
          "shipping_total",
          "discount_total",
          "tax_total",
          "gift_card_total",
          "total",
        ],
        relations: [
          "discounts",
          "discounts.rule",
          "region",
          "fulfillments",
          "shipping_address",
          "billing_address",
          "shipping_methods",
          "shipping_methods.shipping_option",
          "items",
          "items.variant",
          "items.variant.product",
          "payments",
        ],
      })

      
      if (!order) {
        return
      }

      const invoice = {
        shipping: {
          customer:
          name: "John Doe",
          address: "1234 Main Street",
          city: "San Francisco",
          state: "CA",
          country: "US",
          postal_code: 94111
        },
        items: [
          {
            item: "TC 100",
            description: "Toner Cartridge",
            quantity: 2,
            amount: 6000
          },
          {
            item: "USB_EXT",
            description: "USB Cable Extender",
            quantity: 1,
            amount: 2000
          }
        ],
        subtotal: 8000,
        paid: 0,
        invoice_nr: 1234
      };

      
      await this.eventBus_
          .withTransaction(manager)
          .emit("order-notification.invoiced", {
            invoice_id: order_id,
            emails: existing.emails,
          })
        return createInvoice(invoice, `${orderId}.pdf`); 
      }
      
    )
   
  }
}

export default InvoiceService
