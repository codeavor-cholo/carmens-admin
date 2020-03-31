<template>
<q-page>
        <div>
            <div class="row">
                <div class="q-pl-xl col-5" style="font-size:60px;font-family: 'Domine', serif;">PARTY TRAYS</div>
                <div class="q-pa-sm items-center col-4">
                <q-input v-model="filter" dense style="width:400px; margin-top: 20px" color="pink-3" rounded standout="bg-white text-grey-8" clearable input-class="text-pink-3" label="Search Food" class="q-ma-md" outlined icon="search" >
                    <template v-slot:prepend>
                        <q-icon name="search" color="pink-3"/>
                    </template>
                </q-input>
                </div>
                <div class="q-pa-sm items-center col-3">
                    <q-btn dense style="background-color:#e4acbf;width:120px;margin-top:20px" text-color="white" label="view basket" @click="basket=true">
                        <q-badge color="grey-10" text-color="white" :label="returnLength" floating/>
                    </q-btn>
                </div>
            </div>          
        </div>
<!-- MOST POPULAR -->
            <q-table grid :data="returnWithPartyTrays" :columns="columns" :rows-per-page-options="[0]" :pagination.sync="pagination" hide-bottom :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                    <div class="q-pa-sm grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card flat class="my-card" style="width:230px;height: 250px" >
                            <div>
                                <q-img :src="props.row.foodPic" styl="height:200px" :ratio="4/3"/>
                            
                            <q-card-section side>
                            <q-list dense>
                                <div class="row items-center justify-between">
                                    <div class="col">    
                                        <div>
                                            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>{{props.row.foodName}}</b></div>
                                            <div style="font-size:12px">{{props.row.partyTrayPrice[0].price}} Pesos</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <q-btn round color="pink-3" @click="openDialog(props.row)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
                                    </div>
                                </div>
                            </q-list>
                            </q-card-section>
                            </div>
                        </q-card>
                    </div>
                </template>
            </q-table>
            <q-dialog v-model="addPorder" persistent="">
            <q-card class="text-center text-weight-bold" style="min-width: 400px">
                            <q-img
                                :src="this.selectedPorder.foodPic"
                                :ratio="4/3"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{this.selectedPorder.foodName}}
                                </div>
                            </q-img>
                            <div class="q-mt-md">
                            <span class="text-center text-weight-bold text-h6" style="font-family: 'Roboto Slab', serif;">PARTY TRAY SIZE/s AND PRICES</span>
                            </div>
                            <div class="q-pa-sm row q-pr-xl" v-for="(price, index) in this.selectedPorder.partyTrayPrice" :key="index">
                                <div class="col">                                
                                    <q-checkbox class="q-mt-md" keep-color color="deep-orange-4" dense :val="price" v-model="pOrderSelected" :label="price.label+' ( '+price.paxMin+' - '+price.paxMax+' ) ₱'+price.price" @input="checkIfRemoved(price)"/>
                                    <!-- {{ price.label }}({{price.paxMin}} - {{price.paxMax}}) for {{ price.price }}php -->
                                </div>
                                <div class="col-3">
                                    <q-input :rules="[val => val !== null && val !== '' || 'Please type quantity', val => val > 0 || 'Mininum value is 1']" color="grey-10" v-model="orderQty[price.label]" type="number" label="QTY" outlined="" dense v-show="returnStatus(price)"/>
                                </div>
                            </div>

                    <q-card-actions align="right" class="text-primary q-pa-md">
                        <q-btn flat color="grey-6" label="Cancel" v-close-popup @click="pOrderSelected = [], orderQty = []"/>
                        <q-btn flat color="deep-orange-4" label="Add To Basket" v-close-popup icon="shopping_cart" @click="addToBasket(selectedPorder)"/>
                    </q-card-actions>
                </q-card>
            </q-dialog>   

            <q-dialog v-model="basket" persistent >
                <q-card style="min-width:500px;border-radius:20px;" class="q-pa-lg">
                <div class="row justify-between">
                    <span class="text-h6 col">BASKET <span class="text-teal-6 text-subtitle2">({{returnLength}} ITEMS)</span></span>
                    <q-btn color="grey-10" icon="close" flat round  v-close-popup />
                </div>
                <q-card-section class="row items-center">
                    <q-scroll-area style="width: 100%; height: 400px;" :visible="false">
                    <q-list bordered class="full-width" separator="">
                    <q-item v-for="(items, index) in this.basketList" :key="index">
                        <q-item-section avatar>
                        <q-img :src="items.foodPic" :ratio="1" spinner-color="primary" spinner-size="82px" style="width:5em;border-radius:5px;" class="q-my-sm"/>
                        </q-item-section>
                        <q-item-section>
                        <q-item-label>{{items.foodName}}</q-item-label>
                        <q-item-label caption lines="1">Size: {{items.size}}({{items.min}}-{{items.max}})</q-item-label>
                        <q-item-label class="text-subtitle2" lines="1">₱ {{items.price}}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                        <q-btn color="grey-8" icon="delete" round size="md" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" />
                        <q-item-label caption class="q-mt-lg">x {{items.qty}}</q-item-label>
                        <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{items.price * items.qty}}</q-item-label>
                        </q-item-section>
                    </q-item>
                    </q-list>
                </q-scroll-area>
                </q-card-section>
                <q-card-actions align="right" class="justify-between row">
                    <div class="text-weight-bold text-h6" >SUBTOTAL : <span class="text-teal-6">{{returnSubTotal}}</span></div>
                    <q-btn :label="'Checkout '+returnLength+ ' items'" color="pink-6" v-close-popup @click="checkout = true"  class="text-weight-bold" outline=""/>
                </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="checkout" full-width >
              <div class="row">   
                <div class="column col-4 q-pr-sm">
                  <!-- <q-page-sticky position="top-left" class="q-pl-md"> -->
                    <q-card class="my-card" style="border: 5px solid;border-color: pink;height:555px;width: 420px">
                        <q-card-section class="bg-grey-3"> 
                        <div class="row q-gutter-sm items-center">
                        <q-icon name="shopping_cart" class="text-black" color="pink" style="font-size: 2rem;" />
                        <div class="text-h6">Basket Summary</div>
                        </div>
                    </q-card-section>
                    <!-- <q-separator color="black" /> -->
                    <q-card-section>
                        <div class="q-pt-sm">
                        <q-scroll-area style="width: 100%; height: 400px;" :visible="false">
                        <q-list separator>
                            <q-item v-for="(order,i) in basketList" :key="i">
                            <q-item-section>
                                <div class="row q-gutter-md">
                                <q-img :src="order.foodPic" :ratio="1" spinner-color="primary" spinner-size="82px" style="width:4em;border-radius:5px;" class=""/>
                                <div class="column">
                                    <q-item-label>{{order.foodName}}</q-item-label>
                                    <q-item-label caption lines="1">{{order.size}}</q-item-label>
                                    <q-item-label class="text-subtitle2" lines="1">₱ {{order.price}}</q-item-label>
                                </div>
                                </div>
                            </q-item-section>
                            <q-item-section side>
                            <!-- <q-btn color="grey-8" icon="clear" round size="sm" flat class="absolute-top-right q-ma-xs" @click="removeOrder(items)" /> -->
                            <q-item-label caption class="q-mt-lg">x {{order.qty}}</q-item-label>
                            <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ {{order.qty * order.price}}</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-list>
                        </q-scroll-area>
                        </div>
                    </q-card-section>
                    <div>
                        <q-separator color="black" />
                        <div class="row justify-end q-pa-md text-weight-bold text-h6 ">
                            <div>SUBTOTAL:</div>
                            <div class="q-ml-md text-teal-6"><b>₱ {{returnSubTotal}}</b></div>
                        </div>
                    </div>
                    </q-card>
               <!-- </q-page-sticky> -->
                </div>
                <div class="col-8">
                    <q-card class="my-card">
                        <q-stepper style="height: 555px" v-model="step" ref="stepper" color="pink-4" active-color="pink-3" inactive-color="grey-8" animated>
                            <q-step :name="1" title="Customer Details" icon="settings" :done="step > 1">
                                <div class="text-h5">Please fill-up all the details below </div>
                                <div class="column q-gutter-md q-pt-md">
                                    <div class="row">
                                        <div class="col q-pr-sm"><q-input outlined v-model="fname" color="pink-3" label="First Name" /></div>
                                        <div class="col q-pl-sm"><q-input outlined v-model="lname" color="pink-3" label="Last Name" /></div>
                                    </div>
                                    <q-input  outlined v-model="cnum"   mask="(####) ### - ####" fill-mask color="pink-3"  label="Contact Number" />
                                    <q-input color="pink-3" outlined v-model="address" label="Delivery Address" />
                                    <q-select class="q-mb-lg" color="pink-3" outlined v-model="city" :options="cityOpt" label="Select City" emit-value="" map-options=""/>
                                </div>
                            </q-step>
                            <q-step :name="2" title="Select Date and Time" icon="settings" :done="step > 2">
                                <div class="column q-gutter-md q-pt-md">
                                    <div class="text-h6">Delivery Date and Time</div>
                                    <div class="row">
                                        <div class="col-7">
                                            <q-date v-model="date" landscape minimal flat color="pink-6"/>
                                        </div>
                                        <div class="col-5 q-mt-xl q-pa-sm q-pr-xl">
                                            <q-input v-model="time" type="time" label="Delivery Time" outlined color="pink-6"/>
                                        </div>
                                    </div>
                                </div>
                            </q-step>
                            <q-step
                                :name="3"
                                title="Payment Details"
                                icon="credit_card"
                                :done="step > 3"
                            >
                            <div class="row">
                                <div class="q-pa-md col">
                                    <div class="text-h6 text-weight-bold">Order Summary</div>
                                    <div class="q-pl-md row q-gutter-sm items-center">
                                        <q-icon name="place" class="text-black" color="pink" style="font-size: 1.5rem;" />
                                        <div class="text-weight-medium">{{address}}, {{city}}</div>
                                    </div>
                                    <div class="row q-gutter-md">
                                        <div class="q-pl-xl">{{fname}} {{lname}}</div>
                                        <div>{{cnum}}</div>
                                    </div>
                                    <div class="q-pl-md row q-gutter-sm items-center">
                                        <q-icon name="date_range" class="text-black" color="pink" style="font-size: 1.5rem;" />
                                        <div class="text-weight-medium">{{date}}, {{time}}</div>
                                    </div>
                                </div>    
                                <div class="col q-pl-md q-pa-md ">    
                                    <div class="text-h6 text-weight-bold">Delivery Message</div>
                                    <q-input v-model="message" outlined="" dense type="textarea" class="bg-white" label="Leave your messages and requests here."/> 
                                </div>    
                            </div>  
                            <div class="row q-pa-md bg-grey-2">
                                <div class="col q-pa-sm text-weight-bold">Payment Options</div>
                                <div class="col-3"><q-radio v-model="paymentOpt" val="FULL" label="FULL PAYMENT" color="pink-6"/></div>
                                <div class="col q-pa-sm text-weight-bold">₱ {{returnSubTotal}}</div>
                                <div class="col-3"><q-radio v-model="paymentOpt" val="COD" label="50% PAYMENT, 50% COD" color="pink-6"/></div>
                                <div class="col q-pa-sm text-weight-bold">₱ {{returnSubTotal *.5}} NOW, ₱ {{returnSubTotal *.5}} LATER</div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    <q-select class="q-pa-sm full-width" color="deep-orange-4" @input="amounts" dense outlined v-model="selectPay" :options="payoptions" emit-value map-options label="Select Payment" />
                                </div>
                                <div v-show="this.selectPay === 'CARD'" class="col-6 q-pa-sm">
                                    <stripe-elements ref="elementsRef" :pk="publishableKey" :amount="returnToPay" @token="tokenCreated" @loading="loading = $event" outline class="col-8 q-mr-md">
                                    </stripe-elements>
                                </div>
                                <div v-show="this.selectPay === 'CARD'" class="col-3 q-pa-sm">
                                    <q-btn outlined color="teal" class="col" @click="submit">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(returnToPay)}}.00</b></q-btn>    
                                </div>
                                <div v-show="this.selectPay === 'CASH'" class="col-6 q-pa-sm">
                                    <q-input outlined v-model="amount" dense color="pink-3" label="Amount To Pay"/>
                                </div>
                                <div v-show="this.selectPay === 'CASH'" class="col-3 q-pa-sm">
                                    <q-btn outlined color="teal" class="col" @click="cashCheckout">PAY&nbsp;&nbsp;&nbsp;<b>P {{formatNumber(returnToPay)}}.00</b></q-btn>    
                                </div>
                            </div>
                            </q-step>

                            <template v-slot:navigation>
                                <q-stepper-navigation>
                                <q-btn @click="$refs.stepper.next()" color="teal" :label="step === 3 ? 'Finish' : 'Continue'" v-show="step !== 3"/>
                                <q-btn v-if="step > 1" color="grey-8" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </template>
                            </q-stepper>
                    </q-card>
                </div>
              </div>
        </q-dialog>   
</q-page>
</template>
<script>
import { date } from 'quasar'
import { StripeElements } from 'vue-stripe-checkout'
export default {
  components: {
    StripeElements
  },
  data () {
    return {
        selectPay: 'CARD',
        payoptions: [
            {label: 'CASH', value: 'CASH'},
            {label: 'CARD', value: 'CARD'},
        ],
        fname: '',
        lname: '',
        city: '',
        address: '',
        cnum: '',
        City: [],
        displayName: '',
        message: '',
        date: '',
        time: '09:00',
        paymentOpt: 'FULL',
        uid: '',
        //payment
        loading: false,
        amount: 0,
        publishableKey: 'pk_test_kUO5j8FaZUKitD1Qh3ibZ2HP00YkxaEOOS', 
        token: null,
        charge: null,
        step: 1,
        checkout: false,
        basket: false,
        basketList: [],
        orderQty: [],  
        pOrderSelected: [],
        search: '',
        storageRef: null,
        Food: [],
        FoodCategory: [],
        PartyTrayLabel: [],
        selectedPorder: [],
        CartItems: [],
        addPorder: false,
        filter: '',
        pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
        columns: [
            { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
            { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
            // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
        ],
    }
  }, 
  mounted (){   
      this.$binding('PartyTrayLabel', this.$firestoreApp.collection('PartyTrayLabel'))
        .then(PartyTrayLabel => {
        console.log(PartyTrayLabel, 'PartyTrayLabel')
        }),
        this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
        .then(FoodCategory => {
        console.log(FoodCategory, 'FoodCategory')
        }),
        this.$binding('City', this.$firestoreApp.collection('City'))
        .then(City => {
        console.log(City, 'City')
        }),
        this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        }),
        this.$binding('CartItems', this.$firestoreApp.collection('CartItems'))
        .then(CartItems => {
        console.log(CartItems, 'CartItems')
        })
  },
  computed: {
    cityOpt(){
        let optionss = this.City.map(m => {
            return {
                label: m.city,
                value: m.city
            }
        })
        return optionss
    },
    returnToPay(){
        let amount = this.returnSubTotal
        if(this.paymentOpt == 'FULL'){
            return amount
        } else {
            return amount * .5
        }
    },
    returnWithPartyTrays(){
        let party = this.$lodash.filter(this.Food, a=>{
            if(a.partyTrayPrice != null){
                return a
            } 
        })
        return party
    },
    amounts(){
        this.amount = this.returnToPay
    },
    returnLength(){
        try {
            return this.$lodash.sumBy(this.basketList,a=>{return parseInt(a.qty)})
        } catch (error) {
            return 0
        }
    },
    returnSubTotal(){
        try {
            return this.$lodash.sumBy(this.basketList,a=>{return parseInt(a.price) * parseInt(a.qty)})
        } catch (error) {
            console.log(error,'er')
            return 0
        }
    }
  },
  methods: {
    payCheckout(){
        let checkout = {
            clientName: this.fname +' '+this.lname,
            firstName: this.fname,
            lastName: this.lname,
            clientAddress: this.address,
            city: this.city,
            clientNumber: this.cnum,
            clientReserveDate: this.date,
            deliveryDate: this.date,
            deliveryTime: this.time,
            message: this.message,
            accountUID: 'WALK-IN',
            paymentTerms: this.paymentOpt,
            firstPayment: this.returnToPay,
            totalToPayAmount: this.returnSubTotal,
            orders: this.basketList,
            clientStartTime: this.formatTimeInput(this.time),
            clientEndTime: this.formatEndTimeInput(this.time)
        }
        let id = ''
        this.$firestoreApp.collection('partyTrayOrders').add(checkout)
        .then((ref) =>{
        id = ref.id //for payment saving
            let details = {
                clientReservationKey: id,
                clientPayDetails: this.charge,
                clientTokenID: this.token.id,
                clientPaymentType: 'CARD',
                clientUID: 'WALK-IN',
                forPartyTray: true,
            }
            console.log(details,'paydetails')
            this.$firestoreApp.collection('Payments').add(details)
            .then(()=>{
                this.$q.dialog({
                    title: `Successfully Placed Orders`,
                    message: 'Go to your account to see the details.',
                    color: 'teal',
                    textColor: 'grey',
                    icon: 'negative',
                    persistent: true,
                    ok: 'OK',
                }).onOk(()=>{
                    this.$router.push('/partytrayreserve')
                })
            })
        })
    },
    cashCheckout(){
        if(this.returnToPay === 0){
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
                title: `Continue with the payment?`,
                message: 'This action cannot be undone.',
                color: 'teal',
                textColor: 'grey',
                icon: 'negative',
                ok: 'YES',
                cancel: 'NO'
            }).onOk(()=>{
                this.loadingOn = true
                // this.paydetails = charge
                let checkout = {
                    clientName: this.fname +' '+this.lname,
                    firstName: this.fname,
                    lastName: this.lname,
                    clientAddress: this.address,
                    city: this.city,
                    clientNumber: this.cnum,
                    deliveryDate: this.date,
                    deliveryTime: this.time,
                    message: this.message,
                    accountUID: 'WALK-IN',
                    paymentTerms: this.paymentOpt,
                    firstPayment: this.returnToPay,
                    totalToPayAmount: this.returnSubTotal,
                    orders: this.basketList,
                    clientReserveDate: this.date,
                    clientStartTime: this.formatTimeInput(this.time),
                    clientEndTime: this.formatEndTimeInput(this.time)
                }
                let id = ''
                this.$firestoreApp.collection('partyTrayOrders').add(checkout)
                .then((ref) =>{
                id = ref.id //for payment saving
                    let details = {
                        clientReservationKey: id,
                        clientPayDetails: this.charge,
                        clientTokenID: 'CASH',
                        clientPaymentType: 'CASH',
                        clientUID: 'WALK-IN',
                        forPartyTray: true,
                    }
                    console.log(details,'paydetails')
                    this.$firestoreApp.collection('Payments').add(details)
                    .then(()=>{
                        this.$q.dialog({
                            title: `Successfully Placed Orders`,
                            message: 'Go to your account to see the details.',
                            color: 'teal',
                            textColor: 'grey',
                            icon: 'negative',
                            persistent: true,
                            ok: 'OK',
                        }).onOk(()=>{
                            this.$router.push('/partytrayreserve')
                        })
                    })
                })            
            })

        }
    },
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
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
         if(this.returnToPay === 0){
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
                    title: `Continue with the payment?`,
                    message: 'This action cannot be undone.',
                    color: 'teal',
                    textColor: 'grey',
                    icon: 'negative',
                    ok: 'YES',
                    cancel: 'NO'
                }).onOk(()=>{
                    this.loadingOn = true
                    this.paydetails = charge
                    this.payCheckout()
                    // this.reserveNowCard()            
                })

            }      
    },
    removeOrder(item){
      this.$q.dialog({
        title: 'Remove '+item.foodName + ' ?',
        message: 'Do you want to remove this item from your basket?.',
        ok: 'Yes',
        cancel: 'Cancel',
        persistent: true,
        color:'pink-6'
      }).onOk(() => {
        let orders = this.basketList
        let indexing = this.$lodash.findIndex(orders,a=>{
            return a.checkerName == item.checkerName
        })
        orders.splice(indexing,1)
      }).onCancel(()=>{
        this.basket = true
      })
    },
    openDialog(item){
        this.selectedPorder = item
        this.addPorder = true
    },
    formatTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },
    formatEndTimeInput(time){
      //get time to format for display
      let baseDate = new Date(2020,1,1)
      let arr = time.split(':')
      let formatTime = date.addToDate(baseDate, {hours:parseInt(arr[0])+1,minutes:arr[1]})

      return this.$moment(formatTime).format('LT')
    },    
    addToBasket(props){
        let item = {...props}
        let key = item['.key']
        delete item['.key']
        item.foodKey = key
        let size = this.pOrderSelected
        let qty = this.orderQty
        let keys = this.$lodash.keys(this.orderQty)
        console.log(keys,'keys')
        if(size.length != keys.length){
            // this.showCompleteBanner = true
            console.log('no sqty')
        }
        let merge = [] //sizes and qty
        for( var x = 0; x < size.length; x++){
            let m = {...size[x]}
            m.qty = qty[m.label]
            merge.push(m)
        }
        console.log(this.basketList,'merge')
        console.log(item,'itemAddToBasket')
        //end
        //checker to pra malaman kung may laman ung local storage
        if(this.basketList == null){ //kung walang laman array
            this.firstCart(item,merge[0],'')
        } else {
            for( var y= 0; y < merge.length; y++){
                this.openPorder(item,merge[y],'')
            }
        }
        this.pOrderSelected = []
        this.orderQty = []
    },
    openPorder(props,sizeQty,uid){
        let order = {...props}
        order.size = sizeQty.label
        order.price = sizeQty.price
        order.min = sizeQty.paxMin
        order.max = sizeQty.paxMax
        order.qty = sizeQty.qty
        order.checkerName = order.foodName+'_'+sizeQty.label
        delete order.partyTrayPrice
        //end
            let value = this.basketList
            let indexing = this.$lodash.findIndex(value,a=>{
                return a.checkerName == order.checkerName
            })
            // console.log(indexing,'indexing')
            if(indexing > -1){
                value[indexing].qty = parseInt(value[indexing].qty) + parseInt(order.qty)
            } else {
                value.push(order) 
            }
            this.basketList = value
            console.log(this.basketList, 'basketList')    
    },
    firstCart(props,sizeQty,uid){
        let order = {...props}
        order.size = sizeQty.label
        order.price = sizeQty.price
        order.min = sizeQty.paxMin
        order.max = sizeQty.paxMax
        order.qty = sizeQty.qty
        order.checkerName = order.foodName+'_'+sizeQty.label
        delete order.partyTrayPrice
        this.basketList.push(order)
        console.log(this.basketList, 'basketListsss')
    },
    returnStatus(size){
        // console.log(size)
        // console.log(this.pOrderSelected,'asd')
        let index = this.$lodash.findIndex(this.pOrderSelected,a=>{
            return a == size
        })
        // console.log(index)
        if(index > -1){
            return true
        } else {
            return false
        }
    },
    findIndexSelection(arr,val){
        return this.$lodash.findIndex(arr,val)
    },
    checkIfRemoved(category){
        var index = this.findIndexSelection(this.pOrderSelected,category.label)
        if(index == -1){
            delete this.orderQty[category.label]
            // console.log(this.orderQty,'this.orderQty')
        }
    },
  }
}
</script>