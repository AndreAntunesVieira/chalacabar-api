import BaseController from 'src/controllers/_BaseController'
import PartySubscriptionsModel from 'src/models/PartySubscriptionsModel'
import PromotersModel from 'src/models/PromotersModel'

export default class PartySubscriptionsController extends BaseController {
  create = () => {
    let { phone, name, partyId, friends } = this.query
    const invalidMessage = this.validateCreate()
    if (invalidMessage) return this.bridge.send422(invalidMessage)
    return this.validatePromoter()
      .then(promoter => {
        const names = promoter ? [] : [{ name, phone, main: true }]
        if (friends){
          friends.forEach(name => {
            names.push({ name, main: false })
          })
        }
        if(!promoter){
          return new PartySubscriptionsModel().create({ partyId, name, phone, promoterId: null }).then(invitedBy => {
            if (!friends || friends.length === 0) return null
            const data = friends.map(name => ({ partyId, name, invitedBy }))
            return new PartySubscriptionsModel().inviteBatch(data)
          })
        }
        const promoterId = promoter.id
        const data = friends.map(name => ({ partyId, name, invitedBy: null, promoterId }))
        return new PartySubscriptionsModel().inviteBatch(data)
      })
      .catch(e => {
        if(e === 'promoter_not_found') return this.bridge.send422('Promoter não encontrado ou senha inválida')
        return this.bridge.send500(e)
      })
  }

  validatePromoter = () => {
    if (!this.query.promoterPassword) return Promise.resolve(null)
    return new PromotersModel().find(this.query.name, this.query.promoterPassword)
  }

  validateCreate = () => {
    if (!this.query.name) return 'Nome não pode estar em branco'
    if (!this.query.promoterPassword && !this.query.phone) return 'Telefone não pode estar em branco'
    if (!this.query.partyId) return 'Dia da festa não encontrado'
    if (!this.query.promoterPassword && this.query.name.trim().indexOf(' ') <= 0) return 'Insira nome e sobrenome'
    if (this.query.phone && !this.query.phone.match(/\(\d{2}\) (\d{4}|\d{5})-(\d{4}|\d{5})/)) return 'Formato de telefone errado'
  }
}
