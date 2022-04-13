class OrderSubscriber {
  constructor({ manager, eventBusService, invoiceService }) {
    this.manager_ = manager
    this.invoiceService_ = invoiceService

    eventBusService.subscribe(
      "order.updated",
      this.handleOrderUpdate
    )

    eventBusService.subscribe(
      "restock-notification.execute",
      this.handleDelayedExecute
    )
  }

  handleDelayedExecute = async (data) => {
    const { invoice_id } = data
    return await this.invoiceService_.restockExecute(invoice_id)
  }

  handleOrderUpdate = async (data) => {
    const { id, fields } = data
    if (fields.includes("invoice_id")) {
      return await this.manager_.transaction(
        async (m) =>
          await this.invoiceService_
            .withTransaction(m)
            .triggerRestock(id)
      )
    }

    return Promise.resolve()
  }
}

export default OrderSubscriber
