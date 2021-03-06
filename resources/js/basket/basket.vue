<template>
   <div>
      <success v-if="success">
         Thank you. Your bookings have successfully been booked!
      </success>
      <div class="row" v-if="!success && !errors">
         <div class="col-md-8" v-if="itemsInBasket">
            <div class="row">
               <div class="col-md-6 form-group">
                  <label for="first_names">First names</label>
                  <input 
                     type="text" 
                     class="form-control" 
                     name="first_names" 
                     v-model="customer.first_names"
                     :class="[{'is-invalid': errorFor('customer.first_names')}]"
                     >
                     <v-errors :errors="errorFor('customer.first_names')"></v-errors>
               </div>
               <div class="col-md-6 form-group">
                  <label for="last_name">Last name</label>
                  <input 
                     type="text" 
                     class="form-control" 
                     name="last_name" 
                     v-model="customer.last_name"
                     :class="[{'is-invalid': errorFor('customer.last_name')}]"
                     >
                     <v-errors :errors="errorFor('customer.last_name')"></v-errors>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12 form-group">
                  <label for="email">Email</label>
                  <input 
                     type="email" 
                     class="form-control" 
                     name="email" 
                     v-model="customer.email"
                     :class="[{'is-invalid': errorFor('customer.email')}]"
                     >
                     <v-errors :errors="errorFor('customer.email')"></v-errors>
               </div>
            </div>
            <div class="row">
               <div class="col-md-6 form-group">
                  <label for="street">Street</label>
                  <input type="text" class="form-control" name="street" v-model="customer.street"
                  :class="[{'is-invalid': errorFor('customer.street')}]"
                  >
                  <v-errors :errors="errorFor('customer.street')"></v-errors>
               </div>
               <div class="col-md-6 form-group">
                  <label for="city">City</label>
                  <input type="text" class="form-control" name="city" v-model="customer.city"
                  :class="[{'is-invalid': errorFor('customer.city')}]"
                  >
                  <v-errors :errors="errorFor('customer.city')"></v-errors>
               </div>
            </div>
            <div class="row">
               <div class="col-md-4 form-group">
                  <label for="region">Region</label>
                  <input 
                     type="text" 
                     class="form-control" 
                     name="region" 
                     v-model="customer.region"
                     :class="[{'is-invalid': errorFor('customer.region')}]"
                     >
                     <v-errors :errors="errorFor('customer.region')"></v-errors>
               </div>
               <div class="col-md-2 form-group">
                  <label for="postcode">Postcode</label>
                  <input type="text" class="form-control" name="postcode" v-model="customer.postcode"
                  :class="[{'is-invalid': errorFor('customer.postcode')}]"
                  >
                  <v-errors :errors="errorFor('customer.postcode')"></v-errors>
               </div>
               <div class="col-md-6 form-group">
                  <label for="country">Country</label>
                  <input type="text" class="form-control" name="country" v-model="customer.country"
                  :class="[{'is-invalid': errorFor('customer.country')}]"
                  >
                  <v-errors :errors="errorFor('customer.country')"></v-errors>
               </div>
            </div>
            <hr/>
            <div class="row">
               <div class="col-md-12 form-group">
                  <button 
                     type="submit" 
                     class="btn btn-lg btn-primary btn-block" 
                     @click.prevent="book"
                     >Book now!</button>
               </div>
            </div>
         </div>
         <div class="col-md-8" v-else>
            <div class="jumbotron jumbotron-fluid text-center">
               Cart is empty
            </div>
         </div>
         
         <div class="col-md-4">
            <div class="d-flex justify-content-between">
               <h6 class="text-uppercase text-secondary font-weight-bolder">Your cart</h6>
               <h6 class="badge badge-secondary text-uppercase">
                  <span v-if="itemsInBasket">Items {{ itemsInBasket }}</span>
                  <span v-else>empty</span>
               </h6>
            </div>
            
            <transition-group name="fade">
               <div v-for="item in basket" :key="item.bookable.id">
                  <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                     <span>
                        <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}">{{ item.bookable.title }}</router-link>
                     </span>
                     <span>
                        £{{ item.price.total }}
                     </span>
                  </div>
                  
                  <div class="pt-2 pb-2 d-flex justify-content-between">
                     <span>
                        From: {{ item.dates.from }}
                     </span>
                     <span>
                        To: {{ item.dates.to }}
                     </span>
                  </div>
                  
                  <div class="pt-2 pb-2 text-right">
                     <button 
                        class="btn btn-sm btn-outline-secondary"
                        @click="$store.dispatch('removeFromBasket', item.bookable.id)">
                        <i class="fas fa-trash-alt"></i>
                     </button>
                  </div>
               </div>
            </transition-group>
            
            
         </div>
         
      </div>
   </div>
</template>

<script>
   import {mapGetters, mapState} from "vuex";
   import validationErrors from "./../shared/mixins/validationErrors"
   
   export default {
      mixins: [validationErrors],
      data() {
         return {
            loading: false,
            bookingAttempted: false,
            customer: {
               first_names: null,
               last_name: null,
               email: null,
               street: null,
               city: null,
               region: null,
               postcode: null,
               country: null
            }
         };
      },
      computed: {
         ...mapGetters(["itemsInBasket"]),
         ...mapState({
            basket: state => state.basket.items
         }),
         success() {
            return !this.loading && 0 === this.itemsInBasket && this.bookingAttempted;
            
         }
      },
      methods: {
         async book() {
            this.loading = true;
            this.bookingAttempted = false;
            this.errors = null;
            
            try {
               await axios.post(`/api/checkout`, {
                  customer: this.customer,
                  bookings: this.basket.map(basketItem => ({
                     bookable_id: basketItem.bookable.id,
                     from: basketItem.dates.from,
                     to: basketItem.dates.to
                  }))
               });
               this.$store.dispatch("clearBasket");
            } catch (error) {
               this.errors = error.response && error.response.data.errors;
            }
            
            this.loading = false;
            this.bookingAttempted = true;
         }
      }
   };

</script>

<style scoped>

   h6.badge {
      font-size: 100%;
   }

</style>