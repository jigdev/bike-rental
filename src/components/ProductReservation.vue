<template>
    <v-flex cols="12" sm="10" md="8" lg="6">
        <v-card>
            <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-text-field v-model="pr.name" :counter="10" :rules="nameRules" label="Full Name" required></v-text-field>
                    <v-text-field v-model="pr.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-combobox v-model="pr.hours" :items="totalHours" chips label="How many hours rent?" required></v-combobox>
                     <v-btn class="mr-4" @click="reset">Cancel</v-btn>
                    <v-btn color="primary" @click="reserveProduct">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-flex>

</template>
<script>
    export default {
        name: 'product-reservation',
        data() {
            return {
                valid: true,
                hours:'1 hrs',
                lazy:true,
                pr:{
                    name:"",
                    email:"",
                    hours:"1 hrs"
                },
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 15) || 'Name must be less than 10 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                totalHours: ['1 hr', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs'],
            }
        },
        computed: {
            pages() {
                return Math.ceil(this.$store.state.listing.total / this.itensPerPage)
            }
        },
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        methods: {
            // User reserve a product
            reserveProduct() {
                if(!this.valid)
                    return
                this.pr['product'] = this.product;
                this.$store.dispatch('reservebike', {
                    pr: this.pr
                })
                this.reset();
                this.$emit('closeDialog');
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
            reset() {
                this.$refs.form.reset()
                 this.$emit('closeDialog');
            },
        }
    }

</script>
