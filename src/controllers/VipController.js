import VipModel from 'src/models/VipModel'
import BaseController from 'src/controllers/_BaseController'

export default class VipController extends BaseController {
  show = () => {
    return new VipModel().partyReservedTables(this.query.partyId)
      .then(reservedTables => ({ reservedTables: reservedTables.sort((a, b) => a > b).map(str => Number(str)) }))
  }

  create = () => {
    const { partyId, tableNumber } = this.query
    return new VipModel().isFree(partyId, tableNumber)
      .then(() => new VipModel().create(this.query))
      .then(() => this.bridge.send201())
      .catch(e => {
        if(e === false) return this.bridge.send422('Desculpe, alguém acabou de reservar esta mesa :(')
      })
  }
}
