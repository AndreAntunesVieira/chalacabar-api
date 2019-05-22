import InstallationsModel from 'src/models/InstallationsModel'
import BaseController from 'src/controllers/_BaseController'

export default class InstallationsController extends BaseController {
  create = () => new InstallationsModel().create(this.query.userAgent)
}
