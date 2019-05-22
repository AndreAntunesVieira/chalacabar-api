import SponsorsModel from 'src/models/SponsorsModel'
import BaseController from 'src/controllers/_BaseController'

export default class SponsorsController extends BaseController {
  index = () => new SponsorsModel().all()
}
