import products from './products.js'
import faker from 'faker'
import ImageFixtures from '../fixtures/ImageFixtures'

let listings = products.products;


export default class ListingRepository {
    static findFeatured(limit) {
        return new Promise(r => r(listings.slice(0, limit)))
    }

    static findAll(page, itensPerPage) {
        return new Promise(r => {
            if (page > 0 && itensPerPage !== null) {
                let offset = (page-1) * itensPerPage

                return r(listings.slice(offset, offset+itensPerPage))
            }

            r(listings)
        })
    }

    static countAll () {
        return new Promise(r => {
            return r(listings.length)
        })
    }
}
