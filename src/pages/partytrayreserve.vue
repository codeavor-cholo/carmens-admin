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
                                    <div style="margin-top: -25px" class="q-pt-none q-mt-none row items-center">
                                        <q-btn class="q-pt-none q-mt-none" :color="expanded ? 'grey-8':'deep-orange-4'" :label="expanded ? 'Hide Orders' : 'View Orders'" flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
                                        <q-space />
                                        <q-btn class="q-pt-none q-mt-none" flat dense color="deep-orange-4" @click="openReceipt(props.row)" label="Print Receipt" />
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
                                    <q-btn class="q-pt-none q-mt-none" v-show="props.row.firstPayment != props.row.totalToPayAmount" flat dense color="deep-orange-4" @click="openPayment(props.row)" label="Update Payment" />
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
                                <div class="full-width text-center text-grey-8 text-h6">
                                    <strong><q-chip class="text-weight-bold" color="deep-orange-3" style="font-size:25px;font-family: 'Simonetta', serif;">Client Name: {{this.selectedPayment.clientName}}</q-chip></strong>
                                </div>
                                <div class="q-pa-sm column col-8">
                                    <q-input type="number" color="orange-4" readonly outlined v-model="enteramount" full-width label="Enter Amount" />
                                </div>
                                <div class="q-pa-sm column col-4">
                                    <q-btn class="col-12" color="orange-4" @click="updatePaymentCash" label="Update Payment" ></q-btn>
                                </div>
                            </div>
                            </q-tab-panel>

                            <q-tab-panel name="card">
                                <div class="text-grey-8 row">
                                    <div class="full-width text-center text-grey-8 text-h6">
                                        <strong><q-chip class="text-weight-bold" color="deep-orange-3" style="font-size:25px;font-family: 'Simonetta', serif;">Client Name: {{this.selectedPayment.clientName}}</q-chip></strong>
                                    </div>
                                    <div class="q-pa-sm column col-8">
                                        <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="amount" @token="tokenCreated" @loading="loading = $event" outline>
                                        </stripe-elements>        
                                    </div>
                                    <div class="q-pa-sm column col-4">
                                        <q-btn outlined color="teal" class="col-12" style="height: 40px" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>PHP&nbsp;{{amount}}</b></q-btn>
                                    </div>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </q-dialog>
                <q-dialog v-model="receipt">
                    <q-card style="width: 1000px" class="my-card">
                        <q-card-section>
                            <div  class="row items-center q-pa-sm q-pl-lg">
                                 <img class="bg-deep-orange-4" style="height:80%;width:130px" src="statics/pics/logo.png" >
                                 <div class="q-pl-md text-h6 text-weight-bold" style="font-family: 'Simonetta', serif;">
                                 Carmen's Diner and Catering Services
                                 </div> 
                                 <div class="q-pl-lg q-ml-lg text-weight-light" style="font-family: 'Simonetta', serif;">
                                 Stall #7 J. Center Bldg., Vista Verte Ave., San Isidro, Cainta Rizal
                                 </div> 
                            </div>
                            <div class="row">
                                <div class="col-7">
                                    <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Client Name:</b> {{this.selectedReceipt.clientName}}</p></div>
                                    <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Contact No.:</b> {{this.selectedReceipt.clientNumber}}</p></div>
                                </div>
                                <div class="col-5 q-pl-lg">
                                    <div><p class="col q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Date of Delivery:</b> {{this.selectedReceipt.deliveryDate}}</p></div>
                                    <div><p class="col q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Delivery Time:</b> {{this.selectedReceipt.deliveryTime}}</p></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Where:</b> {{this.selectedReceipt.clientAddress}} {{this.selectedReceipt.city}}</p></div>
                            </div>
                            <div>
                            <q-list dense class="q-pt-sm q-pb-none q-mb-none text-weight-bold">
                                <q-item dense class="q-pb-none q-mb-none">
                                    <q-item-section class="col-1" top>
                                        <q-item-label>Qty</q-item-label>
                                    </q-item-section>
                                    <q-item-section class="col-4 items-center" top>
                                        <q-item-label>Description</q-item-label>
                                    </q-item-section>
                                    <q-item-section class="col-3 items-center" top>
                                        <q-item-label>Size</q-item-label>    
                                    </q-item-section>
                                    <q-item-section class="col-2 items-center" top>
                                        <q-item-label>Unit Price</q-item-label>    
                                    </q-item-section>
                                    <q-item-section class="col-2 items-center" top>
                                        <q-item-label>Total Price</q-item-label>    
                                    </q-item-section>
                                </q-item>
                                <q-item dense style="margin-top: -10px" class="q-mt-none q-pt-none text-weight-bold" v-for="(i, index) in this.selectedReceipt.orders" :key="index">
                                    <q-item-section class="col-1">
                                        <q-item-label lines="2">{{i.qty}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section class="col-4 items-center">
                                        <q-item-label lines="2">{{i.foodName}}</q-item-label>
                                    </q-item-section>
                                     <q-item-section class="col-3 items-center">
                                        <q-item-label class="text-weight-bold" style="font-family: 'Roboto Slab', serif;">{{i.size}}( {{i.min}} - {{i.max}})</q-item-label>
                                    </q-item-section>
                                    <q-item-section class="col-2 items-center">
                                        <q-item-label class="text-weight-bold" style="font-family: 'Roboto Slab', serif;">{{i.price}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section class="col-2 items-center">
                                        <q-item-label class="text-weight-bold" style="font-family: 'Roboto Slab', serif;">{{i.price * i.qty}}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            </div>
                            <q-separator />
                            <div class="col-2 q-pa-sm" style="float: right">
                                <div><p class="col"><b>SubTotal: </b> <b class="text-h6" style="font-family: 'Roboto Slab', serif;">{{this.selectedReceipt.totalToPayAmount}}</b></p></div>
                            </div>
                        </q-card-section>
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
            selectedReceipt: [],
            receipt: false,
            splitterModel: 20,
            amount: 0,
            publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
            token: null,
            charge: null,
            enteramount: 0,
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
        openReceipt(props){
            this.receiptID = props['.key']
            this.selectedReceipt = props 
            this.receipt = true
        },
        updatePaymentCash(){
            var PaymentBago = {
                clientAddress: this.selectedPayment.clientAddress,
                clientName: this.selectedPayment.clientName,
                clientNumber: this.selectedPayment.clientNumber,
                deliveryDate: this.selectedPayment.deliveryDate,
                deliveryTime: this.selectedPayment.deliveryTime,
                firstName: this.selectedPayment.firstName,
                firstPayment: parseInt(this.selectedPayment.firstPayment) + parseInt(this.enteramount),
                lastName: this.selectedPayment.lastName,
                message: this.selectedPayment.message,
                orders: this.selectedPayment.orders,
                paymentTerms: this.selectedPayment.paymentTerms,
                totalToPayAmount: this.selectedPayment.totalToPayAmount
            }
                this.$q.dialog({
                    title: 'Update Payment',
                    message: 'Update This Payment?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                this.$firestoreApp.collection('partyTrayOrders').doc(this.reserveId).set(PaymentBago)
                .then((ref) =>{
                    let paymentDetails = {
                        clientReservationKey: this.reserveId,
                        clientPaymentType: 'CASH',
                        clientTokenID: 'CASH',
                        clientPayDetails: {
                            amount: this.enteramount,
                            source: 'COD'
                        },
                        clientUID: 'WALK-IN',
                        transactionType: 'WALK-IN',
                        forPartyTray: true,
                        clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD')
                    }
                    this.$firestoreApp.collection('Payments').add(paymentDetails)
                    .then(()=>{
                        this.$q.notify({
                            message: 'Payments Updated!',
                            icon: 'mdi-folder-plus-outline',
                            color: 'orange-8',
                            textColor: 'white',
                            position: 'center'
                            })
                            this.enterAmount = 0
                            this.payment = false
                        })  
                    })
                })
        },
        updatePaymentCard(){
            var PaymentBago = {
                clientAddress: this.selectedPayment.clientAddress,
                clientName: this.selectedPayment.clientName,
                clientNumber: this.selectedPayment.clientNumber,
                deliveryDate: this.selectedPayment.deliveryDate,
                deliveryTime: this.selectedPayment.deliveryTime,
                firstName: this.selectedPayment.firstName,
                firstPayment: parseInt(this.selectedPayment.firstPayment) + parseInt(this.enteramount),
                lastName: this.selectedPayment.lastName,
                message: this.selectedPayment.message,
                orders: this.selectedPayment.orders,
                paymentTerms: this.selectedPayment.paymentTerms,
                totalToPayAmount: this.selectedPayment.totalToPayAmount
            }
            this.$firestoreApp.collection('partyTrayOrders').doc(this.reserveId).set(PaymentBago)
            .then((ref) =>{
                let paymentDetails = {
                    clientReservationKey: this.reserveId,
                    clientPaymentType: 'CARD',
                    clientTokenID: this.token.id,
                    clientPayDetails: this.paydetails,
                    clientUID: 'WALK-IN',
                    transactionType: 'WALK-IN',
                    forPartyTray: true,
                    clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD')
                }
                this.$firestoreApp.collection('Payments').add(paymentDetails)  
                .then(()=>{
                        this.$q.notify({
                            message: 'Payments Updated!',
                            icon: 'mdi-folder-plus-outline',
                            color: 'orange-8',
                            textColor: 'white',
                            position: 'center'
                            })
                            this.enterAmount = 0
                            this.payment = false
                        })  
            })
        },
        openPayment (props) {
          this.reserveId = props['.key']
          console.log(this.reserveId, 'id')
          this.selectedPayment = props 
          this.payment = true
          this.enteramount = parseInt(props.totalToPayAmount) - parseInt(props.firstPayment)
          this.amount = parseInt(props.totalToPayAmount) - parseInt(props.firstPayment)
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
            if(this.amount === 0){
                this.$q.dialog({
                    title: `Unable to Continue??`,
                    message: 'Please Select Payment Type??',
                    color: 'pink-6',
                    textColor: 'grey',
                    icon: 'negative',
                    ok: 'Ok'
                })
            }else{
                this.$q.dialog({
                    title: 'Update Payment',
                    message: 'Update This Payment?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => {
                    this.paydetails = charge
                    this.updatePaymentCard()
                    this.$q.notify({
                        message: 'Payments Updated!',
                        icon: 'mdi-folder-plus-outline',
                        color: 'orange-8',
                        textColor: 'white',
                        position: 'center'
                    })
                    this.enterAmount = 0
                    this.payment = false
                })
            }
        }
    }
}
</script>