import BaseModel from 'src/models/_BaseModel'
import { slugify } from 'src/helpers/StringHelpers'

export default class SponsorsModel extends BaseModel {
  find = (name, pass) => {
    return this.querySingle(
      'SELECT id, name FROM promoters WHERE slug = ? AND password = ?',
      [slugify(name), pass]
    ).catch(() => Promise.reject('promoter_not_found'))
  }
}
