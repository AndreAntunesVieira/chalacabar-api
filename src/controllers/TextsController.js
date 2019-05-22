import TextsModel from 'src/models/TextsModel'
import BaseController from 'src/controllers/_BaseController'

export default class TextsController extends BaseController {

  index = () => new TextsModel().all()

  show = () => new TextsModel().find(this.query.slug)
}
