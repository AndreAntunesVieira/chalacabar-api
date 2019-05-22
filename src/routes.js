import ServerRouter from 'src/helpers/ServerRouter'
import PartySubscriptionsController from 'src/controllers/PartySubscriptionsController'
import PartiesController from 'src/controllers/PartiesController'
import PhotosController from 'src/controllers/PhotosController'
import SponsorsController from 'src/controllers/SponsorsController'
import BirthDatesController from 'src/controllers/BirthDatesController'
import VipController from 'src/controllers/VipController'
import InstallationsController from 'src/controllers/InstallationsController'
import TextsController from 'src/controllers/TextsController'

export const routes = (req, res, next) =>
  new ServerRouter(req, res, next)
    .post('/install', InstallationsController, 'create')
    .get('/party-subscriptions', PartySubscriptionsController, 'index')
    .post('/party-subscriptions', PartySubscriptionsController, 'create')
    .get('/party-subscriptions/:partySlug', PartySubscriptionsController, 'index')
    .get('/parties', PartiesController, 'index')
    .get('/parties/:slug', PartiesController, 'show')
    .get('/photos/last/:limit?', PhotosController, 'last')
    .get('/photos', PhotosController, 'index')
    .get('/photos/album/:id', PhotosController, 'showAlbum')
    .get('/photos/:id', PhotosController, 'show')
    .get('/sponsors', SponsorsController, 'index')
    .get('/texts/:slug', TextsController, 'show')
    .get('/vip/:partyId', VipController, 'show')
    .post('/vip', VipController, 'create')
    .post('/birth-dates', BirthDatesController, 'create')
    .listen()
