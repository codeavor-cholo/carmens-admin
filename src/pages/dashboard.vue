<template>
    <q-page class="flex flex-center">
    <div class="q-pa-md row q-gutter-md desktop-only">
        <q-card bordered class="my-card col column justify-between">
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="event" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Upcoming Events
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfUpcomingEvents.length}} Reservations</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW RESERVATIONS" outline @click="$router.push('/reservation')"/>
            </q-card-actions>
        </q-card>
        
        <q-card bordered class="my-card col column justify-between">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Pending Party Tray Orders
                    </q-item-label>
                    <q-item-label class="text-h6">
                        {{returnNumberOfPendingOrders.length}} Orders
                    </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW ORDERS" outline @click="$router.push('/partytrayreserve')"/>
            </q-card-actions>
        </q-card>

        <q-card bordered class="my-card col">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="money" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Confirm Payments (Month of {{$moment().format('MMM')}})
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfConfirmedPayments.length}} Payments</q-item-label>
                    <q-item-label class="text-title">= ₱ {{formatNumber(returnSumOfConfirmedPayments)}}.00</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW PAYMENTS" outline @click="$router.push('/paymentRecords')"/>
            </q-card-actions>
        </q-card>

        <q-card bordered class="my-card col">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="event_note" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Unscheduled Events & Deliveries
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfUnscheduledEvents}} Reservations & {{returnNumberOfUnscheduledOrders}} Orders </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW SCHEDULES" outline @click="$router.push('/staffscheduling')"/>
            </q-card-actions>
        </q-card>
    </div>

   <div class="q-pa-md q-gutter-md mobile-only">
        <q-card bordered class="my-card col column justify-between">
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="event" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Upcoming Events
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfUpcomingEvents.length}} Reservations</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW RESERVATIONS" outline @click="$router.push('/reservation')"/>
            </q-card-actions>
        </q-card>
        
        <q-card bordered class="my-card col column justify-between">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="shopping_cart" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Pending Party Tray Orders
                    </q-item-label>
                    <q-item-label class="text-h6">
                        {{returnNumberOfPendingOrders.length}} Orders
                    </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW ORDERS" outline @click="$router.push('/partytrayreserve')"/>
            </q-card-actions>
        </q-card>

        <q-card bordered class="my-card col">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="money" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Confirm Payments (Month of {{$moment().format('MMM')}})
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfConfirmedPayments.length}} Payments</q-item-label>
                    <q-item-label class="text-title">= ₱ {{formatNumber(returnSumOfConfirmedPayments)}}.00</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW PAYMENTS" outline @click="$router.push('/paymentRecords')"/>
            </q-card-actions>
        </q-card>

        <q-card bordered class="my-card col">
            
            <q-card-section>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="event_note" style="font-size: 30px;" />
                    </q-item-section>
                    <q-item-section class="text-right"> 
                    <q-item-label caption>
                        Unscheduled Events & Deliveries
                    </q-item-label>
                    <q-item-label class="text-h6">{{returnNumberOfUnscheduledEvents}} Reservations & {{returnNumberOfUnscheduledOrders}} Orders </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
            <q-card-actions align="center"> 
                <q-btn color="deep-orange-4" class="full-width" label="VIEW SCHEDULES" outline @click="$router.push('/staffscheduling')"/>
            </q-card-actions>
        </q-card>
    </div>


    <div class="q-pa-md row items-start q-gutter-md desktop-only">
        <q-card bordered class="my-card">
            <q-card-section class="row justify-between">
                <div>Top <b>{{returnType}}</b></div>
                <q-select v-model="type" dense :options="['packages','food choices(catering)','food choice(party trays)']" outlined=""/>
            </q-card-section>
            <q-card-section>
                <apexcharts width="450" type="bar" :options="returnOptions" :series="returnSeries"></apexcharts>
            </q-card-section>
        </q-card>
        <q-card bordered class="my-card">
            <q-card-section>
                <b>Sales Distribution (Month of {{$moment().format('MMM')}})</b>
            </q-card-section>
            <q-card-section class="center" style="height: 327px; width: 420px">
                <apexcharts width="400" type="donut" :options="returnSalesOptions" :series="returnSalesSeries"></apexcharts>
            </q-card-section>
        </q-card>
    </div>

    <div class="q-pa-md q-gutter-md mobile-only text-center">
        <q-card bordered class="my-card" flat>
            <q-card-section class="">
                <div>Top <b>{{returnType}}</b></div>
                <q-select v-model="type" class="q-ma-md" dense :options="['packages','food choices(catering)','food choice(party trays)']" outlined=""/>
            </q-card-section>
            <q-card-section>
                <apexcharts width="350" type="bar" :options="returnOptions" :series="returnSeries"></apexcharts>
            </q-card-section>
        </q-card>
        <q-card bordered class="my-card q-mb-lg" flat>
            <q-card-section>
                <b>Sales Distribution (Month of {{$moment().format('MMM')}})</b>
            </q-card-section>
            <q-card-section class="center" style="height: auto; width: 350px">
                <apexcharts width="350" type="donut" :options="returnSalesOptions" :series="returnSalesSeries"></apexcharts>
            </q-card-section>
        </q-card>
    </div>

    </q-page>

</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import VueChart from 'vue-chart-js'
import { date } from 'quasar'
export default { 
    components:{
      VueChart,
      apexcharts: VueApexCharts,
    },  
    data () {
        return {
            options: {
                chart: {
                id: 'vuechart-example'
                },
                xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }],
            doptions: {},
            dseries: [44, 55, 41, 17, 15],
            Reservation: [],
            partyTrayOrders: [],
            Payments: [],
            partyTrayOrders: [],
            StaffSchedules: [],
            Customers: [],
            type: 'packages'
        }
    },
    mounted(){
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation')),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders')),
        this.$binding('Payments', this.$firestoreApp.collection('Payments')),
        this.$binding('StaffSchedules', this.$firestoreApp.collection('StaffSchedules')),
        this.$binding('Customers', this.$firestoreApp.collection('Customers'))        
    },
    computed:{
        returnNumberOfUpcomingEvents(){
            try {
                let today = date.formatDate(new Date(),'MM-DD-YYYY')
                return this.Reservation.filter(a=>{
                    return today <= date.formatDate(a.clientReserveDate,'MM-DD-YYYY')
                })
            } catch (error) {
                return 0
            }
        },
        returnNumberOfPendingOrders(){
            try {
                let today = date.formatDate(new Date(),'MM-DD-YYYY')
                return this.partyTrayOrders.filter(a=>{
                    return today <= date.formatDate(a.clientReserveDate,'MM-DD-YYYY')
                })
            } catch (error) {
                return 0
            }
        },
        returnNumberOfConfirmedPayments(){
            try {
                let today = date.formatDate(new Date(),'MM-DD-YYYY')
                let month = today.split('-')[0]

                let base = date.formatDate(new Date(2020,month-1,1),'MM-DD-YYYY')
                return this.Payments.filter(a=>{
                    return base <= date.formatDate(a.clientPaymentDate,'MM-DD-YYYY')
                })
            } catch (error) {
                return 0
            }
        },
        returnSumOfConfirmedPayments(){
            try {
                return this.$lodash.sumBy(this.returnNumberOfConfirmedPayments,a=>{
                    return a.clientPayDetails.amount
                })
            } catch (error) {
                return 0
            }
        },
        returnNumberOfUnscheduledEvents(){
            try {
                let count = 0
                this.returnNumberOfUpcomingEvents.forEach(a=>{
                    let filter = this.StaffSchedules.filter(b=>{
                        return b.reservationKey == a['.key']
                    })

                    if(filter.length == 0){
                        count = count + 1
                    }
                })
                return count
            } catch (error) {
                return 0
            }
        },
        returnNumberOfUnscheduledOrders(){
            try {
                let count = 0
                this.returnNumberOfPendingOrders.forEach(a=>{
                    let filter = this.StaffSchedules.filter(b=>{
                        return b.reservationKey == a['.key']
                    })

                    if(filter.length == 0){
                        count = count + 1
                    }
                })
                return count
            } catch (error) {
                return 0
            }
        },
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
                } else if (this.type == 'food choice(party trays)'){
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
        returnOptions(){
            let options= {
                chart: {
                id: 'vuechart-example'
                },
                xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            }

            console.log(this.returnPopular,'popular')
            let array = []
            this.returnPopular.forEach(a=>{
                array.push(a.name)
            })
            options.xaxis.categories = array.slice(0,8)
            return options
        },
        returnSeries(){
            let series = [{
                name: 'count',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }]
            let array = []
            this.returnPopular.forEach(a=>{
                array.push(a.count)
            })
            series[0].data = array.slice(0,8)
            return series
        },
        returnSalesOptions(){
            let doptions= {
                labels:['Orders','Reservations']
            }
            return doptions
        },
        returnSalesSeries(){
            let series = [44, 55]
            
            console.log('paymens',this.returnNumberOfConfirmedPayments)

            let map = this.returnNumberOfConfirmedPayments.map(a=>{
                let obj = {...a}

                if(obj.forReservation == null){
                    obj.typeOf = 'Order'
                } else {
                    obj.typeOf = 'Reservation'
                }
                return obj
            })

            let count = this.$lodash.countBy(map,'typeOf')
            let reservePercent = count.Reservation / this.returnNumberOfConfirmedPayments.length
            let orderPercent = count.Order / this.returnNumberOfConfirmedPayments.length

            series = [orderPercent,reservePercent]
            return series
        },
        returnType(){
            try {
                let type = this.type
                if(type == 'packages'){
                    return 'Packages'
                } else if (type == 'food choices(catering)'){
                    return 'Food Choices'
                } else if (type == 'food choice(party trays)'){
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
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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