<template>
    <q-page>
        <q-list class="q-pt-md" separator>
            <q-item>
                <q-item-section>
                    <div class="row justify-between">    
                        <div class="">
                            <q-item-label>Name of the customer</q-item-label>
                            <q-item-label caption>{{order.clientName}}</q-item-label>
                            <q-item-label>Address</q-item-label>
                            <q-item-label caption>{{order.clientAddress}}, {{order.city}}</q-item-label>
                            <q-item-label>Delivery Date & Time</q-item-label>
                            <q-item-label caption>{{$moment(order.clientReserveDate).format('LL')}}, {{formatTimeInput(order.deliveryTime)}}</q-item-label>
                        </div>
                        <div class="">
                            <div  v-if="order.totalToPayAmount > order.firstPayment">
                                <q-btn outline color="deep-orange-4" label="Payment" @click="payment = true"/>  
                                <q-item-label caption class="q-mt-md">(COD) Balance: <br><b>₱ {{order.totalToPayAmount - order.firstPayment}}.00</b></q-item-label>
                            </div>
                            <q-chip icon="check" label="FULLY PAID" v-else color="green" text-color="white"/>                           
                        </div>
                    </div>
                <q-item-label class="text-center q-my-md">Orders to deliver</q-item-label>
                    <q-list bordered separator>
                        <q-item v-for="(item,i) in order.orders" :key="i">
                            <q-item-section>
                            <div class="row justify-between q-pa-md">
                                <q-avatar size="70px" square="">
                                <img :src="item.foodPic">
                                </q-avatar>
                                <div class=" items-center text-right">
                                    <q-item-label overline>{{item.foodName}}</q-item-label>
                                    <q-item-label caption>₱ {{item.price}} <b>x {{item.qty}}</b></q-item-label>
                                    <q-item-label caption>{{item.size}}</q-item-label>
                                    <q-item-label caption>₱ {{item.price * item.qty}}</q-item-label>
                                </div>
                            </div>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section class="text-right q-pr-lg">
                            <q-item-label>Total Price: &nbsp;&nbsp;&nbsp;₱ {{order.totalToPayAmount}}.00</q-item-label>
                            <div v-show="order.totalToPayAmount > order.firstPayment" class="column q-gutter-sm">
                            <q-item-label>50% Payment: &nbsp;&nbsp;&nbsp;- ₱ {{order.firstPayment}}.00</q-item-label>
                            <q-item-label><hr></q-item-label>
                            <q-item-label>(COD) Balance: &nbsp;&nbsp;&nbsp;<b>₱ {{order.totalToPayAmount - order.firstPayment}}.00</b></q-item-label>
                            </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <div class="row items-center q-gutter-sm justify-center q-pt-md">
                        <q-icon name="local_shipping" style="font-size: 1.5rem" />
                        <div class="q-mr-sm"><b>Latest Status:</b></div>
                        <q-chip class="text-overline" text-color="white" color="deep-orange-4" :label="returnLatestStatus" />
                    </div>
                    <div class="q-pt-sm">
                        <q-btn flat class="full-width" color="deep-orange-4" @click="$router.push('/status/'+$route.params.id)" label="View Delivery Status" icon-right="keyboard_arrow_right" />
                        <q-btn flat class="full-width" color="grey-10" @click="$router.push('/staffdashboard')" label="BACK TO STAFF DASHBOARD" icon="keyboard_arrow_left" />
                    </div>
                </q-item-section>      
            </q-item>
        </q-list>


        <q-dialog v-model="payment" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Payment Here</div>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup />
                <q-btn flat label="Add address" v-close-popup />
                </q-card-actions>
        </q-card>
        </q-dialog>
    </q-page>    
</template>

<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      payment: false,
      orderId: '',
      order: null,
      EventStatus: []
    }
  },
  created(){
      this.orderId = this.$route.params.id
  },
  mounted(){
    this.$binding('order', this.$firestoreApp.collection('partyTrayOrders').doc(this.orderId))
    .then(order => {
    console.log(order, 'order')
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
            return 'Orders Standby'
        }
    }  
  },
  methods:{
    formatTimeInput(time){
        //get time to format for display
        let baseDate = new Date(2020,1,1)
        let arr = time.split(':')
        let formatTime = date.addToDate(baseDate, {hours:arr[0],minutes:arr[1]})

        return this.$moment(formatTime).format('LT')
    },
  }
}
</script>