import { MockManager, MockRepository } from "medusa-test-utils"
import InvoiceService from "../invoice-service"

describe("InvoiceService", () => {
  const InvoiceModel = MockRepository({
    findOne: (q) => {
      if (q.where.invoice_id === "invoice_1234") {
        return Promise.resolve({
          invoice_id: "invoice_1234",
          emails: ["test@tesmail.com"],
        })
      }
      return Promise.resolve()
    },
  })

  const OrderService = {
    retrieve: (id) => {
      if (id === "order_1234") {
        return {
          id,
          
        }
      }
      if (id === "invoice_1234") {
        return {
          id,
          
        }
      }
      
      return {
        id,
        
      }
    },
  }

  const EventBusService = {
    emit: jest.fn(),
    withTransaction: function () {
      return this
    },
  }

  describe("retrieve", () => {
    const restockNotiService = new InvoiceService({
      manager: MockManager,
      orderService: OrderService,
      invoiceModel: InvoiceModel,
      eventBusService: EventBusService,
    })

    it("successfully retrieves", async () => {
      jest.clearAllMocks()

      const result = await restockNotiService.retrieve("invoice_1234")

      expect(result).toEqual({
        invoice_id: "invoice_1234",
        emails: ["test@tesmail.com"],
      })
    })

    it("successfully retrieves with empty response", async () => {
      jest.clearAllMocks()

      const result = await restockNotiService.retrieve("invoice_non")

      expect(result).toEqual(undefined)
    })
  })

  describe("addEmail", () => {
    const restockNotiService = new InvoiceService({
      manager: MockManager,
      orderService: OrderService,
      invoiceModel: InvoiceModel,
      eventBusService: EventBusService,
    })

    it("successfully adds email to non-existing noti", async () => {
      jest.clearAllMocks()

      await restockNotiService.addEmail("invoice_test", "seb@med-test.com")

      expect(InvoiceModel.create).toHaveBeenCalledTimes(1)
      expect(InvoiceModel.create).toHaveBeenCalledWith({
        invoice_id: "invoice_test",
        emails: ["seb@med-test.com"],
      })

      expect(InvoiceModel.save).toHaveBeenCalledTimes(1)
    })

    it("successfully adds email to existing noti", async () => {
      jest.clearAllMocks()

      await restockNotiService.addEmail("invoice_1234", "seb@med-test.com")

      expect(InvoiceModel.save).toHaveBeenCalledTimes(1)
      expect(InvoiceModel.save).toHaveBeenCalledWith({
        invoice_id: "invoice_1234",
        emails: ["test@tesmail.com", "seb@med-test.com"],
      })
    })

    it("fails to add if in stock", async () => {
      jest.clearAllMocks()

      await expect(
        restockNotiService.addEmail("invoice_instock", "seb@med-test.com")
      ).rejects.toThrow(
        "You cannot sign up for restock notifications on a product that is not sold out"
      )
    })
  })
/*
  describe("triggerRestock", () => {
    afterEach(() => {
      jest.useRealTimers()
    })

    it("trigger delay default to 0", async () => {
      const restockNotiService = new InvoiceService({
        manager: MockManager,
        orderService: OrderService,
        invoiceModel: InvoiceModel,
        eventBusService: EventBusService,
      })

      restockNotiService.restockExecute = jest.fn()
      restockNotiService.triggerRestock("invoice_test")
      expect(restockNotiService.restockExecute).toHaveBeenCalledTimes(1)
    })

    it("trigger delay 10", async () => {
      const restockNotiService = new InvoiceService(
        {
          manager: MockManager,
          orderService: OrderService,
          invoiceModel: InvoiceModel,
          eventBusService: EventBusService,
        },
        { trigger_delay: 10 }
      )

      restockNotiService.restockExecute = jest.fn()

      restockNotiService.triggerRestock("invoice_test")

      expect(EventBusService.emit).toHaveBeenCalledTimes(1)
      expect(EventBusService.emit).toHaveBeenCalledWith(
        "restock-notification.execute",
        { invoice_id: "invoice_test" },
        { delay: 10 }
      )
    })
  })

  describe("restockExecute", () => {
    const restockNotiService = new InvoiceService({
      manager: MockManager,
      orderService: OrderService,
      invoiceModel: InvoiceModel,
      eventBusService: EventBusService,
    })

    it("non-existing noti does nothing", async () => {
      jest.clearAllMocks()

      await expect(restockNotiService.restockExecute("invoice_test")).resolves
    })

    it("existing noti but out of stock does nothing", async () => {
      jest.clearAllMocks()

      await expect(restockNotiService.restockExecute("invoice_outofstock"))
        .resolves
    })

    it("existing noti emits and deletes", async () => {
      jest.clearAllMocks()

      await restockNotiService.restockExecute("invoice_1234")

      expect(EventBusService.emit).toHaveBeenCalledTimes(1)
      expect(EventBusService.emit).toHaveBeenCalledWith(
        "restock-notification.restocked",
        {
          invoice_id: "invoice_1234",
          emails: ["test@tesmail.com"],
        }
      )

      expect(InvoiceModel.delete).toHaveBeenCalledTimes(1)
      expect(InvoiceModel.delete).toHaveBeenCalledWith(
        "invoice_1234"
      )
    })

    it("options inventory_required takes precedence if given", async () => {
      jest.clearAllMocks()
      const service = new InvoiceService(
        {
          manager: MockManager,
          orderService: OrderService,
          invoiceModel: InvoiceModel,
          eventBusService: EventBusService,
        },
        { inventory_required: 5 }
      )

      await service.restockExecute("invoice_1234")

      expect(EventBusService.emit).toHaveBeenCalledTimes(1)
      expect(EventBusService.emit).toHaveBeenCalledWith(
        "restock-notification.restocked",
        {
          invoice_id: "invoice_1234",
          emails: ["test@tesmail.com"],
        }
      )
      expect(InvoiceModel.delete).toHaveBeenCalledTimes(1)
      expect(InvoiceModel.delete).toHaveBeenCalledWith(
        "invoice_1234"
      )
    })
    it("Inventory requires 5, wont emit when called with order inventory 2", async () => {
      jest.clearAllMocks()
      const service = new InvoiceService(
        {
          manager: MockManager,
          orderService: OrderService,
          invoiceModel: InvoiceModel,
          eventBusService: EventBusService,
        },
        { inventory_required: 5 }
      )

      await service.restockExecute("invoice_low_inventory")

      expect(EventBusService.emit).toHaveBeenCalledTimes(0)
      expect(InvoiceModel.delete).toHaveBeenCalledTimes(0)
    })
  })
*/
})

