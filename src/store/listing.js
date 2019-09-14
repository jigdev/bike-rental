import ListingRepository from '@/api/ListingRepository'

export const TYPES = {
    FETCH_LISTINGS: 'FETCH_LISTINGS',
    FETCH_LISTINGS_COUNT: 'FETCH_LISTINGS_COUNT',
    RESERVATION_LIST :'RESERVATION_LIST',
    USER : 'USER'
}

const state = {

    listings: [],
    total: null,
    listOfReservations :[],
    user:{}
}

const actions = {

    fetch_listings_count({commit}) {
        ListingRepository.countAll().then(count => commit(TYPES.FETCH_LISTINGS_COUNT, count))
    },

    fetch_listings({commit}, params) {
        let itensPerPage = params.itensPerPage
        let page = params.page || 1
        ListingRepository.findAll(page, itensPerPage).then(data => {
            commit(TYPES.FETCH_LISTINGS, data)
        })
    },
    reservebike({commit}, params){
       let reservation = params.pr;
       state.listOfReservations.push(reservation.product);
       commit(TYPES.RESERVATION_LIST, state.listOfReservations);
    }


}

const mutations = {

    [TYPES.FETCH_LISTINGS](state, data) {
        state.listings = data
    },
    [TYPES.FETCH_LISTINGS_COUNT](state, count) {
        state.total = count
    },
    [TYPES.RESERVATION_LIST](state, list) {
        state.listOfReservations = list
    }
}

export default {
    state,
    actions,
    mutations
}
