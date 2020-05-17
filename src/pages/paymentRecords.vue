<template>
    <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <div class="bg-grey-9 fit q-py-md">
                        <q-select v-model="forPayment" :options="['Reservations','Party Trays']" label="Show Payment For" filled="" color="deep-orange-4" bg-color="white" class="q-mx-sm text-white" />
                        <div class="text-h6 text-center text-white q-py-md" style="font-family: 'Roboto Slab', serif;">FILTER OPTIONS</div>
                        <q-tabs v-model="type" vertical class="text-grey-8 bg-grey-9" active-color="white" active-bg-color="deep-orange-4">
                            <q-tab class="text-white" name="all" value="all" style="font-family: 'Roboto Slab', serif;" label="ALL PAYMENTS"></q-tab>
                            <q-tab class="text-white" name="full" value="full" style="font-family: 'Roboto Slab', serif;" label="FULLY PAID"></q-tab>
                            <q-tab class="text-white" name="due" value="due" style="font-family: 'Roboto Slab', serif;" label="DUE PAYMENTS"></q-tab>
                            <q-tab class="text-white" name="over" value="over" style="font-family: 'Roboto Slab', serif;" label="OVERDUE PAYMENTS"></q-tab>
                            <q-tab class="text-white" name="wbalance" value="wbalance" style="font-family: 'Roboto Slab', serif;" label="WITH BALANCES"></q-tab>
                            
                        </q-tabs>
                        

                    </div>
                    
                </template>    
                <template v-slot:after>   
                    <div class="row justify-between q-px-lg">
                        <div class="text-h5 q-my-lg row">
                            <div>{{returnType}} Reports ({{forPayment}})</div>
                            <q-input v-model="filter" clearable dense type="text" label="Search Records" color="deep-orange-4" class="q-ml-md" outlined icon="search" >
                                <template v-slot:prepend>
                                    <q-icon name="search" color="deep-orange-4"/>
                                </template>
                            </q-input>
                        </div>
                        <q-btn fab icon="print" @click="printdialog = true" color="deep-orange-4" class="q-my-md">
                            <q-tooltip>
                            Print Report
                            </q-tooltip>
                        </q-btn>
                    </div>

                    <div class="q-mx-lg" >
                        <q-table  hide-bottom="" flat :data="returnReports" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                            <template v-slot:body="props">
                                <q-tr :props="props" class="cursor-pointer">
                                    <q-td key="clientReserveDate" :props="props">
                                        {{$moment(props.row.clientReserveDate).format('LL')}}
                                    </q-td>
                                    <q-td key="id" :props="props" class="text-grey-10">
                                        {{props.row.id}}
                                    </q-td>

                                    <q-td key="clientName" :props="props" class="text-capitalize">
                                        {{props.row.clientName}}
                                    </q-td>
                                    <q-td key="status" :props="props">
                                        <div class="text-overline" :class="returnColor(props.row.status)">{{props.row.status}}</div>
                                    </q-td>   
                                    <q-td key="toPayAmount" :props="props"  class="text-grey-10">
                                        <b>₱ {{ formatNumber(props.row.toPayAmount)}}.00</b>
                                    </q-td>
                                    <q-td key="totalPaid" :props="props"  class="text-grey-10">
                                        ₱ {{ formatNumber(props.row.totalPaid)}}.00
                                    </q-td>
                                    <q-td key="balance" :props="props">
                                        <b>₱ {{ formatNumber(props.row.balance)}}.00</b>
                                    </q-td>
                                                         
                                </q-tr>
                            </template>
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-grey-9 text-white text-overline">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    
                                >
                                    {{ col.label }}
                                </q-th>
                                </q-tr>
                            </template>                        
                        </q-table>
                        <div class="row q-mt-md" v-show="returnReports.length > 0">
                            <div class="col">

                            </div>
                            <div class="q-pa-md col-4 bg-white">
                                <div class="text-overline text-center q-mb-md">OVERVIEW</div>
                                <div class="row justify-between">
                                    <div class="">Total Forcasted Sales</div>
                                    <div class=" text-deep-orange-4"><b>₱ {{ formatNumber(returnToPay) }}.00</b></div>
                                </div>
                                <div class="row justify-between">
                                    <div class="">Total Paid</div>
                                    <div class=" text-grey-10">- ₱ {{ formatNumber(returnTotalPaid) }}.00</div>
                                </div>
                                <q-separator inset spaced="" />
                                <div class="row justify-between">
                                    <div class="">Accounts Recievables</div>
                                    <div class="text-deep-orange-4"><b>₱ {{ formatNumber(returnToPay - returnTotalPaid) }}.00</b></div>
                                </div>
                            </div>                            
                        </div>


                    </div>
                </template>
                </q-splitter>
        </template>
        <q-dialog
            v-model="printdialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="shadow-0">
            <q-bar>
                <q-space />
                <q-btn class="bodyText" dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section>
                <div align="center">
                    <img class="q-ma-none q-pa-none" style="height:80%;width:300px" src="statics/pics/carmen-logo.png">
                </div>
                <div class="text-grey-8" align="center">
                    <p class="q-pb-none q-mb-none">J Center Bldg. Vista Verde Ave., Vista Verde Executive Village Cainta, Rizal</p>
                    <p class="q-pt-none q-mt-none">09175057991 . 09772774030</p>
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <div class="q-mx-lg" >
                <q-table  hide-bottom="" flat :data="returnReports" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                    <template v-slot:body="props">
                        <q-tr :props="props" class="cursor-pointer">
                            <q-td key="clientReserveDate" :props="props">
                                {{$moment(props.row.clientReserveDate).format('LL')}}
                            </q-td>
                            <q-td key="id" :props="props" class="text-grey-10">
                                {{props.row.id}}
                            </q-td>

                            <q-td key="clientName" :props="props" class="text-capitalize">
                                {{props.row.clientName}}
                            </q-td>
                            <q-td key="status" :props="props">
                                <div class="text-overline" :class="returnColor(props.row.status)">{{props.row.status}}</div>
                            </q-td>   
                            <q-td key="toPayAmount" :props="props"  class="text-grey-10">
                                <b>₱ {{ formatNumber(props.row.toPayAmount)}}.00</b>
                            </q-td>
                            <q-td key="totalPaid" :props="props"  class="text-grey-10">
                                ₱ {{ formatNumber(props.row.totalPaid)}}.00
                            </q-td>
                            <q-td key="balance" :props="props">
                                <b>₱ {{ formatNumber(props.row.balance)}}.00</b>
                            </q-td>
                                                    
                        </q-tr>
                    </template>
                    <template v-slot:header="props">
                        <q-tr :props="props" class="bg-grey-9 text-white text-overline">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                            
                        >
                            {{ col.label }}
                        </q-th>
                        </q-tr>
                    </template>                        
                </q-table>
                <div class="row">
                    <div class="col-6">
                        <div class="col q-pa-md">
                            <div class="text-h6">Prepared By:</div>
                            <br>
                            <div style="margin-top: -20px" class="q-pl-xl q-ml-xl text-h6">{{userEmail.toUpperCase()}}</div>
                        </div>
                        <q-page-sticky position="bottom" :offset="[18, 18]">
                                <q-btn class="bodyText" label="Print" color="pink-3" @click="printNow" icon="print" />
                        </q-page-sticky>
                    </div>
                    <div class="col-6" v-show="returnReports.length > 0">
                        <div class="col">

                        </div>
                        <div class="q-pa-md col-4 bg-white">
                            <div class="text-overline text-center q-mb-md">OVERVIEW</div>
                            <div class="row justify-between">
                                <div class="">Total Forcasted Sales</div>
                                <div class=" text-deep-orange-4"><b>₱ {{ formatNumber(returnToPay) }}.00</b></div>
                            </div>
                            <div class="row justify-between">
                                <div class="">Total Paid</div>
                                <div class=" text-grey-10">- ₱ {{ formatNumber(returnTotalPaid) }}.00</div>
                            </div>
                            <q-separator inset spaced="" />
                            <div class="row justify-between">
                                <div class="">Accounts Recievables</div>
                                <div class="text-deep-orange-4"><b>₱ {{ formatNumber(returnToPay - returnTotalPaid) }}.00</b></div>
                            </div>
                        </div>                            
                    </div>
                </div>

            </div>
            </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
import { format } from 'quasar'
import { date } from 'quasar'
const { capitalize } = format
export default {
    data(){
        return {
            printdialog: false,
            maximizedToggle: true,
            forPayment: 'Reservations',
            type: 'all',
            splitterModel: 20,
            PartyTrayLabel: [],
            Payments: [],
            Reservation: [],
            partyTrayOrders: [],
            filter: '',
            columns: [
                    { name: 'clientReserveDate', required: true, label: 'Reserved Date', align: 'left', field: 'clientReserveDate', sortable: true },
                    { name: 'id', required: true, label: 'Reservation ID', align: 'left', field: 'id', sortable: true },
                    { name: 'clientName', required: true, label: 'Client Name', align: 'left', field: 'clientName', sortable: true },
                    { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true },
                    { name: 'toPayAmount', required: true, label: 'Total Amount', align: 'right', field: 'toPayAmount', sortable: true },
                    { name: 'totalPaid', required: true, label: 'Total Paid', align: 'right', field: 'totalPaid', sortable: true },
                    { name: 'balance', required: true, label: 'Balance', align: 'right', field: 'balance', sortable: true },
            ],
            pagination: {
                sortBy: 'clientReserveDate',
                descending: false,
                page: 1,
                rowsPerPage: 0,
            },
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

              } else {
                  // No user is signed in.
                  self.$router.push('/')
              }
          })
    },
    mounted () {
        this.$binding('Payments', this.$firestoreApp.collection('Payments'))
            .then(Payments => {
            console.log(Payments, 'Payments')
            }),
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
            }),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
            .then(partyTrayOrders => {
            console.log(partyTrayOrders, 'partyTrayOrders')
            })
    },
    computed: {
        returnReports(){
            try {
                let baseArray

                if(this.forPayment == 'Reservations'){
                    baseArray = this.Reservation
                } else {
                    baseArray = this.partyTrayOrders
                }

                let loop = baseArray.map(a=>{
                    let payments = []
                    for(var x = 0; x < this.Payments.length; x++){
                        if(a['.key'] == this.Payments[x].clientReservationKey){
                            payments.push(this.Payments[x])
                        }
                    }
                    console.log(a,'check')
                    a.clientReserveDate = date.formatDate(a.clientReserveDate,'YYYY-MM-DD')
                    a.id = a['.key'].substr(14).toUpperCase()
                    let reservename = this.forPayment == 'Reservations' ? a.clientFName+' '+a.clientLName : a.firstName+' '+a.lastName
                    a.clientName = reservename
                    a.totalPaid = this.$lodash.sumBy(payments,'clientPayDetails.amount')
                    a.toPayAmount = this.forPayment == 'Reservations' ? a.clientTotalPayment : a.totalToPayAmount

                    let totalAmount = this.forPayment == 'Reservations' ? a.clientTotalPayment : a.totalToPayAmount
                    a.balance = totalAmount - a.totalPaid
                    a.allPayments = payments
                    a.status = this.returnStatus(a)
                    return a
                })

                console.log(loop,'loop')

                let type = this.type
                if(type == 'full'){
                    return loop.filter(a=>{return a.status == 'FULLY PAID'})
                } else if(type == 'wbalance'){
                    return loop.filter(a=>{return a.status == 'W/ BALANCE'})
                } else if(type == 'all'){
                    return loop
                } else if(type == 'due'){
                    return loop.filter(a=>{return a.status == 'DUE DATE'})
                } else {
                    return loop.filter(a=>{return a.status == 'OVERDUE'})
                }

            } catch (error) {
                return []
            }

        },
        returnType(){
            try {
                let type = this.type
                if(type == 'all'){
                    return 'All Payments'
                } else if (type == 'wbalance'){
                    return 'With Balances'
                } else if (type == 'full'){
                    return 'Fully Paid Payment'
                } else if (type == 'over'){
                    return 'Overdue'
                } else {
                    return 'Due Payment'
                }
            } catch (error) {
                return 'All Payments'
            }
        },
        returnTotalPaid(){
            try {
                return this.$lodash.sumBy(this.returnReports,'totalPaid')
            } catch (error) {
                return 0
            }
        },
        returnToPay(){
            try {
                return this.$lodash.sumBy(this.returnReports,'toPayAmount')
            } catch (error) {
                return 0
            }
        },
    },
    methods:{
        printNow(){
            window.print();
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        changeLabel(type){
                if(type == 'day'){
                    this.columns[0].label = 'Date'
                    this.pagination.sortBy = 'date'
                } else if (type == 'month'){
                    this.columns[0].label = 'Month'
                    this.pagination.sortBy = 'basis'
                } else {
                    this.columns[0].label = 'Year'
                }            
        },
        returnStatus(details){
            let status = ''
            let today = this.$moment(new Date()).format('L')
            let string1 = today.split('/')
            let dateBasis = this.$moment(details.clientReserveDate).format('L')
            let string = dateBasis.split('/')

            let newDateToday = new Date(string1[2], parseInt(string1[0]) - 1, string1[1]) 
            let newDateBasis = new Date(string[2], parseInt(string[0]) - 1, string[1]) 
            let diff = date.getDateDiff( newDateBasis, newDateToday, 'days')

            if(details.balance == 0){
                status = 'FULLY PAID'
            } else if(dateBasis < today){
                status = 'OVERDUE' 
            } else if(diff <= 14){
                status = 'DUE DATE'                 
            } else {
                status = 'W/ BALANCE'
            }
            return status
        },
        returnColor(status){
            if(status == 'FULLY PAID'){
                return 'text-teal'
            } else if (status == 'W/ BALANCE') {
                return 'text-blue-10'
            } else if ( status == 'DUE DATE'){
                return 'text-warning'
            } else {
                return 'text-red'
            }
        },
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