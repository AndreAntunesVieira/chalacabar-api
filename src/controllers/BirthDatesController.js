import BaseController from 'src/controllers/_BaseController'
import BirthDatesModel from 'src/models/BirthDatesModel'

export default class BirthDatesController extends BaseController {
  create = () => {
    const invalidMessage = this.validateCreate()
    if (invalidMessage) return this.bridge.send422(invalidMessage)
    return new BirthDatesModel().create(this.query)
      .then(() => this.bridge.send201())
  }

  validateCreate = () => {
    if (!this.query.name) return "Name can't be empty"
    if (!this.query.phone) return "Phone name cant't be empty"
    if (this.query.name.length < 5) return 'Name must have 5 or mor letters'
    if (!this.query.name.match(/(\w+) (\w+)/)) return 'Insert name and surname'
    if (!this.query.phone.match(/\(\d{2}\) (\d{4}|\d{5})-(\d{4}|\d{5})/)) return 'Wrong phone name format'
    if (!this.query.rg.match(/(\d{2})\.(\d{3})\.(\d{3})-(\d{1,2})/)) return 'Insert name and surname'
    if (!this.query.partyDate) return "Date party date cant't be empty"
    if (!this.query.partyDate.match(/\d{4}-\d{2}-\d{2}/)) return 'Invalid party date'
    if (!this.query.birthDate) return "Birth date cant't be empty"
    if (!this.query.birthDate.match(/\d{4}-\d{2}-\d{2}/)) return 'Invalid birth date'
  }
}
