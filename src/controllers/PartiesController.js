import PartiesModel from 'src/models/PartiesModel'
import BaseController from 'src/controllers/_BaseController'

export default class PartiesController extends BaseController {
  index = () => new PartiesModel().all()

  show = () => new PartiesModel().findBySlug(this.query.slug)
}
