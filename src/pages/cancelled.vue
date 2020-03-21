<template>
    <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-grey-8 bg-grey-9 full-height relative-position" :active-color="tab != 'WOPP' ? 'white' : 'teal'" :active-bg-color="tab != 'WOPP' ? 'deep-orange-4' : 'teal-1'">
                    <div class="bg-grey-9 fit">
                        <div class="text-h6 text-center text-white q-py-md">FILTER OPTIONS</div>
                        <q-input v-model="filter" clearable type="text" label="Search Reservation" color="deep-orange-4" class="q-ma-md bg-white" outlined icon="search">
                            <template v-slot:prepend>
                                <q-icon name="search" color="deep-orange-4"/>
                            </template>
                        </q-input>
                    </div>
                    <q-tab name="reservation" style="font-family: 'Roboto Slab', serif;"   class="bg-grey-9 text-white" label="Reservation"></q-tab>
                </q-tabs>
                </template>    
                <template v-slot:after>   
                <q-btn label="ADD NEW RESERVATION" :to="{ name: 'walkinreserve' }" class="bg-deep-orange-4 q-my-md q-ml-md text-white">
                    <q-tooltip>
                                        Add New Reservation
                    </q-tooltip>
                </q-btn>
                    <div class="q-mx-lg" >
                        <q-table grid :data="Cancelled" :columns="columns" :filter="filter">
                            <template v-slot:item="props">
                                <div class="q-pa-md col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-style-transition " :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card flat class="my-card" style="border: 2px solid;border-color: #ffdab9" >
                                        <q-card-section side>
                                            <q-list dense>
                                            <q-item>
                                            <div class="full-width text-center text-grey-8 text-h6">
                                                <strong><q-chip class="text-weight-bold" color="deep-orange-3" style="font-size:25px;font-family: 'Simonetta', serif;">{{props.row.clientEvent}}</q-chip></strong>
                                            </div>
                                            <!-- <strong class="row full-width text-center text-grey-8 text-h6 text-weight-bold">{{props.row.clientFName}} {{props.row.clientLName}}'s<q-chip class="text-weight-bold text-h6">{{props.row.clientEvent}}</q-chip></strong>
                                            <q-strong class="text-center text-grey">{{props.row.clientReserveDate}}</q-strong>     -->
                                            </q-item>
                                         
                                            <div class="text-grey-8 column q-gutter-sm">
                                                <div><strong class="q-pb-none q-mb-none text-h6" style="font-family: 'Roboto Slab', serif;">Name: {{props.row.clientFName}} {{props.row.clientLName}}</strong></div>
                                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Date of Event:</b> {{props.row.clientReserveDate}}</p></div>
                                                <div class="row justify-between">
                                                    <p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>From:</b> {{props.row.clientStartTime}}</p>
                                                    <p class="q-pt-none q-mt-none q-pb-none q-mb-none q-pr-xl" style="font-family: 'Roboto Slab', serif;"><b>To:</b> {{props.row.clientEndTime}}</p>
                                                </div>
                                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Where:</b> {{props.row.clientPlace}} {{props.row.clientCity}}</p></div>
                                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Motif:</b> {{props.row.clientMotif}}</p></div>
                                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Guest:</b> {{props.row.clientPax}}</p></div>
                                                <div><p class="q-pt-none q-mt-none q-pb-none q-mb-none" style="font-family: 'Roboto Slab', serif;"><b>Email:</b> {{props.row.clientEmail}}</p></div>
                                                <div><p class="q-pt-none q-mt-none"></p></div>
                                            </div>
                                            <div style="margin-top: -10px" class="row items-center">
                                                <q-btn class="col" flat dense color="deep-orange-4" @click="openContract(props.row)" label="View Contract" />
                                            </div>
                                            
                                            <q-separator/>
                                            <q-slide-transition>
                                                <div v-show="expanded">
                                                <q-separator />
                                                  <q-list dense>
                                                    <q-item class="q-mt-sm text-grey-8" v-show="props.row.clientFoodChoice">
                                                        <span class="full-width text-center text-weight-bold" style="font-family: 'Roboto Slab', serif;">FOOD CATEGORIES</span>
                                                        </q-item>
                                                        <q-item v-for="(i, index) in props.row.clientFoodChoice" :key="index" class="text-grey-8">
                                                            <q-item-section>
                                                            <q-item-label><b>{{ i.category }}</b> - {{i.foodName}}</q-item-label>
                                                            </q-item-section>
                                                        </q-item>
                                                        <q-separator class="q-mt-sm"/>
                                                        <q-item class="q-mt-sm" v-show="props.row.clientSelectPackage.inclusions">
                                                        <span class="full-width text-center text-weight-bold text-grey-8" style="font-family: 'Roboto Slab', serif;">INCLUSIONS</span>
                                                        </q-item>
                                                        <q-item v-for="(price, index) in props.row.clientSelectPackage.inclusions" :key="index" class="text-grey-8">
                                                            <q-item-section>
                                                            <q-item-label> {{ price.inclusion }}</q-item-label>
                                                            </q-item-section>
                                                        </q-item>
                                                        <q-separator class="q-mt-sm"/>
                                                        <q-item class="q-mt-sm" v-show="props.row.clientAddOns.lenght != 0">
                                                        <span class="full-width text-center text-weight-bold text-grey-8" style="font-family: 'Roboto Slab', serif;">ADD-ONS</span>
                                                        </q-item>
                                                        <q-item v-for="(price, index) in props.row.clientAddOns" :key="index" class="text-grey-8">
                                                            <q-item-section>
                                                            <q-item-label>{{ price.addonsQuantities }} {{ price.addonsNames }}</q-item-label>
                                                            </q-item-section>
                                                    </q-item>
                                                  </q-list>
                                                </div>
                                            </q-slide-transition>
                                        </q-list>
                                        </q-card-section>
                                        <!-- color="expanded ? 'grey-8':'pink-3' " -->
                                        <q-card-actions>
                                            <q-btn color="deep-orange-4" @click="paybalance(props.row)" :disable="props.row.clientTotalPayment === props.row.clientPaidAmount"  :label="props.row.clientTotalPayment === props.row.clientPaidAmount ? 'NO BALANCE' : 'PAY BALANCE'" :icon="props.row.clientTotalPayment === props.row.clientPaidAmount ? '' : 'mdi-paypal'"  flat dense />
                                            <q-space />
                                            <q-btn :color="expanded ? 'grey-8':'deep-orange-4'" :label="expanded ? 'Hide Details' : 'View Details'" flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expandeds(props.row)" />
                                        </q-card-actions>
                                    </q-card>
                                </div>
                            </template>
                        </q-table>
                    </div>
                </template>
                </q-splitter>
                <q-dialog v-model="paymentDialog">
                    <q-card style="min-width: 1000px">
                        <q-card-section class="items-center">
                                <div class="row q-pa-sm">
                                    <div class="col-8 ">
                                        <div class="col q-pa-sm"> 
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Full Name:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientFName}}&nbsp;{{this.selectedReservation.clientLName}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Email Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientEmail}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientPlace}},&nbsp;{{this.selectedReservation.clientCity}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Time:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientStartTime}} - {{this.selectedReservation.clientEndTime}}</b></p>
                                        </div>
                                    </div>
                                    <div class="col-4 class-q-pa-sm">
                                        <div>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Date of Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientReserveDate}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientEvent}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Guest:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientPax}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Motif:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedReservation.clientMotif}}</b></p>
                                        </div>
                                    </div>
                                </div>
                            <q-select class="q-pa-md" style="margin-top: -20px" color="deep-orange-4" dense outlined v-model="selectPay" :options="payoptions" emit-value map-options label="Select Payment" />
                                <q-list dense>
                                    <q-item class="q-mt-none q-pt-none">
                                        <q-item-section class="q-ml-lg"><strong><div>Total Payment:</div></strong></q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>{{totalclientPayment}}php</strong></q-item-section>
                                    </q-item>
                                    <q-item class="q-mt-none q-pt-none">
                                        <q-item-section class="q-ml-lg"><strong><div>Total Paid Amount:</div></strong></q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>{{clientPaidAmounts}}php</strong></q-item-section>
                                    </q-item>
                                    <q-item class="q-mt-none q-pt-none">
                                        <q-item-section class="q-ml-lg"><strong><div>Total Balance:</div></strong></q-item-section>
                                        <q-item-section class="q-mr-lg" side><strong>{{clientBalance}}php</strong></q-item-section>
                                    </q-item>
                                </q-list>
                                <div v-show="this.selectPay === 'CASH'">
                                    <q-list dense>
                                        <q-item>
                                            <q-item-section class="q-ml-lg"><strong><b>Enter Amount to Pay:</b></strong></q-item-section>
                                            <q-item-section class="q-mr-lg" side><q-input type="number" error-message="Please Enter Amount that is less than or equal to your Balance" :error="!isValid" style="width: 500px" color="deep-orange-4" outlined dense v-model="enterAmount" label="Enter Amount To Pay"/></q-item-section>
                                        </q-item>
                                    </q-list>
                                </div>
                                <div v-show="this.selectPay == 'CARD'">
                                    <div>
                                        <q-list dense>
                                          <q-item>
                                            <q-item-section class="q-ml-lg"><strong><b>Enter Amount to Pay:</b></strong></q-item-section>
                                            <q-item-section class="q-mr-lg" side><q-input type="number" style="width: 500px" color="deep-orange-4" outlined dense v-model="enterAmount" error-message="Please Enter Amount that is less than or equal to your Balance" :error="!isValid" label="Enter Amount To Pay"/></q-item-section>
                                          </q-item>
                                      </q-list>
                                    </div>
                                    <div class="items-center full-width">
                                      <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="amount" @token="tokenCreated" @loading="loading = $event" outline style="border: 2px solid orange" class="q-pa-md">
                                      </stripe-elements>
                                      <!-- <button @click="submit">Pay ${{amount / 100}}</button> -->
                                    </div>
                              </div>
                        </q-card-section>

                        <q-card-actions align="right">
                        <q-btn v-show="this.selectPay == 'CASH'" @click="updatePaymentCash" label="Pay" icon="mdi-currency-php" color="teal" v-close-popup >&nbsp;{{enterAmount}}</q-btn>
                        <q-btn icon="mdi-paypal" v-show="this.selectPay == 'CARD'" outlined color="teal" size="md" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>PHP&nbsp;{{cardAmount}}</b></q-btn>
                        <q-btn label="Cancel" flat dense v-close-popup/>
                        </q-card-actions>
                    </q-card>
                </q-dialog>
                <q-dialog v-model="contract" full-height>
                    <q-card class="my-card shadow-0" style="width: 900px; max-width: 90vw;">
                        <q-card-section>
                             <div align="center">
                                <img class="q-ma-none q-pa-none" style="height:80%;width:300px" src="statics/pics/carmen-logo.png">
                              </div>
                              <div class="text-grey-8" align="center">
                                  <p class="q-pb-none q-mb-none">J Center Bldg. Vista Verde Ave., Vista Verde Executive Village Cainta, Rizal</p>
                                  <p class="q-pt-none q-mt-none">09175057991 . 09772774030</p>
                              </div>
                              <div class="row q-pa-sm" style="margin-top: -20px">
                                    <div class="col-8 ">
                                        <div class="col q-pa-sm"> 
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Full Name:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientFName}}&nbsp;{{this.selectedContract.clientLName}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Email Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientEmail}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event Address:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientPlace}},&nbsp;{{this.selectedContract.clientCity}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Time:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientStartTime}} - {{this.selectedContract.clientEndTime}}</b></p>
                                        </div>
                                    </div>
                                    <div class="col-4 class-q-pa-sm">
                                        <div>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif" >Date of Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientReserveDate}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Event:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientEvent}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Guest:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientPax}}</b></p>
                                            <p class="q-mt-none q-pt-none" style="font-family: 'Roboto Slab', serif; margin-top: -20px" >Motif:&nbsp;&nbsp; <b class="text-weight-bold">{{this.selectedContract.clientMotif}}</b></p>
                                        </div>
                                    </div>
                              </div>
                              <div class="row">
                                   <div class="col-8" style="margin-top: -20px">
                                        <q-list dense> 
                                                <q-item class="text-grey-8">
                                                <span class="full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">FOOD Choices</span>
                                                </q-item>
                                                <q-item v-for="(i, index) in this.selectedContract.clientFoodChoice" :key="index" >
                                                    <q-item-section class="text-weight-bold"> 
                                                    <q-item-label>{{i.foodName}}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                    </div>
                                    <div class="col-4" style="margin-top: -20px">
                                        <q-list class="q-ma-none q-pa-none" dense> 
                                            <q-item v-show="this.returnFree.inclusions" class="text-grey-8">
                                            <span class="full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Inclusions</span>
                                            </q-item>
                                            <q-item class="q-ma-none q-pa-none q-mb-none q-pb-none text-weight-bold" v-for="(i, index) in this.returnFree.inclusions" :key="index">
                                                <q-item-section>
                                                <q-item-label>{{i.inclusion}}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            <q-item class="q-ma-none q-pa-none q-mb-none q-pb-none text-weight-bold"  v-for="(i, index) in this.selectedContract.clientAddOns" :key="index">
                                                <q-item-section>
                                                <q-item-label>{{i.addonsQuantities}}x {{i.addonsNames}}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                </div>
                                <div>
                                    <div>
                                         <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Total Payment:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedContract.clientTotalPayment}}</span>
                                    </div>
                                    <div style="margin-top: -10px">
                                        <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Total Paid Amount:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedContract.clientPaidAmount}}</span>
                                    </div>
                                    <div style="margin-top: -10px">
                                        <span class="q-pl-xl full-width text-weight-bold" style="font-family: 'Roboto Slab', serif;">Balance:</span><span class="q-pl-xl text-h6 full-width text-weight-bold">{{this.selectedContract.clientTotalPayment - this.selectedContract.clientPaidAmount}}</span>
                                    </div>
                                </div>
                              </div>
                              <div class="text-grey-8" align="center">
                                  <p class="q-pb-none q-mb-none text-h6 text-weigh-bold">TERMS AND CONDITIONS</p>
                              </div>
                              <div class="text-weight-bold">
                                <q-list dense>
                                    <q-item class="column">
                                        <li>P 5,000.00 reservation fee is deductible from the total bill. Non refundable upon cancellation</li>
                                        <li>50% downpayment upon signing of contract. Full payment on the day of event.</li>
                                    </q-item>
                                </q-list>
                              </div>
                              <div class="text-h6 column items-center">
                                  <q-btn class="bodyText" label="Print" color="pink-3" @click="printNow" icon="print" />
                              </div>
                        </q-card-section>
                    </q-card>
                </q-dialog>
        </template>
    </q-page>
</template>
<script>
import { StripeElements } from 'vue-stripe-checkout';
import { date } from 'quasar'
// import moment from 'moment'
        export default {
        components: {
            StripeElements
        },    
        data(){
        return {
            startTime: '09:00',
            endTime: '13:00',
            dates: date.formatDate(new Date(), 'YYYY/MM/DD'),
            selectedContract: [],
            amount: 0,
            publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
            token: null,
            charge: null,
            enterAmount: 0,
            paymentDialog: false,
            paymentMode: 'clientBalance',
            clientBalance: false,
            client25balance: false,
            selectPay: '',
            payoptions: [
                {label: 'CASH', value: 'CASH'},
                {label: 'CARD', value: 'CARD'},
            ],
            tab: 'reservation',
            expanded: false,    
            showCompleteBanner: false,
            checkerArray: [],
            filter: '',
            splitterModel: 20,
            Inclusion: [],
            Packages: [],
            viandsArray:[],
            Reservation: [],
            viandsQty: [],
            selection: [],
            selectedInclusions: [],
            selectedReservation: [],
            hidelabel: true,
            packagePrice: 0,
            Food: [],
            contract: false,
            packageName: '',
            addPackageDialog: false,
            FoodCategory: [],
            clientBalance: 0,
            client25Balance: 0,
            filter: '',
            pagination: { sortBy: 'clientReserveDate', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'clientFName', required: true, label: 'First Name', align: 'center', field: 'clientFName', sortable: true },
                { name: 'clientLName', align: 'center', label: 'Last Name', field: 'clientLName', sortable: true },
            ]
        }
    },
    mounted () {
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
            }),
        this.$binding('Cancelled', this.$firestoreApp.collection('Cancelled'))
            .then(Cancelled => {
            console.log(Cancelled, 'Cancelled')
            }),
        this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
            .then(FoodCategory => {
            console.log(FoodCategory, 'FoodCategory')
            }),
        this.$binding('Food', this.$firestoreApp.collection('Food'))
            .then(Food => {
            console.log(Food, 'Food')
            }),
        this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            })
            ,
        this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            })
    },
    computed: {
        cardAmount(){
            if(this.enterAmount === 0 || this.enterAmount === ''){
                return this.amount = 0
            }else {
                return this.amount = parseInt(this.enterAmount)
            }
        },
        isValid () {
            if(this.selectedReservation.length === 0){
                return []
            }else{
                this.clientBalance = parseInt(this.selectedReservation.clientTotalPayment) - parseInt(this.selectedReservation.clientPaidAmount)
                return parseInt(this.enterAmount) <= parseInt(this.clientBalance)
            }
        },
        returnFree(){
         if(this.selectedContract === []){
                return []
            } else {
                let data = {...this.selectedContract.clientSelectPackage}
                var key = data['.key']
                delete data.__index
                delete data['.key']
                console.log(data, 'datas')
                return data
            }
        }
    },
    methods:{
        printNow(){
            // this.$htmlToPaper('printMe', () => {
            //   console.log('Printing completed or was cancelled!');
            window.print();
            // })
        },
        openContract(props){
            this.contractID = props['.key']
            this.selectedContract = props 
            this.contract = true
        },
        updatePaymentCash(){
            var PaymentBago = {
                clientReserveDate: this.selectedReservation.clientReserveDate,
                clientFName: this.selectedReservation.clientFName,
                clientLName: this.selectedReservation.clientLName,
                clientPlace: this.selectedReservation.clientPlace,
                clientCity: this.selectedReservation.clientCity,
                clientEmail: this.selectedReservation.clientEmail,
                clientEvent: this.selectedReservation.clientEvent,
                clientMotif: this.selectedReservation.clientMotif,
                clientPax: this.selectedReservation.clientPax,
                clientStartTime: this.selectedReservation.clientStartTime,
                clientEndTime: this.selectedReservation.clientEndTime,
                clientSelectPackage: this.selectedReservation.clientSelectPackage,
                clientFoodChoice: this.selectedReservation.clientFoodChoice,
                clientAddOns: this.selectedReservation.clientAddOns,
                clientTotalPayment: this.selectedReservation.clientTotalPayment,
                clientTotalDownPayment: this.selectedReservation.clientTotalDownPayment,
                clientPaidAmount: parseInt(this.selectedReservation.clientPaidAmount) + parseInt(this.enterAmount),
                clientPayDetails: this.selectedReservation.clientPayDetails,
                clientPaymentType: this.selectedReservation.clientPaymentType,
                clientTokenID: this.selectedReservation.clientTokenID,
                clientReserveType: this.selectedReservation.clientReserveType,
                clientDateofReserve: this.selectedReservation.clientDateofReserve,
            }
                this.$q.dialog({
                        title: 'Update Payment',
                        message: 'Update This Payment?',
                        ok: 'Yes',
                        cancel: 'Cancel'
                    }).onOk(() => { 
                    this.$firestoreApp.collection('Reservation').doc(this.reserveId).set(PaymentBago)
                    .then((ref) =>{
                        let paymentDetails = {
                            clientReservationKey: this.reserveId,
                            clientPayDetails: 'CASH',
                            clientTokenID: 'CASH',
                            clientPaymentType: 'CASH',
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
                            })  
                        })
                        this.enterAmount = 0
                        this.paymentDialog = false
                    })
        },
        updatePaymentCard(){
            var PaymentBago = {
                clientReserveDate: this.selectedReservation.clientReserveDate,
                clientFName: this.selectedReservation.clientFName,
                clientLName: this.selectedReservation.clientLName,
                clientPlace: this.selectedReservation.clientPlace,
                clientCity: this.selectedReservation.clientCity,
                clientEmail: this.selectedReservation.clientEmail,
                clientEvent: this.selectedReservation.clientEvent,
                clientMotif: this.selectedReservation.clientMotif,
                clientPax: this.selectedReservation.clientPax,
                clientStartTime: this.selectedReservation.clientStartTime,
                clientEndTime: this.selectedReservation.clientEndTime,
                clientSelectPackage: this.selectedReservation.clientSelectPackage,
                clientFoodChoice: this.selectedReservation.clientFoodChoice,
                clientAddOns: this.selectedReservation.clientAddOns,
                clientTotalPayment: this.selectedReservation.clientTotalPayment,
                clientTotalDownPayment: this.selectedReservation.clientTotalDownPayment,
                clientPaidAmount: parseInt(this.selectedReservation.clientPaidAmount) + parseInt(this.enterAmount),
                clientPayDetails: this.selectedReservation.clientPayDetails,
                clientPaymentType: this.selectedReservation.clientPaymentType,
                clientTokenID: this.selectedReservation.clientTokenID,
                clientReserveType: this.selectedReservation.clientReserveType,
                clientDateofReserve: this.selectedReservation.clientDateofReserve,
            } 
                    this.$firestoreApp.collection('Reservation').doc(this.reserveId).set(PaymentBago)
                    .then((ref) =>{
                        let paymentDetails = {
                            clientReservationKey: this.reserveId,
                            clientPayDetails: this.paydetails,
                            clientTokenID: this.token.id,
                            clientPaymentType: 'CARD',
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
                            })  
                        })
                        this.enterAmount = 0
        },
        expandeds(props){
            this.expanded = !this.expanded
        },
        paybalance(props){
            this.reserveId = props['.key']
            this.selectedReservation = props
            this.paymentDialog = true
            this.totalclientPayment = props.clientTotalPayment
            this.clientPaidAmounts = props.clientPaidAmount
            this.clientBalance = parseInt(props.clientTotalPayment) - parseInt(props.clientPaidAmount)
            this.client25balance = parseInt(props.clientTotalPayment) * 0.25
            this.enterAmount = parseInt(this.clientBalance)
            this.amount = parseInt(this.clientBalance)
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
                        this.paymentDialog = false
                })
            }
        }

  
    }
}
</script>
<style type = "text/css">
      @media print {
        .bodyText {
            display: none;
          }
        ::-webkit-scrollbar {
            display: none;
        }
      }
</style>