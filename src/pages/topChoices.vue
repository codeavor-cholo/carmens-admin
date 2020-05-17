<template>
    <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <div class="bg-grey-9 fit">
                        <div class="text-h6 text-center text-white q-py-md" style="font-family: 'Roboto Slab', serif;">FILTER OPTIONS</div>
                        <q-tabs v-model="type" vertical class="text-grey-8 bg-grey-9" active-color="white" active-bg-color="deep-orange-4" @input="changeLabel">
                            <q-tab class="text-white" name="packages" value="packages" style="font-family: 'Roboto Slab', serif;" label="TOP PACKAGES"></q-tab>
                            <q-tab class="text-white" name="foods" value="foods" style="font-family: 'Roboto Slab', serif;" label="TOP FOOD CHOICE"></q-tab>
                            <q-tab class="text-white" name="trays" value="trays" style="font-family: 'Roboto Slab', serif;" label="TOP PARTY TRAYS"></q-tab>
                        </q-tabs>


                    </div>
                    
                </template>    
                <template v-slot:after>   
                    <div class="row justify-between q-px-lg">
                        <div class="text-h5 q-my-lg row">
                            <div>Top {{returnType}}</div>
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
                    <q-table hide-bottom=""  flat :data="returnPopular" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                        <template v-slot:body="props">
                            <q-tr :props="props">
                            <q-td key="rank" :props="props" class="text-overline text-grey-10">
                                {{props.row.rank}}
                            </q-td>
                            <q-td key="name" :props="props" class="text-overline text-grey-10">
                            {{props.row.name}}
                            </q-td>
                            <q-td key="count" :props="props" class="text-overline text-grey-10">
                            {{props.row.count}}
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
                    <q-table hide-bottom="" dense flat :data="returnPopular" :binary-state-sort="true" :columns="columns" :pagination.sync="pagination" :filter="filter" class="full-width align-center ">
                        <template v-slot:body="props">
                            <q-tr :props="props">
                            <q-td key="rank" :props="props" class="text-overline text-grey-10">
                                {{props.row.rank}}
                            </q-td>
                            <q-td key="name" :props="props" class="text-overline text-grey-10">
                            {{props.row.name}}
                            </q-td>
                            <q-td key="count" :props="props" class="text-overline text-grey-10">
                            {{props.row.count}}
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
            type: 'packages',
            splitterModel: 20,
            partyTrayOrders: [],
            Reservation: [],
            filter: '',
            columns: [
                    { name: 'rank', required: true, label: 'Rank', align: 'left', field: 'rank', sortable: true },
                    { name: 'name', required: true, label: 'Package Name', align: 'left', field: 'name', sortable: true},
                    { name: 'count', required: true, label: 'Total Count', align: 'right', field: 'count', sortable: true },
            ],
            pagination: {
                sortBy: 'rank',
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
        returnPopular(){
            try {
                let reports = []
                if(this.type == 'packages'){

                    let notCustom = []
                    let map = this.Reservation.map(b=>{
                        let base = b
                        if(base.clientSelectPackage !== 'CUSTOMIZE'){
                            notCustom.push({name: base.clientSelectPackage.name})
                        }
                    })
                    console.log(notCustom,'notCustom')
                    let group = this.$lodash.groupBy(notCustom,'name')
                    console.log(group,'group')
                    let mapping = this.$lodash.map(group,function(value,key){
                        return {
                            name: key,
                            array: value,
                            count: value.length
                        }
                    })
                    console.log(mapping,'mapping')
                    let order = this.$lodash.orderBy(mapping,'count','desc')
                    console.log(order,'order')
                    reports = this.returnRanking(order)
                } else if (this.type == 'trays'){
                    let orders = []
                    let loop = this.partyTrayOrders.forEach(a=>{
                        for(var x = 0; x < a.orders.length; x++){
                            orders.push(a.orders[x])
                        }
                    })
                    console.log(orders,'orders')
                    let group3 = this.$lodash.groupBy(orders,'foodName')
                    console.log(group3,'group3')
                    let mapping3 = this.$lodash.map(group3,function(value,key){
                        return {
                            name: key,
                            array: value,
                            count: value.length
                        }
                    })
                    console.log(mapping3,'mapping3')
                    let order3 = this.$lodash.orderBy(mapping3,'count','desc')
                    console.log(order3,'order3')
                    reports = this.returnRanking(order3)                  
                } else {
                    let choices = []
                    let loop = this.Reservation.forEach(a=>{
                        for(var x = 0; x < a.clientFoodChoice.length; x++){
                            choices.push(a.clientFoodChoice[x])
                        }
                    })
                    console.log(choices,'choices')
                    let group2 = this.$lodash.groupBy(choices,'foodName')
                    console.log(group2,'group2')
                    let mapping2 = this.$lodash.map(group2,function(value,key){
                        return {
                            name: key,
                            array: value,
                            count: value.length
                        }
                    })
                    console.log(mapping2,'mapping2')
                    let order2 = this.$lodash.orderBy(mapping2,'count','desc')
                    console.log(order2,'order2')
                    reports = this.returnRanking(order2)
                }

                return reports
            } catch (error) {
                return []
            }
        },
        returnType(){
            try {
                let type = this.type
                if(type == 'packages'){
                    return 'Packages'
                } else if (type == 'foods'){
                    return 'Food Choices'
                } else if (type == 'trays'){
                    return 'Party Trays'                    
                } else {
                    return ''
                }
            } catch (error) {
                return 'Packages'
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
                if(type == 'packages'){
                    this.columns[1].label = 'Package Name'
                } else if (type == 'foods' || type == 'trays'){
                    this.columns[1].label = 'Food Name'
                } else {
                    this.columns[1].label = 'Name'
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
                    return a.totalSales
                })
                map3[y].totalSales = sum
                map3[y].basis = map3[y].dataArray[0].basis
            }
            console.log(map3,'map3')
            return map3
        },
        returnRanking(order){
            for(var y = 0; y < order.length; y++){
                order[y].rank = y + 1
            }  
            return order          
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