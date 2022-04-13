import { Validator, MedusaError } from "medusa-core-utils"

export default async (req, res) => {
  const { invoice_id } = req.params

  const schema = Validator.object().keys({
    email: Validator.string().required(),
  })

  const { value, error } = schema.validate(req.body)
  if (error) {
    res.status(400).json({ message: error.message })
    return
  }

  try {
    const invoiceService = req.scope.resolve(
      "invoiceService"
    )
    await invoiceService.addEmail(invoice_id, value.email)
    res.sendStatus(201)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
