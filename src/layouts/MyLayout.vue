<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-deep-orange-4" bordered style="border: 1px solid;border-color: #FFDAB9">
      <q-toolbar>
        <q-btn color="white" flat dense round @click="drawer = !drawer" icon="menu" elevated aria-label="Menu"/>
        <q-toolbar-title class="row">
          <img style="height:80%;width:130px" src="statics/pics/logo.png" @click="$router.push('/')">
          <div class="q-pl-xl mobile-hide" style="font-family: 'Simonetta', serif;">
            Carmen's Diner and Catering Services
          </div>  
        </q-toolbar-title>
      </q-toolbar>

      <div class="absolute-right row items-center q-gutter-sm q-pr-md">
<!-- BUTTON FOR NOTIFICATIONS -->
          <q-btn flat dense color="white" icon="notifications" @click="$router.push('/notification')">
              <q-badge color="blue" floating>{{returnNotifLength.length}}</q-badge>
          </q-btn>
<!-- END OF BUTTON FOR NOTIF -->
            <div>
                <q-btn dense flat color="white" icon="mdi-settings">
                  <q-menu>
                    <div class="row no-wrap q-pa-md">
                      <div class="column items-center">
                        <!-- <div class="text-subtitle1 q-mt-md q-mb-xs">{{email}}</div> -->
                        <q-btn color="deep-orange-4" label="Logout" @click="logout" push size="sm" v-close-popup/>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
            </div>
          </div>
    </q-header>
    <q-drawer
        v-model="drawer"
        overlay
        show-if-above
        :width="300"
        :breakpoint="400"
        content-class="bg-grey-9 text-white"
        style="overflow: hidden;"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding style="height: 500px;">
            <q-item clickable @click="$router.push('/walkinreserve')" v-show="returnPermissions.walkIn">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-walk" />
              </q-item-section>
              <q-item-section>
                <q-item-label >Walk-In Reservation</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click="$router.push('/customReservation')" v-show="returnPermissions.walkIn" disable="">
              <q-item-section avatar>
                <q-icon color="white" name="category" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Custom Walk-In Reservation</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click="$router.push('/partytrayordering')" v-show="returnPermissions.partyTrayOrdering" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-cart-outline" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Party Tray Ordering</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable :to="{ name: 'dashboard' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-view-dashboard" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'staffdashboard' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-view-dashboard" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Staff Dashboard</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable :to="{ name: 'reservation' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-calendar-range" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Reservation</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'partytrayreserve' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-cart" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Party Tray Reservations</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'cancelled' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-close" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cancelled Reservations</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'calendar' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-calendar" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Calendar</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'staffscheduling' }" active-class="text-white bg-deep-orange-4">
              <q-item-section avatar>
                <q-icon color="white" name="event_note" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Staff Scheduling</q-item-label>
              </q-item-section>
            </q-item>

            <q-expansion-item
              expand-separator
              icon="assessment"
              label="Reports"
            >
              <q-item clickable :to="{ name: 'salesReport' }" active-class="text-white bg-deep-orange-4">
                <q-item-section avatar class="q-pl-xl">
                  <q-icon color="white" name="assessment" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Reservation Sales</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable :to="{ name: 'traySalesReport' }" active-class="text-white bg-deep-orange-4">
                <q-item-section avatar class="q-pl-xl">
                  <q-icon color="white" name="fastfood" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Party Tray Sales</q-item-label>
                </q-item-section>
              </q-item>              
              <q-item clickable :to="{ name: 'topChoices' }" active-class="text-white bg-deep-orange-4">
                <q-item-section avatar class="q-pl-xl">
                  <q-icon color="white" name="bar_chart" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Top Choices</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable :to="{ name: 'paymentRecords' }" active-class="text-white bg-deep-orange-4">
                <q-item-section avatar class="q-pl-xl">
                  <q-icon color="white" name="payment" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Payment Records</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="mdi-settings-outline"
              label="File Management"
              default-opened
              
              v-show="returnPermissions.food || returnPermissions.partyTray || returnPermissions.packages || returnPermissions.others"
            >
                  <q-item clickable :to="{ name: 'foodmanage' }" v-show="returnPermissions.food" active-class="text-white bg-deep-orange-4">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon color="white" name="fastfood" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Food Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'partytraymanage' }" v-show="returnPermissions.partyTray" active-class="text-white bg-deep-orange-4">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon color="white" name="fastfood" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Party Trays Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'package' }" v-show="returnPermissions.packages" active-class="text-white bg-deep-orange-4">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon color="white" name="assignment" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Package Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'otherManage' }" v-show="returnPermissions.others" active-class="text-white bg-deep-orange-4">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon color="white" name="mdi-table-chair" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Other Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'users' }" v-show="returnPermissions.users" active-class="text-white bg-deep-orange-4">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon color="white" name="people" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Users Management</q-item-label>
                    </q-item-section>
                  </q-item>

            </q-expansion-item>

            <!-- <q-item clickable @click="$router.push('/monitor')">
              <q-item-section avatar>
                <q-icon color="white" name="event_available" />
              </q-item-section>
              <q-item-section>
                <q-item-label >Order Monitoring</q-item-label>
              </q-item-section>
            </q-item> -->

            <!-- <q-item clickable @click="$router.push('/statusupdate')">
              <q-item-section avatar>
                <q-icon color="white" name="event_available" />
              </q-item-section>
              <q-item-section>
                <q-item-label >Status Update</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click="$router.push('/mobreservation')">
              <q-item-section avatar>
                <q-icon color="white" name="mdi-calendar-range" />
              </q-item-section>
              <q-item-section>
                <q-item-label >Reservation</q-item-label>
              </q-item-section>
           </q-item> -->
        
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px;" >
          <div class="absolute-bottom bg-transparent" >
            <q-avatar color="deep-orange-4" size="56px" class="q-my-sm" text-color="white" style="filter: none;">{{userEmail.charAt(0).toUpperCase()}}</q-avatar>
            <div style="font-size:25px;">{{userEmail.toUpperCase()}}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container style="background-color: #F5F2F2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import firebase from 'firebase'
import { date } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
            drawer: false,
            userEmail: '',
            uid: '',
            permissions: {},
            accountLoggedIn: {},
            dashboardUsers: [],
            AdminNotifications: [],
            Reservation: [],
            partyTrayOrders: [],
            Payments: [],
            StaffSchedules: [],
            Customers: [],
      }
  },
  created() {
          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              
              if (user) {
                let gg = {...user}
                console.log('createdUser',user)
                console.log('createdUser',user.uid)
                let username = gg.email.toString().split('@')
                self.userEmail = username[0]
                self.accountLoggedIn = gg

                // let index = this.$lodash.findIndex(this.dashboardUsers,a=>{
                //   return a.userName == username[0]
                // })
                // if(index == -1){
                //     this.$firebase.auth().signOut()
                //     .then(() => {
                //     this.$router.push('/')
                //   })

                // }
              } else {
                  // No user is signed in.
                  self.$router.push('/')
              }
          })
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
  computed: {
    returnPermissions(){
      try{
        let user = this.accountLoggedIn
        console.log(user)
        if (user) {
         let permission = this.$lodash.filter(this.dashboardUsers, a=>{
           return a['.key'] == user.uid
         })
         console.log(permission,'permission')
         return permission[0].permissions
        } else {
          console.log('err')
          return {}
        }

      } catch(err){
        console.log(err,'err')
        return {}
      }
    },
    returnUserDetails(){
      try {
          return this.$lodash.filter(this.dashboardUsers, a=>{
           return a['.key'] == user.uid
         })[0]       
      } catch (error) {
        return {}
      }
    },
    returnUserNotifications(){
        try {
            let user = this.$firebase.auth().currentUser

            let details =  this.dashboardUsers.filter(a=>{
                return a['.key'] == user.uid
            })[0]

            console.log(details,'details user')
            if(details.position == 'Admin'){
                console.log(this.$lodash.orderBy(this.returnNotifsWithTypes,'dateTime','desc'),'types')
                return this.$lodash.orderBy(this.returnNotifsWithTypes,'dateTime','desc')
            } else if(details.position == 'Staff' || details.position == 'Delivery Boy'){
                let filter = this.returnNotifsWithTypes.filter(a=>{
                    return a.typeOf == 'schedule' && a.staffKey == user.uid
                })
                console.log(this.$lodash.orderBy(filter,'dateTime','desc'),'types')
                return this.$lodash.orderBy(filter,'dateTime','desc')
            } else {
                let filter = this.returnNotifsWithTypes.filter(a=>{
                    return a.typeOf != 'schedule' || a.typeOf != 'status'
                })     
                return this.$lodash.orderBy(filter,'dateTime','desc')               
            }

            
            return ''
        } catch (error) {
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
                a.clientName = this.returnCustomerData(a.userID).displayName
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
            return []
        }
    },
    returnNotifLength(){
      let today = date.formatDate(new Date(), 'YYYY-MM-DD')
      let length = this.returnUserNotifications.filter(a=>{
        return today == date.formatDate(a.dateTime, 'YYYY-MM-DD')
      })
      console.log(length,'length')
      return length
    }
  },
  methods: {
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
                        a.clientName= a.clientFName+ ' '+a.clientLName
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
    logout(){
      this.$q.dialog({
                title: `Are you sure you want to logout?`,
                type: 'negative',
                color: 'negative',
                textColor: 'white',
                icon: 'warning',
                ok: 'Ok',
                cancel: 'Cancel'
                
            }).onOk(()=>{
                    this.$q.loading.show({
                  message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>'
                  })
                  this.timer = setTimeout(() => {
                  this.$q.loading.hide()
                  this.timer = void 0
                  }, 2000)  
                  // hiding in 3s  
                    this.$firebase.auth().signOut()
                    .then(() => {
                    this.$router.push('/')
                  })
            })
            
    }
  },
}
</script>
<style type = "text/css">
        .listwidth {
            width: 200px;
          }
      
</style>
