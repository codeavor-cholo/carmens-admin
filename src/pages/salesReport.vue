<template>
    <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <div class="bg-grey-9 fit">
                        <div class="text-h6 text-center text-white q-py-md" style="font-family: 'Roboto Slab', serif;">FILTER OPTIONS</div>
                        <q-tabs v-model="type" vertical class="text-grey-8 bg-grey-9" active-color="white" active-bg-color="deep-orange-4">
                            <q-tab class="text-white" name="day" value="day" style="font-family: 'Roboto Slab', serif;" label="DAILY SALES"></q-tab>
                            <q-tab class="text-white" name="month" value="month" style="font-family: 'Roboto Slab', serif;" label="MONTHLY SALES"></q-tab>
                            <q-tab class="text-white" name="year" value="year" style="font-family: 'Roboto Slab', serif;" label="YEARLY SALES"></q-tab>
                        </q-tabs>


                    </div>
                    
                </template>    
                <template v-slot:after>   
                    <div class="row justify-between q-px-lg">
                        <div class="text-h5 q-my-lg row">
                            <div>{{returnType}} Reservation Sales</div>
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
                        <q-table  hide-bottom=""  :data="returnReports" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                <q-td key="date" :props="props">
                                    {{type == 'day' ? $moment(props.row.date).format('LL') : props.row.date }}
                                </q-td>
                                <q-td key="totalSales" :props="props" class="text-grey-10">
                                ₱ {{ formatNumber(props.row.totalSales) }}.00
                                </q-td>
                                </q-tr>
                            </template>
                            <template v-slot:header="props">
                                <q-tr :props="props" class="bg-grey-9 text-white text-overline">
                                <q-th
                                    v-for="col in props.cols"
                                    :key="col.name"
                                    :props="props"
                                    v-show="col.name !== 'basis'"
                                    
                                >
                                    {{ col.label }}
                                </q-th>
                                </q-tr>
                            </template>                        
                        </q-table>
                        <div class="row justify-between q-pa-md">
                            <div class="text-h6">Total Sales</div>
                            <div class="text-h6 text-deep-orange-4"><b>₱ {{ formatNumber(returnTotalSales) }}.00</b></div>
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
                            <q-table  hide-bottom="" flat  :data="returnReports" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                    <q-td key="date" :props="props">
                                        {{type == 'day' ? $moment(props.row.date).format('LL') : props.row.date }}
                                    </q-td>
                                    <q-td key="totalSales" :props="props" class="text-grey-10">
                                    ₱ {{ formatNumber(props.row.totalSales) }}.00
                                    </q-td>
                                    </q-tr>
                                </template>
                                <template v-slot:header="props">
                                    <q-tr :props="props" class="bg-grey-9 text-white text-overline">
                                    <q-th
                                        v-for="col in props.cols"
                                        :key="col.name"
                                        :props="props"
                                        v-show="col.name !== 'basis'"
                                        
                                    >
                                        {{ col.label }}
                                    </q-th>
                                    </q-tr>
                                </template>                        
                            </q-table>
                            <div class="row justify-between q-pa-md">
                                <div class="text-h6">Total Sales</div>
                                <div class="text-h6 text-deep-orange-4"><b>₱ {{ formatNumber(returnTotalSales) }}.00</b></div>
                            </div>
                            <div class="col q-pa-md">
                                <div class="text-h6">Prepared By:</div>
                                <br>
                                <div style="margin-top: -20px" class="q-pl-xl q-ml-xl text-h6">{{userEmail.toUpperCase()}}</div>
                            </div>
                            <q-page-sticky position="bottom" :offset="[18, 18]">
                                <q-btn class="bodyText" label="Print" color="pink-3" @click="printNow" icon="print" />
                            </q-page-sticky>
                        </div>
                    </q-card-section>
                    </q-card>
                </q-dialog>
    </q-page>
</template>
<script>
import { format } from 'quasar'
const { capitalize } = format
export default {
    data(){
        return {
            printdialog: false,
            maximizedToggle: true,
            type: 'day',
            splitterModel: 20,
            PartyTrayLabel: [],
            Payments: [],
            filter: '',
            columns: [
                    { name: 'date', required: true, label: 'Date', align: 'left', field: 'date', sortable: true },
                    { name: 'basis', label: 'basis', align: 'left', field: 'basis', sortable: true},
                    { name: 'totalSales', required: true, label: 'Total Sales', align: 'right', field: 'totalSales', sortable: true },
            ],
            pagination: {
                sortBy: 'date',
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
        this.$binding('PartyTrayLabel', this.$firestoreApp.collection('PartyTrayLabel'))
            .then(PartyTrayLabel => {
            console.log(PartyTrayLabel, 'PartyTrayLabel')
            }),
        this.$binding('Payments', this.$firestoreApp.collection('Payments'))
            .then(Payments => {
            console.log(Payments, 'Payments')
            })
    },
    computed: {
        returnReports(){
            try {
                let reports = []
                let filter = this.$lodash.filter(this.Payments,a=>{
                    return a.forPartyTray == undefined
                })
                console.log(filter,'filter')
                let group = this.$lodash.groupBy(filter,'clientPaymentDate')
                console.log(group,'group')

                let map = this.$lodash.map(group,function(value,key){
                    return {
                        date: key,
                        paymentArray: value,
                    }
                })

                for(var x = 0; x < map.length; x++){
                    let sum = this.$lodash.sumBy(map[x].paymentArray, a=>{
                        return parseInt(a.clientPayDetails.amount)
                    })
                    map[x].totalSales = sum
                }

                console.log(map,'map')
                if(this.type == 'day'){
                    let reMap = map.map(a=>{
                        a.basis = this.$moment(a.date).format('LL')
                        return a
                    })
                    console.log(reMap,'reMap')
                    reports = reMap
                } else if (this.type == 'month'){
                    let map2 = this.$lodash.map(map,a=>{
                        let date = this.$moment(a.date).format('LL')
                        let orderBase = this.$moment(a.date).format('YYYYM')
                        let string = date.split(' ')
                        a.basis = orderBase
                        a.month = string[0] + ' ' + string[2]
                        return a
                    })
                    console.log(map2,'map2')

                    let group2 = this.$lodash.groupBy(map2,'month')
                    console.log(group2,'group2')

                    reports = this.returnSales(group2)
                } else if (this.type == 'year'){
                    let map3 = this.$lodash.map(map,a=>{
                        let date = this.$moment(a.date).format('LL')
                        let string = date.split(' ')
                        a.year = string[2]
                        return a
                    })
                    console.log(map3,'year')

                    let group3 = this.$lodash.groupBy(map3,'year')
                    console.log(group3,'group3') 
                    
                    reports = this.returnSales(group3)

                } else {
                    reports = []
                }
                return reports 

            } catch (error) {
                return []
            }

        },
        returnTotalSales(){
            try {
                return this.$lodash.sumBy(this.returnReports,'totalSales')
            } catch (error) {
                return 0
            }
        },
        returnType(){
            try {
                let type = this.type
                if(type == 'day'){
                    return 'Daily'
                } else if (type == 'month'){
                    return 'Monthly'
                } else {
                    return 'Yearly'
                }
            } catch (error) {
                return 'Daily'
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
        returnSales(group){
            let map3 = this.$lodash.map(group,function(value,key){
                // console.log(data,'data')
                return {
                    date: key,
                    dataArray: value
                }
            })

            for(var y = 0; y < map3.length; y++){
                let sum = this.$lodash.sumBy(map3[y].dataArray, a=>{
                    return parseInt(a.totalSales)
                })
                map3[y].totalSales = sum
                map3[y].basis = map3[y].dataArray[0].basis
            }
            console.log(map3,'map3')
            return map3
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