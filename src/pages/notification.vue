<template>
    <q-page id="page" class="q-pb-md">
        <div id="noti" class="text-weight-bold">
            Notifications
        </div>
        <div id="list">
            <q-list bordered separator>
                <div >
                <q-item clickable v-ripple v-for="(notif,i) in returnUserNotifications" :key="i">
                    <q-item-section v-if="notif.typeOf == 'reserve'">
                        <div id="newreserve" class="text-weight-medium">We have new Reservation.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientReserveDate}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientStartTime}} - {{notif.clientEndTime}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientPlace}}, {{notif.clientCity}}</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                    <q-item-section  v-else-if="notif.typeOf == 'order'">
                        <div id="newreserve" class="text-weight-medium">We have new Party Tray Order.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.deliveryDate}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.deliveryTime}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientAddress}}, {{notif.city}}</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                    <q-item-section v-else-if="notif.typeOf == 'schedule'">
                        <div id="newreserve" class="text-weight-medium" v-if="returnUserPosition() == 'Admin'">New Staff Schedule created.</div>
                        <div id="newreserve" class="text-weight-medium" v-else>You have new Schedule.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.type}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientReserveDate}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientStartTime}} - {{notif.clientEndTime}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientPlace}}, {{notif.clientCity}}</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                    <q-item-section v-else-if="notif.typeOf == 'payment'">
                        <div id="newreserve" class="text-weight-medium">We have new customer's payment.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>₱ {{formatNumber(notif.amount)}}.00</q-item-label>
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                    <q-item-section v-else>
                        <div id="newreserve" class="text-weight-medium">We have new status update.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.transactionType}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.status}}</q-item-label>
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                </q-item>
<!-- 
                <q-item clickable v-ripple >
                    <q-item-section>
                        <div id="newreserve" class="text-weight-medium">We have new Party Tray Order.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.deliveryDate}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.deliveryTime}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientAddress}}, {{notif.city}}</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple >
                    <q-item-section>
                        <div id="newreserve" class="text-weight-medium" v-if="returnUserPosition() == 'Admin'">New Staff Schedule created.</div>
                        <div id="newreserve" class="text-weight-medium" v-else>You have new Schedule.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.type}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientReserveDate}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientStartTime}} - {{notif.clientEndTime}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.clientPlace}}, {{notif.clientCity}}</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple >
                    <q-item-section>
                        <div id="newreserve" class="text-weight-medium">We have new customer's payment.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>₱ {{formatNumber(notif.amount)}}.00</q-item-label>
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple v-else>
                    <q-item-section>
                        <div id="newreserve" class="text-weight-medium">We have new status update.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>{{notif.clientName}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.transactionType}}</q-item-label>
                            <q-item-label class="text-deep-orange" caption>{{notif.status}}</q-item-label>
                        </div>
                        <q-item-label class="text-blue" caption>{{$moment(notif.dateTime).fromNow()}}</q-item-label>
                    </q-item-section>
                </q-item> -->
                </div>
            </q-list>
        </div>
    </q-page>
</template>
<script>
export default {
    data(){
        return {
            dashboardUsers: [],
            AdminNotifications: [],
            Reservation: [],
            partyTrayOrders: [],
            Payments: [],
            StaffSchedules: [],
            Customers: [],
            userPosition: ''
        }
    },
    created(){
        let user = this.$firebase.auth().currentUser

        let details =  this.dashboardUsers.filter(a=>{
            return a['.key'] == user.uid
        })[0]

        this.userPosition = details.position


    },
    mounted(){
        this.$binding('dashboardUsers', this.$firestoreApp.collection('dashboardUsers')),
        this.$binding('AdminNotifications', this.$firestoreApp.collection('AdminNotifications')),
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation')),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders')),
        this.$binding('Payments', this.$firestoreApp.collection('Payments')),
        this.$binding('StaffSchedules', this.$firestoreApp.collection('StaffSchedules')),
        this.$binding('Customers', this.$firestoreApp.collection('Customers'))
    },
    computed:{
        returnUserNotifications(){
            try {
                let user = this.$firebase.auth().currentUser
                console.log(user,'usere firebsase')
                let details =  this.dashboardUsers.filter(a=>{
                    return a['.key'] == user.uid
                })[0]

                console.log(details,'details user')
                if(details.position == 'Admin'){
                    return this.$lodash.orderBy(this.returnNotifsWithTypes, a=>{
                        return new Date(a.dateTime)
                    },'desc')
                } else if(details.position == 'Staff' || details.position == 'Delivery Boy'){
                    let filter = this.returnNotifsWithTypes.filter(a=>{
                        return a.typeOf == 'schedule' && a.staffKey == user.uid
                    })
                    return this.$lodash.orderBy(filter, a=>{
                        return new Date(a.dateTime)
                    },'desc')
                } else {
                    let filter = this.returnNotifsWithTypes.filter(a=>{
                        return a.typeOf != 'schedule' || a.typeOf != 'status'
                    })     
                    return this.$lodash.orderBy(filter, a=>{
                        return new Date(a.dateTime)
                    },'desc')             
                }

                
                return ''
            } catch (error) {
                console.log(error,'error in return admin')
                return []
            }
        },
        returnNotifsWithTypes(){
            try {
                let notifs = this.AdminNotifications.map(a=>{
                if(a.message.includes('Reservation')){
                    a.typeOf = 'reserve'
                    return {...a,...this.returnDataOfNotifs('reserve',a.reservationKey)}
                } else if (a.message.includes('Order')) {
                    a.typeOf = 'order'
                    return {...a,...this.returnDataOfNotifs('order',a.reservationKey)}
                } else if (a.message.includes('Payment')){
                    a.typeOf = 'payment'
                    if(a.userID == 'WALK-IN'){
                        a.clientName = 'WALK-IN'
                    } else {
                        a.clientName = this.returnCustomerData(a.userID).displayName
                    }
                    
                    return {...a,...this.returnDataOfNotifs('payment',a.paymentKey)}
                } else if (a.message.includes('Schedule')){
                    a.typeOf = 'schedule'
                    a.clientName = a.clientFName+ ' '+a.clientLName
                    return a
                } else {
                    a.typeOf = 'status'
                    return {...a,...this.returnDataOfNotifs('status',a.reservationKey)}
                }
                })
                return notifs
            } catch (error) {
                console.log(error,'returnNotifsWithTypes')
                return []
            }
        }
    },
    methods:{
        returnDataOfNotifs(typeOf,key){
            try {
                if(typeOf == 'reserve'){
                    return this.Reservation.filter(a=>{
                        return a['.key'] == key
                    })[0]
                } else if(typeOf == 'order'){
                    return this.partyTrayOrders.filter(a=>{
                        return a['.key'] == key
                    })[0]
                } else if(typeOf == 'payment'){
                    return this.Payments.filter(a=>{
                        return a['.key'] == key
                    })[0]
                } else {
                    let reserve = this.Reservation.concat(this.partyTrayOrders)
                    reserve.forEach(a=>{
                        if(a.deliveryDate == null){
                            a.transactionType = 'EVENT RESERVATION'
                            a.clientName = a.clientFName+ ' '+a.clientLName
                        } else {
                            a.transactionType = 'PARTY TRAY ORDER'
                            a.clientName= a.firstName+ ' '+a.lastName
                        }
                    })
                    console.log(reserve,'concat orders and reservation')
                    return reserve.filter(a=>{
                        return a['.key'] == key
                    })[0]
                }
            } catch (error) {
                return []
            }
        },
        returnCustomerData(key){
            try {
                return this.Customers.filter(a=>{
                    return a['.key'] == key
                })[0]
            } catch (error) {
                return []
            }
        },
        returnUserPosition(){
          try {
            let user = {...this.$firebase.auth().currentUser}
            return this.dashboardUsers.filter(a=>{
              return a['.key'] == user.uid
            })[0].position
          } catch (error) {
            return ''
          }
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
    }
}
</script>


<style type = "text/css">
    /* #page {
        padding-top:50px;
    } */
    #noti {
        font-size:30px;
        padding-left:10px;
        padding-bottom:10px;
        padding-top:20px;
    }
    #eve {
        font-size:17px;
        font-weight: bold;
    }
    #row {
        padding-right:25px;
    }
    #newreserve {
        font-size:22px;
    }
    

@media only screen and (min-width: 1000px) {
  #noti {
      padding-top:25px;
      padding-bottom:20px;
      font-size:30px;
      padding-left:350px;
  }
  #list{
      padding-left:400px;
      padding-right:400px;
  }
}

</style>