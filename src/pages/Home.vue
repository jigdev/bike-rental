<template lang="pug">
    v-container
        v-layout(row, wrap)
            banner
            h1 Bikes
            all-listings(:currentPage=1, :itensPerPage=6)
</template>

<script>
    import ModuleMenu from '../components/ModuleMenu.vue'
    import ReservationsBucket from '../components/ReservationsBucket.vue'
    import Banner from '../components/Banner.vue'
    import AllListings from '../components/listing/AllListings.vue'
    import ProductReservation from '../components/ProductReservation.vue'

    export default {
        components: {
            AllListings,
            Banner,
            ModuleMenu,
            ProductReservation,
            ReservationsBucket
        }
    }
</script>
