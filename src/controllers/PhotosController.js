import PhotosModel from 'src/models/PhotosModel'
import BaseController from 'src/controllers/_BaseController'

export default class PhotosController extends BaseController {
  index = () => new PhotosModel().all(this.bridge.req.headers.page || 1)

  last = () => new PhotosModel().lastAlbums(this.query.limit)

  showAlbum = () => new PhotosModel().showAlbum(this.query.id)

  show = () => new PhotosModel().show(this.query.id)

  schema = () => new PhotosModel().schema()
}
