<template>
    <q-page class="q-pt-md q-pa-md">
        <div class="text-right">
            
        </div>
        <div class="row justify-between">    
            <div>
                <span class="text-weight-bold">Event Name:</span> <br>
                <span class="text-h6">{{reservation.clientEvent}}</span>
            </div>
            <div  v-if="reservation.clientTotalPayment > returnPaidAmountTotal">
                <q-btn outline color="deep-orange-4" label="Payment" @click="payment = true, paymentAmount = reservation.clientTotalPayment - returnPaidAmountTotal"/>  
                <q-item-label caption class="q-mt-md">(On Event Day) Balance: <br><b>₱ {{reservation.clientTotalPayment - returnPaidAmountTotal}}.00</b></q-item-label>
            </div>
            <q-chip icon="check" label="FULLY PAID" v-else color="green" text-color="white"/>      
        </div>
        <div class="column q-pt-sm q-gutter-sm">
            <div class="text-weight-bold">Name of Customer: <br> <span class="text-caption">{{reservation.clientFName}} {{reservation.clientLName}}</span></div>
            <div class="text-weight-bold">Date of Event: <br> <span class="text-caption">{{reservation.clientReserveDate}}</span></div>
            <div class="row q-pr-lg">
                <div class="col text-weight-bold">Time Start: <br> <span class="text-caption">{{reservation.clientStartTime}}</span></div> 
                <div class="text-weight-bold q-pr-xl">Time End: <br> <span class="text-caption">{{reservation.clientEndTime}}</span></div>
            </div>
            <div class="text-weight-bold">Place of Event: <br> <span class="text-caption">{{reservation.clientPlace}}, {{reservation.clientCity}}</span></div>
            <div class="text-weight-bold">Guest: <br> <span class="text-caption">{{reservation.clientPax}}</span></div>
            <div class="text-weight-bold">Email Address: <br> <span class="text-caption">{{reservation.clientEmail}}</span></div> 
            <div class="text-weight-bold">Motif: <br> <span class="text-caption">{{reservation.clientMotif}}</span></div>
            <div class="text-weight-bold" v-show="returnSelectedPackage !== null">Package Name: <br> <span class="text-caption">{{returnSelectedPackage.name}}</span></div>
        </div>
                <div class="q-py-sm text-weight-bold">
                    Foods: 
                </div>
                <q-list bordered separator>
                        <q-item v-for="(food,i) in reservation.clientFoodChoice" :key="i">
                            <q-item-section>
                            <div class="row items-center justify-between q-px-sm">
                                <img :src="food.foodPic" style="width:50px;height:45px">
                                <div class="text-right col-8">
                                    <q-item-label class="ellipsis-2-lines">{{food.foodName}}</q-item-label>
                                    <q-item-label caption>{{food.category}}</q-item-label>
                                </div>
                            </div>
                            </q-item-section>
                        </q-item>
                </q-list>
                <div class="text-weight-bold q-py-md">
                    Add Ons: 
                </div>
                 <q-list bordered separator>
                    <q-item v-for="(add,i) in reservation.clientAddOns" :key="i">
                        <q-item-section>
                            <div class="row justify-between">
                                <div>{{add.addonsNames}}</div>
                                 <div>x {{add.addonsQuantities}}</div>
                            </div>
                        </q-item-section>
                    </q-item>

                 </q-list>
                <div class="text-weight-bold q-py-md">
                    Inclusions: 
                </div>
                 <q-list bordered separator>
                    <q-item v-for="(inclusion,i) in returnSelectedPackage.inclusions" :key="i">
                        <q-item-section>{{inclusion.inclusion}}</q-item-section>
                    </q-item>
                 </q-list>

                    <div class="row items-center q-gutter-sm justify-center q-pt-md">
                        <q-icon name="local_shipping" style="font-size: 1.5rem" />
                        <div class="q-mr-sm"><b>Latest Status:</b></div>
                        <q-chip class="text-overline" text-color="white" color="deep-orange-4" :label="returnLatestStatus" />
                    </div>
                    <div class="q-pt-sm">
                        <q-btn flat class="full-width" color="deep-orange-4" @click="$router.push('/status/'+$route.params.id)" label="View Event Status" icon-right="keyboard_arrow_right" />
                        <q-btn flat class="full-width" color="grey-10" @click="$router.push('/staffdashboard')" label="BACK TO STAFF DASHBOARD" icon="keyboard_arrow_left" />
                    </div>

<!-- PAYMENT DIALOG -->
        <q-dialog v-model="payment">
            <q-card style="min-width: 350px" class="q-pa-sm">
                <q-card-section>
                <div class="text-h6">Payment Here</div>
                <q-input v-model="paymentAmount" type="number" label="Payment Amount" outlined="" readonly="" class="q-pt-md" rounded=""/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn color="deep-orange-4" icon="money" :label="'Pay ₱ '+paymentAmount+'.00'" @click="savePayment"  class="full-width"/>
                </q-card-actions>
        </q-card>
        </q-dialog>
<!-- END OF PAYMENT -->
    </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      payment: false,
      reservation: null,
      orderId: '',
      Payments: [],
      paymentAmount: 0,
      EventStatus: []
    }
  },
  created(){
    this.orderId = this.$route.params.id
  },
  mounted(){
    this.$binding('reservation', this.$firestoreApp.collection('Reservation').doc(this.orderId))
    .then(reservation => {
    console.log(reservation, 'reservation')
    }) ,
    this.$binding('Payments', this.$firestoreApp.collection('Payments').where('clientReservationKey', '==', this.orderId))
    .then(Payments => {
    console.log(Payments, 'Payments')
    }),
    this.$binding('EventStatus', this.$firestoreApp.collection('EventStatus'))
    .then(EventStatus => {
    console.log(EventStatus, 'EventStatus')
    })
  },
  computed:{
    returnLatestStatus(){
        let filter = this.$lodash.filter(this.EventStatus,a=>{
            return a.reservationKey == this.orderId
        })
        console.log(filter,'filter')
        if(filter.length > 0){
            return filter[filter.length - 1].status
        } else {
            return 'Event Standby'
        }
    },      
    returnSelectedPackage(){
        try {
            return this.reservation.clientSelectPackage
        } catch (error) {
            return {}
        }
    },
    returnPaidAmountTotal(){
        try {
            console.log(this.$lodash.sumBy(this.Payments,'clientPayDetails.amount'),'returnPaidAmountTotal') 
            return this.$lodash.sumBy(this.Payments,'clientPayDetails.amount')
        } catch (error) {
            return 0         
        }
    },
    returnFirstPayment(){
        try {
            console.log(this.Payments[0].clientPayDetails.amount,'returnFirstPayment')
            return this.Payments[0].clientPayDetails.amount
        } catch (error) {
            return 0
        }
    }  
  },
  methods:{
    savePayment(){
        let firstPayment = this.Payments[0]
        let payload = {
            clientPayDetails:{
                amount: this.paymentAmount,
                source: 'COD'
            },
            clientPaymentDate: date.formatDate(new Date(), 'YYYY-MM-DD'),
            clientPaymentType: 'COD',
            clientReservationKey: firstPayment.clientReservationKey,
            clientTokenID: '',
            clientUID: firstPayment.clientUID,
        }
        this.$q.dialog({
            title: 'Update Payment ?',
            message: 'This action cannot be undone.',
            ok: 'YES',
            cancel: 'NO',
            persistent: true
            }).onOk(() => {  
                console.log(payload,'payload')
                this.$firestoreApp.collection('Payments').add(payload)
                .then(()=>{
                    console.log('done')
                    this.$q.notify('PAYMENT UPDATED !')
                    this.payment = false
                })
                .catch(()=>{
                    console.log('error')
                })

            })    


    },
  }
}
</script>
