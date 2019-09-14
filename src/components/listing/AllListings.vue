<template lang="pug">
    v-container(grid-list-md xs6)
        v-snackbar(v-model='snackbar',:color="color", :bottom="y === 'bottom'", :multi-line="mode === 'multi-line'", :right="x === 'right'", :timeout='timeout', :top="y === 'top'", :vertical="mode === 'vertical'")
            | {{ msg }}
            v-btn(color='pink', flat='', @click='snackbar = false')
                | Close
        v-layout(wrap)
            v-flex(v-for="listing in listings", xs12, sm6, md4, :key="listing.id")
                v-card.ma-auto(:flat='flat' :loading='loading' :outlined='outlined' :elevation='elevation' :raised='raised' :width='width' :height='height')
                        v-img.black--text(v-if='media' height='200px' :src='listing.image')
                            v-card-title.align-end.fill-height( class="title") ${{listing.price}} / hr
                        v-card-title.align-end.fill-height(class="title") {{listing.name.toUpperCase()}}
                        v-card-text
                            v-rating(:value='4.5' color='amber' half-increments='' dense='' size='15' readonly='')
                        v-card-actions
                                v-btn(color='primary' class="my-2" text='' )
                                    | Share
                                v-btn(color='primary' class="my-2" text='' @click="reserveProduct(listing)" )
                                    | Reserve
            v-flex
                v-dialog(v-model='dialog', width='500' v-show="dialog")
                    v-card
                        v-card-title.headline.grey.lighten-2(primary-title='')
                            | {{product.name}}
                        v-card-text
                            product-reservation(:product='product',@closeDialog="closeDialog")
                        v-divider
        .text-xs-center
            v-pagination(:length="pages", v-model="page")

</template>
<script>
    import ProductReservation from '../ProductReservation.vue';
    export default {
        name: 'all-listings',
       components: {
            ProductReservation
        },
        created() {
            this.$store.dispatch('fetch_listings_count')
            this.fetch()
        },
        data() {
            return {
                color:"blue",
                dialog:false,
                page: this.currentPage,
                flat: false,
                media: true,
                loading: false,
                actions: true,
                outlined: false,
                elevation: undefined,
                raised: false,
                width: 344,
                height: undefined,
                product: {},
                select: null,
                lazy: false,
                snackbar: false,
                timeout:6000,
                y: 'top',
                x: null,
                mode: '',
                msg:"Reserve successfully!",
                snackbar:false
            }
        },

        computed: {
            listings() {
                return this.$store.state.listing.listings
            },
            pages() {
                return Math.ceil(this.$store.state.listing.total / this.itensPerPage)
            }
        },
        props: {
            itensPerPage: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            }
        },
        watch: {
            page() {
                this.fetch()
            }
        },
        methods: {
            fetch() {
                this.$store.dispatch('fetch_listings', {
                    page: this.page,
                    itensPerPage: this.itensPerPage
                })
            },
            reserveProduct(listing) {
                this.product = Object.assign({},listing);
                this.dialog =true;

            },
            closeDialog(){
                if(!this.product.id)
                    this.snackbar =true;
               this.product ={};
               this.dialog = false;
            }
        }

    }
</script>
