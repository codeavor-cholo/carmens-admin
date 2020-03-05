<template>
    <q-page>
        <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
            <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-grey-8 bg-grey-9 full-height relative-position" :active-color="tab != 'WOPP' ? 'white' : 'teal'" :active-bg-color="tab != 'WOPP' ? 'deep-orange-4' : 'teal-1'">
                <div class="bg-grey-9 fit">
                    <div class="text-h6 text-center text-white q-py-md">FILTER OPTIONS</div>
                    <q-input v-model="filter" type="text" label="Search Reservation" color="deep-orange-4" class="q-ma-md bg-white" outlined icon="search">
                        <template v-slot:prepend>
                            <q-icon name="search" color="deep-orange-4"/>
                        </template>
                    </q-input>
                </div>
                <q-tab name="reservation" style="font-family: 'Roboto Slab', serif;"   class="bg-grey-9 text-white" label="Reservation"></q-tab>
            </q-tabs>
            </template>    
            <template v-slot:after>   
                <q-table grid :data="partyTrayOrders" :columns="columns" :filter="filter">
                    <template v-slot:item="props">
                        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-style-transition " :style="props.selected ? 'transform: scale(0.95);' : ''">
                            <q-card flat class="my-card" style="border: 2px solid;border-color: #ffdab9" >
                                <q-card-section class="q-pb-none q-mb-none" side>
                                    <q-list dense>
                                    <q-item>
                                    <div class="full-width text-center text-grey-8 text-h6">
                                        <strong><q-chip class="text-weight-bold" color="deep-orange-3" style="font-size:25px;font-family: 'Simonetta', serif;">{{props.row.clientName}}</q-chip></strong>
                                    </div>
                                    </q-item>
                                    
                                    <div class="text-grey-8 column q-gutter-sm">
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Date of Delivery:</b> {{props.row.deliveryDate}}</p></div>
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Where:</b>  {{props.row.clientAddress}}, {{props.row.city}}</p></div>
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Delivery Time:</b> {{props.row.deliveryTime}}</p></div>
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Contact Number:</b> {{props.row.clientNumber}}</p></div>
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Total Payment:</b> <i class="text-weight-bold"> P </i> {{props.row.totalToPayAmount}}</p></div>
                                        <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Paid Amount:</b> <i class="text-weight-bold"> P </i> {{props.row.firstPayment}}</p></div>
                                        <div v-if="props.row.totalToPayAmount === props.row.firstPayment"><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Balance:</b> <i class="text-weight-bold"> P </i>{{parseInt(props.row.totalToPayAmount) - parseInt(props.row.firstPayment)}}</p></div>
                                        <div v-else><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Balance:</b> <i class="text-weight-bold"> P </i>{{parseInt(props.row.totalToPayAmount) - parseInt(props.row.firstPayment)}}</p></div>
                                        <div><p class="q-pt-none q-mt-none"></p></div>
                                    </div>
                                    <div style="margin-top: -25px" class="q-pt-none q-mt-none column items-center">
                                        <q-btn class="q-pt-none q-mt-none" :color="expanded ? 'grey-8':'deep-orange-4'" :label="expanded ? 'Hide Orders' : 'View Orders'" flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
                                    </div>
                                    <div>
                                        <q-slide-transition>
                                            <div v-show="expanded">
                                                <q-list dense>
                                                <q-item class="q-mt-sm text-grey-8">
                                                    <span class="full-width text-center text-weight-bold" style="font-family: 'Roboto Slab', serif;">Client's Party Trays Order's List</span>
                                                    </q-item>
                                                    <q-list v-for="(i, index) in props.row.orders" :key="index" class="text-grey-8">
                                                        <q-item>
                                                            <q-item-section top>
                                                                <img style="height: 100px; width: 100px" :src="i.foodPic">
                                                            </q-item-section>

                                                            <q-item-section>
                                                            <q-item-label>{{i.foodName}}</q-item-label>
                                                            <q-item-label caption class="text-weight-bold" style="font-family: 'Roboto Slab', serif;">{{i.size}}( {{i.min}} - {{i.max}})</q-item-label>
                                                            </q-item-section>
                                                                            
                                                            <q-item-section side top>
                                                            <q-badge color="orange-4" :label="'Qty:' + ' ' + i.qty"/>
                                                            </q-item-section>
                                                        </q-item>
                                                    </q-list>
                                                </q-list>
                                            </div>
                                        </q-slide-transition>
                                    </div>
                                </q-list>
                                <q-separator/>
                                </q-card-section>
                                <q-card-actions class="q-pt-none q-mt-none">
                                    <q-btn class="q-pt-none q-mt-none" color="deep-orange-4" label="Assign Delivery Staff" flat dense />
                                    <q-space />
                                    <q-btn class="q-pt-none q-mt-none" flat dense color="deep-orange-4" @click="openPayment(props.row)" label="Update Payment" />
                                </q-card-actions>
                            </q-card>
                        </div>
                    </template>
                </q-table>
            </template>
        </q-splitter>
                <q-dialog v-model="payment">
                    <q-card style="width: 500px" class="my-card">
                        <q-card-section>
                            <div class="text-h6 column items-center" style="font-family: 'Roboto Slab', serif;">SELECT PAYMENT TYPE</div>
                        </q-card-section>

                        <q-tabs v-model="tab" class="text-orange-4" active-color="orange-4">
                            <q-tab label="CASH" name="cash" />
                            <q-tab label="CARD" name="card" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="cash">
                            <div class="text-grey-8 row">
                                <div class="q-pa-sm column col-8">
                                    <q-input type="number" color="orange-4" outlined v-model="enteramount" full-width label="Enter Amount" />
                                </div>
                                <div class="q-pa-sm column col-4">
                                    <q-btn class="col-12" color="orange-4" label="Pay" ></q-btn>
                                </div>
                            </div>
                            </q-tab-panel>

                            <q-tab-panel name="card">
                            With so much content to display at once, and often so little screen real-estate,
                            Cards have fast become the design pattern of choice for many companies, including
                            the likes of Google and Twitter.
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </q-dialog>
    </q-page>
</template>
<script>
import { StripeElements } from 'vue-stripe-checkout';
import { date } from 'quasar'
    export default {
    components: {
        StripeElements
    },
    data(){
        return {
            amount: 0,
            publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
            token: null,
            charge: null,
            enterAmount: 0,
            payment: false,
            tab: 'cash',
            expanded: false,
            selected: [],
            filter: '',
            selectedPayment: [],
            partyTrayOrders: [],
            columns: [
                { name: 'clientName', required: true, label: 'Full Name', align: 'center', field: 'clientName', sortable: true },
                { name: 'firstName', required: true, label: 'First Name', align: 'center', field: 'firstName', sortable: true },
                { name: 'lastName', align: 'center', label: 'Last Name', field: 'lastName', sortable: true },
            ]
        }
    }, 
    mounted(){
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
            .then(partyTrayOrders => {
            console.log(partyTrayOrders, 'partyTrayOrders')
            })
    },
    computed: {
        balance(){      
            if(this.partyTrayOrders.length === 0){
                return 0
            }else{
            let optionss = this.$lodash.filter(this.partyTrayOrders, m => {
						return parseInt(m.totalToPayAmount)
                    }) 
            let optionss2 = this.$lodash.filter(this.partyTrayOrders, s => {
						return parseInt(s.firstPayment)
                    }) 
            let sum = parseInt(optionss) - parseInt(optionss2)
                    return sum
            }
        },
    },
    methods: {
        openPayment (props) {
          this.selectedPayment = props 
          this.payment = true
        },
        //PAY
        submit () {
        this.$refs.elementsRef.submit();
        },
        tokenCreated (token) {
        this.token = token;
        console.log(token,'token')
        // for additional charge objects go to https://stripe.com/docs/api/charges/object
        this.charge = {
            source: token.card,
            amount: this.amount,
        }
        this.sendTokenToServer(this.charge);
        },
        sendTokenToServer (charge) {
        // Send to server
        console.log(charge,'charge')
            this.paydetails = charge
        }
    }
}
</script>