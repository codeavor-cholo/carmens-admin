<template>
    <q-page>
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-grey-8 bg-grey-9 full-height relative-position" :active-color="tab != 'WOPP' ? 'white' : 'teal'" :active-bg-color="tab != 'WOPP' ? 'deep-orange-4' : 'teal-1'">
                        <div class="text-h6 text-center text-white q-py-md" style="font-family: 'Roboto Slab', serif;">STAFF SCHEDULING</div>
                        <q-tab class="text-white" name="EVENTS" value="EVENTS" style="font-family: 'Roboto Slab', serif;" label="EVENTS" @click="selectedStaff = [],selectedReservations = []"></q-tab>
                        <q-tab class="text-white" name="PARTYTRAYS" value="PARTYTRAYS" style="font-family: 'Roboto Slab', serif;" label="PARTY TRAYS" @click="selectedStaff = [],selectedReservations = []"></q-tab>
                    </q-tabs>
                </template>
                <template v-slot:after> 
                    <div class="container row">
                        <div class="col q-pa-md">
                            <div v-if="tab=='EVENTS'">

                                <q-list separator="" padding="" class="bg-white" style="border-radius: 10px;">
                                    <q-item-label header class="text-h6 text-capitalize">
                                        <q-avatar color="deep-orange-4" text-color="white" rounded="" size="sm">1</q-avatar>
                                        Select reservations
                                    </q-item-label>
                                    <q-item v-for="(reserve,i) in returnFilterReservation" :key="i" clickable="" v-ripple>
                                        <q-item-section side>
                                            <q-checkbox v-model="selectedReservations" :val="reserve"  @input="consoleSelected" color="deep-orange-4"/>
                                        </q-item-section>
                                        <q-item-section>
                                        <q-item-label overline>{{reserve.clientFName}} {{reserve.clientLName}}</q-item-label>
                                        <q-item-label>{{$moment(reserve.clientReserveDate).format('ll')}} ({{reserve.clientStartTime}} - {{reserve.clientEndTime}})</q-item-label>
                                        <q-item-label caption>{{reserve.clientPlace}}, {{reserve.clientCity}}</q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                        <!-- <q-item-label caption>PLOTTING</q-item-label> -->
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                            <div v-else>
                                <q-list separator="" padding="" class="bg-white" style="border-radius: 10px;">
                                    <q-item-label header class="text-h6 text-capitalize">
                                        <q-avatar color="deep-orange-4" text-color="white" rounded="" size="sm">1</q-avatar>
                                        Select delivery schedule
                                    </q-item-label>
                                    <q-item v-for="(reserve,i) in returnFilterReservation" :key="i" clickable="" v-ripple>
                                        <q-item-section side>
                                            <q-checkbox v-model="selectedReservations" :val="reserve"  @input="consoleSelected" color="deep-orange-4"/>
                                        </q-item-section>
                                        <q-item-section>
                                        <q-item-label overline>{{reserve.firstName}} {{reserve.lastName}}</q-item-label>
                                        <q-item-label>{{$moment(reserve.clientReserveDate).format('ll')}} ({{reserve.clientStartTime}} - {{reserve.clientEndTime}})</q-item-label>
                                        <q-item-label caption>{{reserve.clientAddress}}, {{reserve.city}}</q-item-label>
                                        </q-item-section>

                                        <q-item-section side top>
                                        <!-- <q-item-label caption>PLOTTING</q-item-label> -->
                                        </q-item-section>
                                    </q-item>
                                </q-list>                            
                            </div>
                        </div>

                        <div class="col q-py-md q-pr-md" :class="returnDisabled('staff')" >
                            <q-list separator="" padding=""  class="bg-white" style="border-radius: 10px;">
                                <q-item-label header class="text-h6 text-capitalize">
                                    <q-avatar color="deep-orange-4" text-color="white" rounded="" size="sm">2</q-avatar> 
                                    Select Staff
                                </q-item-label>
                                <q-item-label header class="text-title text-capitalize"><b>no events for today</b></q-item-label>
                                <q-item v-for="(staff,i) in returnNoToday" :key="i">
                                    <q-item-section side>
                                        <q-checkbox v-model="selectedStaff" :val="staff" color="deep-orange-4" @input="oneStaffOnly(staff)"/>
                                    </q-item-section>
                                    <q-item-section avatar>
                                    <q-avatar color="deep-orange-4" text-color="white" round="">{{staff.displayName.substr(0,1)}}</q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label overline="">{{staff.displayName}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section side>
                                    
                                    </q-item-section>
                                </q-item>
                                <q-item-label header class="text-capitalize">
                                    <span class="text-title"><b>with events for today</b></span> 
                                    <br>
                                    <span class="text-caption">(No conflicts with selected reservations)</span>
                                </q-item-label>
                                <q-item v-for="(staff,i) in returnWithToday" :key="i">
                                    <q-item-section side>
                                        <q-checkbox v-model="selectedStaff" :val="staff" color="deep-orange-4" @input="oneStaffOnly(staff)"/>
                                    </q-item-section>
                                    <q-item-section avatar>
                                    <q-avatar color="deep-orange-4" text-color="white" round="">{{staff.displayName.substr(0,1)}}</q-avatar>
                                    </q-item-section>

                                    <q-item-section>
                                    <q-item-label overline="">{{staff.displayName}}</q-item-label>
                                    </q-item-section>

                                    <q-item-section side>
                                    
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                        <div class="col q-my-md q-mr-md bg-white" :class="returnDisabled('calendar')" style="border-radius: 10px;">
                            <div class="text-h6 text-capitalize q-pa-md text-grey-8">
                                <q-avatar color="deep-orange-4" text-color="white" rounded="" size="sm">3</q-avatar> 
                                review schedule ({{selectedDate}})
                            </div>
                            <q-calendar
                            v-model="selectedDate"
                            view="day"
                            locale="en-us"
                            style="height: 68vh;"
                            class="calendar-container"
                            :column-header-before="true"
                            >
                            <template #day-body="{ date, timeStartPos, timeDurationHeight }">
                                <template v-for="(event, index) in getEvents(date)">
                                <q-badge
                                    :key="index"
                                    class="my-event text-white"
                                    :class="event.colorBg"
                                    :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                                >
                                <div class="row q-gutter-xs relative-position full-width">
                                <div class="col-12 text-subtitle2 text-center"  v-if="tab == 'EVENTS'">
                                    <span>{{ event.clientFName }} {{ event.clientLName}} <q-chip outline="" color="white" text-color="white" size="sm" label="NEW" v-show="returnPlottingNow(event)"/></span>
                                    <br>
                                    <span class="text-overline">{{event.clientReserveDate}} ({{event.clientStartTime}} - {{event.clientEndTime}})</span>
                                    <br>
                                    <div class="text-caption"> {{event.clientPlace}}, {{event.clientCity}}</div>
                                    
                                </div>
                                <div class="col-12 text-subtitle2 text-center"  v-else>
                                    <span class="text-overline">{{event.firstName}} {{event.lastName}} ({{event.clientStartTime}} - {{event.clientEndTime}})</span>
                                </div>
                                </div>

                                </q-badge>
                                </template>
                            </template>

                        </q-calendar>
                        <div class="q-px-md">
                            <q-btn color="deep-orange-4" icon="event_note" label="save plotted schedule" @click="savePlottingSchedule" class="full-width q-ma-md" :disabled="selectedReservations.length == 0 || selectedStaff.length == 0"/>
                        </div>
                        </div>
                    </div>
                </template>
            </q-splitter>        
    </q-page>
</template>
<script>
import { date } from 'quasar'
import { QCalendar } from '@quasar/quasar-ui-qcalendar'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

function luminosity (color) {
  if (typeof color !== 'string' && (!color || color.r === void 0)) {
    throw new TypeError('Expected a string or a {r, g, b} object as color')
  }

  const
    rgb = typeof color === 'string' ? textToRgb(color) : color,
    r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255,
    R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4),
    G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4),
    B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}
const reRGBA = /^\s*rgb(a)?\s*\((\s*(\d+)\s*,\s*?){2}(\d+)\s*,?\s*([01]?\.?\d*?)?\s*\)\s*$/

function textToRgb (color) {
  if (typeof color !== 'string') {
    throw new TypeError('Expected a string')
  }

  const m = reRGBA.exec(color)
  if (m) {
    const rgb = {
      r: Math.min(255, parseInt(m[2], 10)),
      g: Math.min(255, parseInt(m[3], 10)),
      b: Math.min(255, parseInt(m[4], 10))
    }
    if (m[1]) {
      rgb.a = Math.min(1, parseFloat(m[5]))
    }
    return rgb
  }
  return hexToRgb(color)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  const num = parseInt(hex, 16)

  return hex.length > 6
    ? { r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55) }
    : { r: num >> 16, g: num >> 8 & 255, b: num & 255 }
}
export default {
    components: {
        QCalendar,
    },
    data(){
        return{
            splitterModel: 20,
            tab: 'EVENTS',
            selectedDate: '',
            selectedReservations: [],
            selectedStaff: [],
            Reservation: [],
            StaffSchedules: [],
            partyTrayOrders: [],
            dashboardUsers: [],
            filter: '',
            pagination: { sortBy: 'clientFname', descending: false, page: 1, rowsPerPage: 20},
            columns: [
                { name: 'clientFname', required: true, label: 'First Name', align: 'center', field: 'clientFname', sortable: true },
                { name: 'clientEvent', align: 'center', label: 'Event', field: 'clientEvent', sortable: true },
            ],
            colorCode:['bg-blue','bg-red','bg-pink','bg-orange','bg-green','bg-grey','bg-purple','bg-teal','bg-accent','bg-amber']
        }
    },
    mounted(){
        this.$binding('dashboardUsers', this.$firestoreApp.collection('dashboardUsers'))
        .then(dashboardUsers => {
        console.log(dashboardUsers, 'dashboardUsers')
        }),
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
        .then(Reservation => {
        console.log(Reservation, 'Reservation')
        }),
        this.$binding('StaffSchedules', this.$firestoreApp.collection('StaffSchedules'))
        .then(StaffSchedules => {
        console.log(StaffSchedules, 'StaffSchedules')
        }),
        this.$binding('partyTrayOrders', this.$firestoreApp.collection('partyTrayOrders'))
        .then(partyTrayOrders => {
        console.log(partyTrayOrders, 'partyTrayOrders')
        })
    },
    computed:{
        returnNoScheduleYet(){
            try {
                let withSchedules = []
                let base

                if(this.tab == 'EVENTS'){
                    base = this.Reservation
                } else {
                    base = this.partyTrayOrders
                }



                for(var x=0;x<this.StaffSchedules.length;x++){
                    let key = this.StaffSchedules[x].reservationKey

                    let filter = this.$lodash.filter(base,a=>{
                        if(key == a['.key']){
                            withSchedules.push(a)
                        }
                    })
                }

                let diff = this.$lodash.difference(base,withSchedules)

                // console.log(withSchedules,'withSchedules')
                // console.log(diff,'remove with schedules')

                let order = this.$lodash.orderBy(diff,a=>{return date.formatDate(a.clientReserveDate,'YYYY-MM-DD')},'asc')
                console.log('order',order)

                let today = date.formatDate(new Date(),'YYYY-MM-DD')
                let removePassEvents = this.$lodash.filter(order,b=>{
                    return date.formatDate(b.clientReserveDate,'YYYY-MM-DD') >= today
                })
                console.log('today',today)
                console.log(removePassEvents,'removepass')

                return removePassEvents
            } catch (error) {
                return this.Reservation
            }
        },        
        returnFilterReservation(){
            try {
                let selected = this.selectedReservations

                if(selected.length > 0){
                    let dates = date.formatDate(selected[0].clientReserveDate,'YYYY-MM-DD')
                    let filter = this.$lodash.filter(this.returnNoScheduleYet,a=>{
                        return date.formatDate(a.clientReserveDate,'YYYY-MM-DD') == dates
                    })
                    return filter
                } else {
                    return this.returnNoScheduleYet
                }

            } catch (error) {
                return []
            }
        },
        returnStaffs(){
            try {
                if(this.tab == 'EVENTS'){
                    let filter = this.$lodash.filter(this.dashboardUsers,a=>{
                        return a.position.toString().toLowerCase() == 'staff'
                    })
                    console.log(filter,'returnStaffs')
                    return filter
                } else {
                    let filter = this.$lodash.filter(this.dashboardUsers,a=>{
                        return a.position.toString().toLowerCase() == 'delivery boy'
                    })
                    console.log(filter,'returnStaffs')
                    return filter
                }

            } catch (error) {
                return []
            }
        },
        returnStaffSchedules(){
            //new & old merge
            try {
                // new muna
                this.selectedDate = date.formatDate(this.selectedReservations[0].clientReserveDate,'YYYY-MM-DD')
                console.log('reservations',this.selectedReservations)
                let map = this.selectedReservations.map(a=>{
                    let data = {...a}
                    // data.clientEventType = data.clientSelectPackage.event !== null ? data.clientSelectPackage.event : ''
                    return data
                })
                console.log('returnStaffSchedules',map)
                return map
            } catch (error) {
                return this.selectedReservations
            }
            
        }, 
        returnNoConflictSchedules(){
            try {
                let staffs = this.returnStaffs
                //get selected schedules

                let selected = this.selectedReservations    
                //get date of selected

                if(selected.length == 0){
                    return staffs
                }

                let datess = date.formatDate(this.selectedReservations[0].clientReserveDate,'YYYY-MM-DD')
                                
                //get staff schedules
                let schedules = []
                for(var x=0;x<this.StaffSchedules.length;x++){
                    let schedule = this.StaffSchedules[x]
                    if(date.formatDate(schedule.clientReserveDate,'YYYY-MM-DD') == datess)
                    {
                        schedules.push(schedule)
                    }
                }
                console.log(schedules,'schedules of staff')

                let map = staffs.map(a=>{
                    let data = {...a}
                    let filter = this.$lodash.filter(schedules,b=>{
                        return b.staffKey == data['.key']
                    })
                    data.events = filter
                    return data
                })
                console.log(schedules,'same date')
                console.log(map,'staffs ss')

                let conflict = this.$lodash.map(map,x=>{
                    let returnData = {...x}
                    let eventss = returnData.events
                    let conflictEvents = []
                    if(eventss.length > 0){
                        for(var q=0;q < eventss.length; q++){
                            let targetStart = this.convertTimeToDate(eventss[q].clientStartTime)
                            let targetEnd = this.convertTimeToDate(eventss[q].clientEndTime)
                            for(var w=0;w < selected.length; w++){
                                let baseStart = this.convertTimeToDate(selected[w].clientStartTime)
                                let baseEnd = this.convertTimeToDate(selected[w].clientEndTime)


                                let yesStart = false
                                let yesEnd = false
                                if(date.isBetweenDates(baseStart,targetStart,targetEnd, { inclusiveFrom: true })){
                                    console.log('start is between')
                                    yesStart = true
                                } 
                                
                                if (date.isBetweenDates(baseEnd,targetStart,targetEnd, { inclusiveTo: true })) {
                                    console.log('end is between')
                                    yesEnd = true
                                }          
                                
                                if(yesStart == true || yesEnd == true){
                                    conflictEvents.push(eventss[q])
                                }
                            }//inner loop end
                            returnData.conflictEvents = conflictEvents
                        }
                    } else {
                        returnData.conflictEvents = conflictEvents
                    }


                    return returnData
                })

                console.log(conflict,'conflict')
                let staffWithOutConflict = this.$lodash.filter(conflict,e=>{
                    return e.conflictEvents.length == 0
                })
                console.log(staffWithOutConflict,'staffWithOutConflict')
                //compare
                return staffWithOutConflict
            } catch (error) {
                return []
            }
        },
        returnNoToday(){
            try {
                return this.$lodash.filter(this.returnNoConflictSchedules,a=>{return a.events.length == 0})
            } catch (error) {
                return this.returnNoConflictSchedules
            }
        },
        returnWithToday(){
            try {
                return this.$lodash.filter(this.returnNoConflictSchedules,a=>{return a.events.length > 0})
            } catch (error) {
                return this.returnNoConflictSchedules
            }
        },
          
    },
    methods:{
        convertTimeToDate(time){
            let dateFrom = new Date(2020,0,1)
            let start = time.split(":")
            let startBase
            let startArr = start[1].split(" ")
            if(startArr[1] == 'PM'){
                if(parseInt(start[0]) == 12){
                    startBase = parseInt(start[0])
                } else {
                    startBase = 12 + parseInt(start[0])
                }
            } else {
                startBase = parseInt(start[0])
            }    

            dateFrom = date.addToDate(dateFrom, { hours: startBase, minutes: parseInt(start[1])})
            return dateFrom
        },        
        consoleSelected(){

            this.selectedStaff = []
            console.log(this.selectedStaff,'reset')

            console.log(this.selectedReservations) 
            let index = this.selectedReservations.length - 1
            let latest = this.selectedReservations[index]
            let dateTarget = new Date(2020,0,1)
            let startLatest = latest.clientStartTime.split(":")
            let endLatest = latest.clientEndTime.split(":")

            let sBase
            let startArrLatest = startLatest[1].split(" ")
            if(startArrLatest[1] == 'PM'){
                sBase = 12 + startLatest[0]
            } else {
                sBase = startLatest[0] 
            }            
            let eBase
            let endArrLatest = endLatest[1].split(" ")
            if(endArrLatest[1] == 'PM'){
                eBase = 12 + endLatest[0]
            } else {
                eBase = endLatest[0] 
            }           

            let dateTargetStart = date.addToDate(dateTarget, { hours: sBase, minutes: parseInt(startLatest[1])})
            let dateTargetEnd = date.addToDate(dateTarget, { hours: eBase, minutes: parseInt(endLatest[1])})

            if(this.selectedReservations.length > 1){
                for(let x = 0;x<this.selectedReservations.length-1;x++){
                    let rev = this.selectedReservations[x]

                    let dateFrom = new Date(2020,0,1)
                    let dateTo = new Date(2020,0,1)

                    let start = rev.clientStartTime.split(":")
                    let startBase
                    let startArr = start[1].split(" ")
                    if(startArr[1] == 'PM'){
                        startBase = 12 + start[0]
                    } else {
                        startBase = start[0] 
                    }


                    let end = rev.clientEndTime.split(":")
                    let endBase
                    let endArr = end[1].split(" ")
                    if(endArr[1] == 'PM'){
                        endBase = 12 + end[0]
                    } else {
                        endBase = end[0] 
                    }

                    dateFrom = date.addToDate(dateFrom, { hours: startBase, minutes: parseInt(start[1])})
                    dateTo = date.addToDate(dateTo, { hours: endBase, minutes: parseInt(end[1])})

                    let yesStart = false
                    let yesEnd = false
                    if(date.isBetweenDates(dateTargetStart,dateFrom,dateTo, { inclusiveFrom: true })){
                        console.log('start is between')
                        yesStart = true
                    } 
                    
                    if (date.isBetweenDates(dateTargetEnd,dateFrom,dateTo, { inclusiveTo: true })) {
                        console.log('end is between')
                        yesEnd = true
                    }

                    if(yesStart == true || yesEnd == true){
                        this.$q.dialog({
                            title: 'Selected Event Reservation Conflict',
                            message: 'Removing Last Selected Event Reservation',
                            ok: 'Ok',
                            persistent: true
                            }).onOk(() => {
                                this.selectedReservations.splice(index,1)
                            })
                            break
                    }
                }
            }

        },
        isCssColor (color) {
            return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
        },
        getEvents(dt){
        //   console.log('dt',dt)
          let ReserveDate = []
          let dateTarget = new Date(2020,0,1)
          let concat = this.$lodash.concat(this.returnStaffSchedules,this.selectedStaff[0].events)
          console.log(concat,'concat')
          for(let x=0; x < concat.length; x++){
            let add = concat[x]
            let dateFormat = date.formatDate(concat[x].clientReserveDate, 'YYYY-MM-DD')
            if(dateFormat == dt){  

                let start = add.clientStartTime.split(":")
                let startBase
                let startArr = start[1].split(" ")
                if(startArr[1] == 'PM'){
                    if(parseInt(start[0]) == 12){
                        startBase = parseInt(start[0])
                    } else {
                        startBase = 12 + parseInt(start[0])
                    }
                    
                } else {
                    startBase = parseInt(start[0])
                }

                let end = add.clientEndTime.split(":")
                let endBase
                let endArr = end[1].split(" ")
                // console.log(endArr,'endArr')
                if(endArr[1] == 'PM'){
                    if(parseInt(end[0]) == 12){
                        endBase = parseInt(end[0])
                    } else {
                        endBase = 12 + parseInt(end[0])
                    }
                    console.log(endBase)
                } else {
                    endBase = parseInt(end[0]) 
                } 

                let dateFrom = date.addToDate(dateTarget, { hours: startBase, minutes: parseInt(start[1])})
                let dateTo = date.addToDate(dateTarget, { hours: endBase, minutes: parseInt(end[1])})

                

                console.log(dateTo,'to')
                console.log(dateFrom,'from')

                let diff = date.getDateDiff(dateTo, dateFrom, 'minutes')
                console.log(diff,'diff')
                let random = Math.floor(Math.random() * 10); 
                add.colorBg = this.colorCode[random]
                add.duration = diff

                ReserveDate.push(add)
            }
            
          }
          console.log('ReserveDate',ReserveDate)
          return ReserveDate
        },
        //schedule
        badgeClasses (event, type) {
            
            const cssColor = this.isCssColor('#0000FF')
            const isHeader = type === 'header'
            // console.log('showerror')
            return {
                [`text-white bg-orange`]: !cssColor,
                'full-width': !isHeader && (!event.side || event.side === 'full'),
                'left-side': !isHeader && event.side === 'left',
                'right-side': !isHeader && event.side === 'right'
            }
        },

        badgeStyles (event, type, timeStartPos, timeDurationHeight) {
            
            const s = {}
            // if (this.isCssColor('#0000FF')) {
                
            //     s['background-color'] = '#0000FF'
            //     s.color = luminosity('#0000FF') > 0.5 ? 'black' : 'white'
            // }
            if (timeStartPos) {
                let rev = event.clientStartTime.split(":")
                let endBase
                let endArr = rev[1].split(" ")
                // console.log(endArr,'endArr')
                if(endArr[1] == 'PM'){
                    if(parseInt(rev[0]) == 12){
                        endBase = parseInt(rev[0])
                    } else {
                        endBase = 12 + parseInt(rev[0])
                    }
                    
                } else {
                    endBase = parseInt(rev[0]) 
                } 

                let datess = date.addToDate(new Date(2020,0,1), { hours: endBase, minutes: parseInt(rev[1])})
                s.top = timeStartPos(date.formatDate(datess,'HH:mm')) + 'px'
            }
            if (timeDurationHeight) {
                s.height = timeDurationHeight(event.duration) + 'px'
            }
            s['align-items'] = 'flex-center'
            console.log(s,'s')
            return s
        },
        returnPlottingNow(event){
            let data = {...event}
            if(this.$lodash.findIndex(this.selectedReservations,a=>{return a['.key'] == data['.key']}) > -1){
                console.log('TRUE')
                return true
            } else {
                console.log('FALSE')
                return false
            }
        },
        removePlotting(event,index){
            console.log(event,'to be removed')
            console.log(index)
            if(this.selectedReservations.length == 1){
                this.$q.dialog({
                    title: 'Remove Last Selected Schedule ?',
                    message: 'This will reset the scheduling process.',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.selectedReservations.splice(index,1)
                    this.step = 1
                    this.selectedStaff = []
                })                
            } else {
                this.$q.dialog({
                    title: 'Remove Schedule ?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.selectedReservations.splice(index,1)
                })
            }
        },
        returnDisabled(column){
            try {
                if(column == 'staff'){
                    if(this.selectedReservations.length == 0){
                        return 'disabled'
                    } else {
                        return ''
                    }
                } else {
                    if(this.selectedStaff.length == 0){
                        return 'disabled'
                    } else {
                        return ''
                    }
                }
            } catch (error) {
                return 'disabled'
            }
        },
        oneStaffOnly(staff){
            if(this.selectedStaff.length > 1){
                this.selectedStaff.splice(0,1)
            }
        },
        savePlottingSchedule() {
            if(this.selectedReservations.length == 0 || this.selectedStaff.length == 0){
                this.$q.dialog({
                    title: 'Incomplete Selection of Data',
                    ok: 'ok',
                    cancel: 'Cancel'
                })                
            }
            this.$q.dialog({
                title: 'Save Staff Schedules ?',
                ok: 'Yes',
                cancel: 'Cancel'
            }).onOk(() => { 
                console.log(this.selectedReservations, 'for saving')
                for(var x = 0; x < this.selectedReservations.length; x++){
                    this.loopScheduling(this.selectedReservations[x])
                    if(x == this.selectedReservations.length-1){
                        this.$q.notify({
                            message: 'Save Schedules!',
                            icon: 'mdi-update',
                            color: 'orange-8',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.selectedReservations = []
                        this.selectedStaff = []
                    }
                }

            })
        },   
        loopScheduling(schedule){
            let payload = {
                
                clientEndTime: schedule.clientEndTime,
                clientStartTime: schedule.clientStartTime,
                clientReserveDate: schedule.clientReserveDate,
                reservationKey: schedule['.key'],
                staffKey: this.selectedStaff[0]['.key']
            }

            if(this.tab == 'EVENTS'){
                payload.clientCity = schedule.clientCity,
                payload.clientFName = schedule.clientFName
                payload.clientLName = schedule.clientLName
                payload.clientPlace = schedule.clientPlace
                payload.type = 'EVENT RESERVATION'
            } else {
                payload.firstName = schedule.firstName
                payload.lastName = schedule.lastName
                payload.clientAddress = schedule.clientAddress,
                payload.city = schedule.city
                payload.type = 'PARTY TRAY DELIVERY'
            }
            console.log(payload,'wow')

            this.$firestoreApp.collection('StaffSchedules').add(payload)
            .then(()=>{
                console.log('done')
            })
            .catch(()=>{
                console.log('error')
            })
        }
    }
}
</script>
<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style lang="sass">
  // this page
  .calendar-container
    position: relative

  .my-event
    width: 100%
    position: absolute
    font-size: 12px

  </style>