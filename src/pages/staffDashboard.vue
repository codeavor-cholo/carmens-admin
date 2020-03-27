<template>
    <q-page padding>
        <div class="text-h5 q-pa-md">TODAY <span class="text-grey-8 text-h6">( {{$moment().format('ll')}} )</span></div>
        <q-table grid :data="returnToday" :columns="columns" :filter="filter"  :pagination.sync="pagination" class="q-px-sm full-width align-center" row-key=".key">
        <template v-slot:item="props">
            <div class="q-pa-sm col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition">
                <q-card style="border-radius:10px">
                    <q-card-section class="q-pt-xs q-pa-md">
                    <div class="text-overline  text-uppercase" :class="returnLengthOfStatus(props.row) < returnTypeLength(props.row) ? 'text-deep-orange-4' : 'text-green'">{{returnLengthOfStatus(props.row) == 0 ? returnStandByStatus(props.row,'today') : returnCurrentStatus(props.row)}}</div>
                    <div v-if="props.row.type !== 'PARTY TRAY DELIVERY'">
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.clientFName}} {{props.row.clientLName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}} - {{props.row.clientEndTime}}
                            <br>
                            {{props.row.clientPlace}}, {{props.row.clientCity}}
                            <br>
                            <q-btn color="grey-8" label="RESERVATION DETAILS" size="sm" outline="" class="q-mt-sm full-width"/>
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.firstName}} {{props.row.lastName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}}
                            <br>
                            {{props.row.clientAddress}}, {{props.row.city}}
                            <br>
                            <q-btn color="grey-8" label="ORDER DETAILS" size="sm" outline="" class="q-mt-sm full-width" @click="$router.push('/viewdetails/'+props.row.reservationKey)"/>
                        </div>
                    </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="q-pa-none">
                        <q-list class="fit" >

                        <q-slide-item @left="onLeft" @action="getData(props.row)" style="border-radius:0px 0px 10px 10px" v-if="returnLengthOfStatus(props.row) < returnTypeLength(props.row)">
                            <template v-slot:left>
                                <q-icon name="done" class="q-mr-md"/>
                                <span class="text-overline text-uppercase"> {{returnCurrentStatus(props.row)}} </span>
                            </template>
                            <q-item class="bg-deep-orange-8 text-white">
                            <q-item-section avatar>
                                <q-avatar icon="update" text-color="white">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section >
                                <q-item-label overline class="text-white">SLIDE TO UPDATE STATUS</q-item-label>
                                <q-item-label caption class="text-capitalize text-white" v-show="returnLengthOfStatus(props.row) < returnTypeLength(props.row)">next status: {{returnNextStatus(props.row)}}</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-slide-item>

                        <q-item v-else class="bg-green" style="border-radius:0px 0px 10px 10px">
                            <q-item-section avatar>
                                <q-avatar icon="check_circle" text-color="white">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-white" v-if="props.row.type == 'PARTY TRAY DELIVERY'">ORDER DELIVERED</q-item-label>
                                <q-item-label overline class="text-white" v-else>EVENT PLACE READY</q-item-label>
                            </q-item-section>
                        </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </template>
        </q-table>  

        <div class="text-h5 q-pa-md">TOMORROW </div>   
        <q-table grid :data="returnStaffSchedule" :columns="columns" :filter="filter"  :pagination.sync="pagination" class="q-px-sm full-width align-center" row-key=".key">
        <template v-slot:item="props">
            <div class="q-pa-sm col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition">
                <q-card style="border-radius:10px">
                    <q-card-section class="q-pt-xs q-pa-md">
                    <div class="text-overline text-uppercase" :class="returnLengthOfStatus(props.row) < returnTypeLength(props.row) ? 'text-deep-orange-4' : 'text-green'">{{returnLengthOfStatus(props.row) == 0 ? returnStandByStatus(props.row,'tomorrow') : returnCurrentStatus(props.row)}}</div>
                    <div v-if="props.row.type !== 'PARTY TRAY DELIVERY'">
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.clientFName}} {{props.row.clientLName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}} - {{props.row.clientEndTime}}
                            <br>
                            {{props.row.clientPlace}}, {{props.row.clientCity}}
                            <br>
                            <q-btn color="grey-8" label="RESERVATION DETAILS" size="sm" outline="" class="q-mt-sm full-width"/>
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.firstName}} {{props.row.lastName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}}
                            <br>
                            {{props.row.clientAddress}}, {{props.row.city}}
                            <br>
                            <q-btn color="grey-8" label="ORDER DETAILS" size="sm" outline="" class="q-mt-sm full-width" @click="$router.push('/viewdetails/'+props.row.reservationKey)"/>
                        </div>
                    </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section class="q-pa-none">
                        <q-list class="fit" >

                        <q-slide-item @left="onLeft" @action="getData(props.row)" style="border-radius:0px 0px 10px 10px" v-if="returnLengthOfStatus(props.row) < returnTypeLength(props.row)">
                            <template v-slot:left>
                                <q-icon name="done" class="q-mr-md"/>
                                <span class="text-overline text-uppercase"> {{returnCurrentStatus(props.row)}} </span>
                            </template>
                            <q-item class="bg-deep-orange-8 text-white">
                            <q-item-section avatar>
                                <q-avatar icon="update" text-color="white">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section >
                                <q-item-label overline class="text-white">SLIDE TO UPDATE STATUS</q-item-label>
                                <q-item-label caption class="text-capitalize text-white" v-show="returnLengthOfStatus(props.row) < returnTypeLength(props.row)">next status: {{returnNextStatus(props.row)}}</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-slide-item>

                        <q-item v-else class="bg-green" style="border-radius:0px 0px 10px 10px">
                            <q-item-section avatar>
                                <q-avatar icon="check_circle" text-color="white">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-white" v-if="props.row.type == 'PARTY TRAY DELIVERY'">ORDER DELIVERED</q-item-label>
                                <q-item-label overline class="text-white" v-else>EVENT PLACE READY</q-item-label>
                            </q-item-section>
                        </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>
        </template>
        </q-table>    

        <div class="text-h5 q-pa-md">UPCOMING EVENTS </div>   
        <q-table grid :data="returnStaffSchedule" :columns="columns" :filter="filter"  :pagination.sync="pagination" class="q-px-sm full-width align-center" row-key=".key">
        <template v-slot:item="props">
            <div class="q-pa-sm col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition">
                <q-card style="border-radius:10px">
                    <q-card-section class="q-pt-xs q-pa-md">
                    <div class="text-overline text-deep-orange-4">{{returnStandByStatus(props.row,'upcoming')}}</div>
                    <div v-if="props.row.type !== 'PARTY TRAY DELIVERY'">
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.clientFName}} {{props.row.clientLName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}} - {{props.row.clientEndTime}}
                            <br>
                            {{props.row.clientPlace}}, {{props.row.clientCity}}
                            <br>
                            <q-btn color="grey-8" label="RESERVATION DETAILS" size="sm" outline="" class="q-mt-sm full-width"/>
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-h6 q-mt-sm q-mb-xs row justify-between">
                            <div>{{props.row.firstName}} {{props.row.lastName}}</div>
                            <div><q-btn color="deep-orange-4" icon="call" round flat /></div>
                        </div>
                        <div class="text-caption text-grey">
                            {{props.row.clientStartTime}}
                            <br>
                            {{props.row.clientAddress}}, {{props.row.city}}
                            <br>
                            <q-btn color="grey-8" label="ORDER DETAILS" size="sm" outline="" class="q-mt-sm full-width" @click="$router.push('/viewdetails/'+props.row.reservationKey)"/>
                        </div>
                    </div>
                    </q-card-section>
                </q-card>
            </div>
        </template>
        </q-table>        
    </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
    data(){
        return {
            StaffSchedules: [],
            filter: '',
            pagination: { sortBy: 'clientFname', descending: false, page: 1, rowsPerPage: 0},
            columns: [
                { name: 'clientFname', required: true, label: 'First Name', align: 'center', field: 'clientFname', sortable: true },
                { name: 'clientEvent', align: 'center', label: 'Event', field: 'clientEvent', sortable: true },
            ],
            userEmail: '',
            accountLoggedIn: {},
            EventStatus: [],
            selectedEvent: null,
            eventStatusArray: ['Preparing Food!','Preparing Setup!','The Catering Team is en route!','Arrived at the Event Area','Setup on Progress','Event Place Is Ready!'],
            orderStatusArray: ['Order Confirmed!','Preparing Order!','Done Preparing!','Pending for Delivery','Order is  out for delivery!','Order Delivered!']
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
                // self.$router.push('/')
            }
        })
    },
    mounted(){
        this.$binding('StaffSchedules', this.$firestoreApp.collection('StaffSchedules'))
        .then(StaffSchedules => {
        console.log(StaffSchedules, 'StaffSchedules')
        }),
        this.$binding('EventStatus', this.$firestoreApp.collection('EventStatus'))
        .then(EventStatus => {
        console.log(EventStatus, 'EventStatus')
        })
    },
    computed:{
        returnStaffSchedule(){
            let user = this.accountLoggedIn
            console.log(user,'user')

            return this.StaffSchedules.filter(a=>{
                return a.staffKey == user.uid
            })
        },
        returnToday(){
            console.log(this.returnStaffSchedule,'schedule')
            let today = new Date()
            let filter = this.$lodash.filter(this.returnStaffSchedule,a=>{
                return date.formatDate(a.clientReserveDate,'YYYY-MM-DD') == date.formatDate(today,'YYYY-MM-DD')
            })
            console.log(filter,'today')
            return filter
        },

    },
    methods:{
        returnLengthOfStatus(event){
            let filter = this.$lodash.filter(this.EventStatus,a=>{
                return a.scheduleKey == event['.key']
            })
            return filter.length            
        },
        returnNextStatus(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray[this.returnLengthOfStatus(event)]
            } else {
                return this.eventStatusArray[this.returnLengthOfStatus(event)]
            }
        },
        returnCurrentStatus(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray[this.returnLengthOfStatus(event)-1]
            } else {
                return this.eventStatusArray[this.returnLengthOfStatus(event)-1]
            }
        },
        onLeft ({ reset }) {
            this.$q.dialog({
                title: 'Update Status ?',
                message: 'This action cannot be undone.',
                ok: 'YES',
                cancel: 'NO',
                persistent: true
                }).onOk(() => {    
                    console.log(this.selectedEvent,'selectedEvent')
                    let payload = {
                        reservationKey: this.selectedEvent.reservationKey,
                        scheduleKey: this.selectedEvent['.key'],
                        status: this.selectedEvent.type == 'PARTY TRAY DELIVERY' ? this.orderStatusArray[this.returnLengthOfStatus(this.selectedEvent)] : this.eventStatusArray[this.returnLengthOfStatus(this.selectedEvent)],
                        dateTime: new Date().toString()
                    }
                    console.log(payload,'payload')
                    this.$firestoreApp.collection('EventStatus').add(payload)
                        .then(()=>{
                            console.log('done')
                        })
                        .catch(()=>{
                            console.log('error')
                        })

                    this.$q.notify('STATUS UPDATED = '+payload.status)
                    this.finalize(reset)
                }).onCancel(() =>{
                    this.resetCancel(reset)
                })
        },

        onRight ({ reset }) {
            this.$q.notify('Right action triggered. Resetting in 1 second.')
            this.finalize(reset)
        },

        finalize (reset) {
            this.timer = setTimeout(() => {
                reset()
            }, 1000)
        },
        resetCancel(reset){
            reset()
        },
        getData(event){
            console.log(event,'event with action')
            this.selectedEvent = event
        },
        returnTypeLength(event){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return this.orderStatusArray.length
            } else {
                return this.eventStatusArray.length
            }
        },
        returnStandByStatus(event,section){
            if(event.type == 'PARTY TRAY DELIVERY'){
                return 'ORDER ON STANBY'
            } else {
                if(section == 'today'){
                    return 'EVENT IS TODAY'
                } else if(section == 'tomorrow'){
                    return 'EVENT IS TOMORROW'
                } else {
                    return 'COMING SOON'
                }
            }
        }
    }
}
</script>