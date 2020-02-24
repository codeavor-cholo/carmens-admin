<template>
    <q-page padding>
      <div class="desktop-only">
      <q-chip square color="deep-orange-4" class="q-ma-md q-pa-md full-width" style="height: 50px" text-color="white" icon="event">
        CALENDAR OF EVENTS
          <div class="q-pa-md row center" header>
                  <q-btn flat dense label="Today" class="q-mx-md"></q-btn>
                  <q-space></q-space>
                  <q-separator vertical></q-separator>
                  <q-btn stretch flat label="Prev" @click="calendarPrev"></q-btn>
                  <q-separator vertical></q-separator>
                  <q-btn stretch flat label="Next" @click="calendarNext"></q-btn>
                  <q-separator vertical></q-separator>
                  <q-space></q-space>
                  <span class="q-mr-xl q-toolbar__title nowrap">{{ dateToday }}</span>
          </div>
        </q-chip>
        </div>

        <div class="mobile-only">
      <q-chip square color="primary" class="q-ma-md q-pa-md full-width" style="height: 50px" text-color="white" icon="event">
       <div style="font-size:10px;width:140px"> CALENDAR OF EVENTS</div>
          <div class="row center q-gutter-sm" header>
                  <q-btn flat dense label="Today" style="font-size:10px;width:50px"></q-btn>
                  
                  <q-separator vertical style="width:0px"></q-separator>
                  <q-btn stretch flat style="font-size:10px;width:10px" label="Prev" @click="calendarPrev"></q-btn>
                  <q-separator vertical></q-separator>
                  <q-btn stretch style="font-size:10px;width:10px" flat label="Next" @click="calendarNext"></q-btn>
                  <q-separator vertical></q-separator>
                  
                  <span style="font-size:10px" class=" q-toolbar__title nowrap">{{ dateToday }}</span>
          </div>
        </q-chip>
        </div>

        <q-calendar
          @click:day="addEventDialog = true"
          v-model="selectedDate"
          :locale="locale"
          class="calendar"
          style="height: 500px"
          ref="calendar"
          :drag-over-func="onDragOver"
          :drop-func="onDrop"
          
        >

            <template #day="{ date }">
              <template v-for="(event, index) in returnCalendar(date)">
                <q-badge
                  color="deep-orange-4"
                  :key="index"
                  style="width: 100%; cursor: pointer; height: 14px; max-height: 14px"
                  class="ellipsis"
                  :class="badgeClasses(event, 'day')"
                  :style="badgeStyles(event, 'day')"
                  @click.stop.prevent="showEvent(event)"
                  :draggable="true"
                  @dragstart.native="(e) => onDragStart(e, event)"
                  @dragend.native="(e) => onDragEnd(e, event)"
                  @dragenter.native="(e) => onDragEnter(e, event)"
                  @touchmove.native="(e) => {}"
                >
                  <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.clientEvent }}/{{ event.clientFName }}</span>
                </q-badge>
              </template>
            </template>
            <template #day-header="{ date }">
              <div class="row justify-center">
                <template v-for="(event, index) in eventsMap[date]">
                  <q-badge
                    v-if="!event.clientReserveTime"
                    :key="index"
                    style="width: 100%; cursor: pointer; height: 14px; max-height: 14px"
                    class="ellipsis"
                    :class="badgeClasses(event, 'header')"
                    :style="badgeStyles(event, 'header')"
                    @click.stop.prevent="showEvent(event)"
                    :draggable="true"
                    @dragstart.native="(e) => onDragStart(e, event)"
                    @dragend.native="(e) => onDragEnd(e, event)"
                    @dragenter.native="(e) => onDragEnter(e, event)"
                    @touchmove.native="(e) => {}"
                  >
                    <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.title }}</span>
                  </q-badge>
                  <q-badge
                    v-else
                    :key="index"
                    class="q-ma-xs self-end"
                    :class="badgeClasses(event, 'header')"
                    :style="badgeStyles(event, 'header')"
                    style="width: 10px; max-width: 10px; height: 10px; max-height: 10px"
                  />
                </template>
              </div>
            </template>
            <template #intervals-header="days">
              <div class="fit flex justify-center items-end">
                <span class="q-calendar-daily__interval-text">{{ showOffset(days) }}</span>
              </div>
            </template>
        </q-calendar>
        <!-- <q-dialog v-model="viewCustomFoodPic">
            <q-card style="min-width: 400px">
                            <q-img
                                :src="this.selectedCustomFoodPic.foodPic"
                                style="width: 500px; height: 300px"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{selectedCustomFoodPic.foodName}}
                                </div>
                            </q-img>
                                <div class="text-h6 text-center q-pa-xs">
                                            FOOD DESCRIPTION<br>
                                    "{{selectedCustomFoodPic.foodDescription}}"
                                </div>
                                <div class="text-h6 text-center q-pa-xs" style="margin-bottom: -20px">
                                    "{{selectedCustomFoodPic.foodTotalPrice}} php per head"
                                </div>
                        <q-card-section>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Ok" v-close-popup />
                    </q-card-actions>
                </q-card>
        </q-dialog> -->
    </q-page>
</template>
<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<script>
import { date, colors } from 'quasar'
import { Component as QCalendar } from '@quasar/quasar-ui-qcalendar'
import { mapGetters } from 'vuex'
import { stop, prevent, stopAndPrevent } from 'quasar/src/utils/event'
import { getLocale } from '../util/getLocale'
import 'drag-drop-touch'
export default {
//   name: 'CalendarLayout',
//   components: {
//     QCalendar
//   },
  data () {
    return {
      billingdialog: false,
      additionalList: [],
      amenities: '',
      amenitiesPrice: 0,
      amenitiesQuantity: 0,
      amenitiestotalprice: 0,
      amenitiesAlltotalprice: 0,
      services: '',
      servicesPrice: 0,
      servicesQuantity: 0,
      servicestotalprice: 0,
      servicesAlltotalprice: 0,
      Amenities: [],
      servicesList: [],
      Services: [],
      Amenities: [],
      selectedCustomFoodPic: [],
      viewCustomFoodPic: false,
      customFoodSelected: [],
      Food: [],
      packAges: 'Fixed Package',
      Motif: [],
      selectMotif: '',
      motifDescripiton: '',
      emailAdd: '',
      pax: '',
      contact: '',
      selectEvent: '',
      Events: [],
      brgy: '',
      selected: [],
      city: '',
      address: '',
      etimesss: date.formatDate(new Date(), 'hh:mmA'),
      lname: '',
      fname: '',
      timesss: date.formatDate(new Date(), 'hh:mmA'),
      datesss: date.formatDate(new Date(), 'YYYY/MM/DD'),
      addEventDialog: false,
      dateFormatter: null,
      titleFormatter: null,
      Reservation: [],
      selectedDate: date.formatDate(new Date(), 'YYYY-MM-DD'),
      
    }
  },
  watch: {
    locale () {
      if (this.locale.length > 2) {
        this.updateFormatters()
      }
    },
    shortMonthLabel () {
      this.updateFormatters()
    }
  },
  beforeMount () {
    this.locale = getLocale()
    this.updateFormatters()
  },
  methods: {
    deleteServicesTask(index){
                this.servicesList.splice(index, 1) 
                this.services = ''
                this.servicesPrice = '0'
                this.servicesQuantity = '0'
                this.servicestotalprice = '0'
    },  
    amenitiesPriceOptions(){ 
                   let optionss = this.$lodash.filter(this.Amenities, m => {
						return m.amenitiesName == this.amenities 
                    })    
                        // console.log(optionss, 'ss')
                        this.amenitiesPrice = optionss[0].price
                        this.amenitiesQuantity = 0
                        this.amenitiestotalprice = 0
                },
    servicesPriceOptions(){ 
                   let optionss = this.$lodash.filter(this.Services, m => {
						return m.servicesName == this.services 
                    })    
                        // console.log(optionss, 'ss')
                        this.servicesPrice = optionss[0].servicesPrice
                        this.servicesQuantity = 0
                        this.servicestotalprice = 0
    },
    totalQprice(){      
                        this.amenitiestotalprice = parseInt(this.amenitiesPrice) * parseInt(this.amenitiesQuantity)
                },
    totalSprice(){      
                        this.servicestotalprice = parseInt(this.servicesPrice) * parseInt(this.servicesQuantity)
                },
    addAdditionalList(){
            if(this.amenitiesQuantity === 0 || this.amenities === '' || this.amenitiesQuantity === '0' || this.amenitiesQuantity < 0){
                    this.$q.dialog({
                    title: `please fill all requirements or you have negative values`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning',
                    ok: 'Ok'
                })
            }else{
                    var additional = {
                    amenitiesNames: this.amenities,
                    amenitiesPrices: parseInt(this.amenitiesPrice),    
                    amenitiesQuantities: parseInt(this.amenitiesQuantity),
                    amenitiesTotalPrices: parseInt(this.amenitiestotalprice)
                    }
                    let index = this.$lodash.findIndex(this.additionalList, a => {
                            return a.amenitiesNames == this.amenities
                    })
                    // console.log(index, 'adds')
                    if(index === -1){
                        this.additionalList.push(additional)
                    }else{
                        let tempArray = this.additionalList[index]
                        // console.log(tempArray, 'temp')
                            var additionals = {
                            amenitiesNames: this.amenities,
                            amenitiesPrices: parseInt(this.amenitiesPrice),
                            amenitiesQuantities: parseInt(this.amenitiesQuantity) + parseInt(tempArray.amenitiesQuantities),
                            amenitiesTotalPrices: parseInt(this.amenitiestotalprice) + parseInt(tempArray.amenitiesTotalPrices)
                    }
                        // console.log(additionals, 'addsss')
                        this.additionalList[index].amenitiesNames = additionals.amenitiesNames 
                        this.additionalList[index].amenitiesPrices = additionals.amenitiesPrices
                        this.additionalList[index].amenitiesQuantities = additionals.amenitiesQuantities
                        this.additionalList[index].amenitiesTotalPrices = additionals.amenitiesTotalPrices
                        // console.log(this.additionalList[index], 'index')
                    }

            }
            
            
           
    },
    addServicesList(){
            let optionss = this.$lodash.filter(this.servicesList, m => {
                    if(m.servicesNames === this.services){
                        return m
                    }
                }) 
            if(this.servicesQuantity === 0 || this.services === '' || this.servicesQuantity === '0' || this.servicesQuantity < 0){
                    this.$q.dialog({
                    title: `please fill all requirements or you have negative values`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning',
                    ok: 'Ok'
                })
            }else{
                if(optionss.length > 0){
                        this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Are you sure you want to add same Service??',
                    ok: 'Ok',
                    cancel: 'Cancel',
                    persistent: true
                    }).onOk(() => {
                        var services = {
                    servicesNames: this.services,
                    servicesPrices: parseInt(this.servicesPrice),
                    servicesQuantities: parseInt(this.servicesQuantity),
                    servicesTotalPrices: parseInt(this.servicestotalprice)
                    }
                    let index = this.$lodash.findIndex(this.servicesList, a => {
                            return a.servicesNames == this.services
                    })
                    if(index === -1){
                        this.servicesList.push(services)
                    }else{
                        let tempArray = this.servicesList[index]
                        var servicess = {
                            servicesNames: this.services,
                            servicesPrices: parseInt(this.servicesPrice),
                            servicesQuantities: parseInt(this.servicesQuantity) + parseInt(tempArray.servicesQuantities),
                            servicesTotalPrices: parseInt(this.servicestotalprice) + parseInt(tempArray.servicesTotalPrices)
                        }
                            // console.log(servicess, 'addsss')
                            this.servicesList[index].servicesNames = servicess.servicesNames 
                            this.servicesList[index].servicesPrices = servicess.servicesPrices
                            this.servicesList[index].servicesQuantities = servicess.servicesQuantities
                            this.servicesList[index].servicesTotalPrices = servicess.servicesTotalPrices
                            // console.log(this.servicesList[index], 'index')
                    }

                    }).onCancel(() => {

                    })
                }else{
                        var services = {
                    servicesNames: this.services,
                    servicesPrices: parseInt(this.servicesPrice),
                    servicesQuantities: parseInt(this.servicesQuantity),
                    servicesTotalPrices: parseInt(this.servicestotalprice)
                    }
                    let index = this.$lodash.findIndex(this.servicesList, a => {
                            return a.servicesNames == this.services
                    })
                    if(index === -1){
                        this.servicesList.push(services)
                    }else{
                        let tempArray = this.servicesList[index]
                        var servicess = {
                            servicesNames: this.services,
                            servicesPrices: parseInt(this.servicesPrice),
                            servicesQuantities: parseInt(this.servicesQuantity) + parseInt(tempArray.servicesQuantities),
                            servicesTotalPrices: parseInt(this.servicestotalprice) + parseInt(tempArray.servicesTotalPrices)
                        }
                            // console.log(servicess, 'addsss')
                            this.servicesList[index].servicesNames = servicess.servicesNames 
                            this.servicesList[index].servicesPrices = servicess.servicesPrices
                            this.servicesList[index].servicesQuantities = servicess.servicesQuantities
                            this.servicesList[index].servicesTotalPrices = servicess.servicesTotalPrices
                            // console.log(this.servicesList[index], 'index')
                    }

                }

                    
            }
            
        },
    openCustomFoodPic (j) {
          this.selectedCustomFoodPic = j 
    },
    motifdes(){ 
                   let optionss = this.$lodash.filter(this.Motif, m => {
						return m.motifName == this.selectMotif 
                    })    
                        // console.log(optionss, 'ss')
                        this.motifDescripiton = optionss[0].description
    },    
    updateProxy () {
      this.proxyDate = this.date
    },

    save () {
      this.date = this.proxyDate
    },
    updateFormatters () {
      try {
        this.dateFormatter = new Intl.DateTimeFormat(this.locale || void 0, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC'
        })
        this.titleFormatter = new Intl.DateTimeFormat(this.locale || void 0, {
          month: this.shortMonthLabel ? 'short' : 'long',
          year: 'numeric',
          timeZone: 'UTC'
        })
      } catch (e) {
        // console.error('Intl.DateTimeFormat not supported')
        this.dateFormatter = void 0
        this.titleFormatter = void 0
      }
    },
    // setToday () {
    //   date.formatDate(new Date(), 'YYYY-MM-DD')
    // },
    handleSwipe ({ evt, ...info }) {
        if (this.dragging === false) {
          if (info.duration >= 30) {
            if (info.direction === 'right') {
              this.calendarPrev()
            } else if (info.direction === 'left') {
              this.calendarNext()
            }
          }
        }
        stopAndPrevent(evt)
      },
      onDragEnter (ev, event) {
        prevent(ev)
      },
      onDragStart (ev, event) {
        this.dragging = true
        this.draggedEvent = event
        stop(ev)
      },
      onDragEnd (ev, event) {
        stopAndPrevent(ev)  
        this.resetDrag()
      },
      onDragOver (ev, day, type) {
        if (type === 'day') {
          stopAndPrevent(ev)
          return this.draggedEvent.date !== day.date
        } else if (type === 'interval') {
          stopAndPrevent(ev)
          return this.draggedEvent.date !== day.date && this.draggedEvent.time !== day.time
        }
      },
    onDrop (ev, day, type) {
      ev.preventDefault()
      ev.stopPropagation()
      if (type === 'day') {
        this.draggedEvent.date = day.date
        this.draggedEvent.side = void 0
      } else if (type === 'interval') {
        this.draggedEvent.date = day.date
        this.draggedEvent.time = day.time
        this.draggedEvent.side = void 0
      }
    },
    resetDrag () {
      this.draggedEvent = void 0
      this.dragging = false
      if (Platform.is.desktop) {
        this.ignoreNextSwipe = true
      }
    },
    calendarNext () {
            this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    },
    // padNumber (num, length) {
    //         let padded = String(num)
    //         while (padded.length < length) {
    //           padded = '0' + padded
    //         }
    //         return padded
    // },
    isCssColor (color) {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
    },

    badgeClasses (event, type) {
      const cssColor = this.isCssColor(event.bgcolor)
      const isHeader = type === 'header'
      return {
        [`text-white bg-${event.bgcolor}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
      }
    },

    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      let s = {}
      if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s['color'] = colors.luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
      }
      if (timeStartPos) {
        s['top'] = timeStartPos(event.time) + 'px'
      }
      if (timeDurationHeight) {
        s['height'] = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
    returnCalendar(dt){
          console.log('dt',dt)
          let ReserveDate = []
          for(let x=0; x < this.Reservation.length; x++){
            let dateFormat = date.formatDate(this.Reservation[x].clientReserveDate, 'YYYY-MM-DD')
            if(dateFormat == dt){
              
              console.log('clientReserveDate',this.Reservation[x].clientReserveDate)
              ReserveDate.push(this.Reservation[x])
            }
          }
          console.log('ReserveDate',ReserveDate)
          return ReserveDate
        }
      },
      mounted() {
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
        }),
        this.$binding('Events', this.$firestoreApp.collection('Events'))
            .then(Events => {
            console.log(Events, 'Events')
        }),
        this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
        }),
        this.$binding('Food', this.$firestoreApp.collection('Food'))
            .then(Food => {
            console.log(Food, 'Food')
        }),
        this.$binding('Services', this.$firestoreApp.collection('Services'))
            .then(Services => {
            // console.log(Services, 'Services')
        }),
        this.$binding('Amenities', this.$firestoreApp.collection('Amenities'))
            .then(Amenities => {
            // console.log(Services, 'Services')
        })
      },
      computed: {
        plusTwenty(){
        if(this.pax <= 99){
            return 20
        }else{
            return 0
        }
        },
        paxlesshundred(){
            if(this.pax === 0){
                return 0
            }else{
                let sum = parseInt(this.plusTwenty) * parseInt(this.pax)
                        return sum
            }
        },
        customtotalPackBalance() {
                    if(this.customizeTotalPackPrice === 0 && this.customcashAmount === '' && this.customcashAmount === 0){
                        return 0
                    }else{
                    let sum = parseInt(this.customizeTotalPackPrice) - parseInt(this.customcashAmount)
                    return sum
                    }
            },
        totalAdditionalPrice() {
                    if(this.servicesPriceAll === 0 && this.additionalPrice === 0){
                        return 0
                    }else{
                   // maindishTotalPrice = parseInt(this.saveMainDish.foodPrice) + parseInt(this.saveMainDish.foodPrice)
                    let totalAP = this.$lodash.sum([parseInt(this.additionalPrice),parseInt(this.servicesPriceAll)])
                    // console.log(totalAP, 'price')
                    return totalAP
                    }
        },
        customizeTotalPackPrice() {
                            if(this.totalcustomPackPrice === 0 && this.totalAdditionalPrice === 0 && this.paxlesshundred === 0 ){
                                return 0
                            }else{
                          // maindishTotalPrice = parseInt(this.saveMainDish.foodPrice) + parseInt(this.saveMainDish.foodPrice)
                            let totalAP = this.$lodash.sum([parseInt(this.totalcustomPackPrice),parseInt(this.totalAdditionalPrice),parseInt(this.paxlesshundred)])
                            // console.log(totalAP, 'price')
                            return totalAP
                            }
            },
        totalcustomPackPrice(){      
                    if(this.packageOptions.packagePrice === 0 && this.pax === 0){
                        return 0
                    }else{
                    let sum = parseInt(this.pax) * parseInt(this.cpPrice)
                    return sum
                    }
        },
        customizeTotalpackagePriceNaTowithDiscount() {
                            if(this.customizeTotalPackPrice === 0){
                                return 0
                            }else{
                            let sum = .50 * parseInt(this.customizeTotalPackPrice)
                            return sum
                            }
            },
         additionalPrice() {
                    if(this.additionalList.length === 0){
                        return 0
                    }else{
                    let sum = this.$lodash.sumBy(this.additionalList, 'amenitiesTotalPrices')
                    // console.log(sum, 'sum')
                    return sum
                    }
        },
        servicesPrices() {
                    if(this.servicesList.length === 0){
                        return 0
                    }else{
                    let sum = this.$lodash.sumBy(this.servicesList, 'servicesTotalPrices')
                    // console.log(sum, 'sum')
                    return sum
                    }
        },
        cpPriceTotal(){
        let pricePH = this.$lodash.sum([parseInt(this.additionalPrice),parseInt(this.servicesPrices)])
        // console.log(pricePH, 'price')
        return pricePH
        },
        cpPrice(){
            if(this.customFoodSelected.length === 0){
                return 0
            }else{
            let sum = this.$lodash.sumBy(this.customFoodSelected, 'foodTotalPrice')
            // console.log(sum, 'sum')
            return sum
            }
        },
        amenitiesOptions(){
                let options = this.Amenities.map(Amenities => {
                    return {
                        label: Amenities.amenitiesName,
                        value: Amenities.amenitiesName
                    }
                })

                return options
            },
        servicesOptions(){
                        let options = this.Services.map(Services => {
                            return {
                                label: Services.servicesName,
                                value: Services.servicesName
                            }
                        })

                        return options
                    },
        additionalListNew() {
                    return this.additionalList
        },
        //servicesList sum and new data
        servicesListNew() {
                        return this.servicesList
        },
        customListofFood(){
        let foodList = this.$lodash.filter(this.Food, f => {
            f.checkerName = f.dishType + '/' + f.category
            return f
        })
        let groupFood = this.$lodash.groupBy(foodList, 'checkerName')
        let mapKey = this.$lodash.map(groupFood, function(value, key){
            let newDish = key.toString().split("/")
            return {
                dishType: newDish[0], 
                category: newDish[1],
                food: value
            }
        })

        // console.log(mapKey, 'mapKEy')
        return mapKey
        
        
    },
         motifOptions(){
                let options = this.Motif.map(Motif => {
                    return {
                        label: Motif.motifName,
                        value: Motif.motifName
                    }
                })

                return options
            },
        packageOptions(){
        if(this.selected.length === 0){
                return 0
        }else{
            return this.selected[0]
        }
      },
        eventOptions(){
                 let options = this.Events.map(Events => {
                        return {
                            label: Events.event,
                            value: Events.event
                        }
                    })
                    return options
            },
        eventsMap () {
          const map = {}
          this.Reservation.forEach((event) => (map[event.clientReserveDate] = map[event.clientReserveDate] || []).push(event))
          return map
        },
        selectedDate: {
        get () {
          return this.$store.state.calendar.selectedDate
        },
        set (date) {
          this.$store.commit('calendar/selectedDate', clientReserveDate)
        }
      },
        dateToday () {
            if (this.titleFormatter && this.locale) {
              const date =  new Date(this.selectedDate)
              //selectedDate: date.formatDate(new Date(), 'YYYY-MM-DD'),
              return this.titleFormatter.format(date)
            }
            return ''
          },
      }
        
}
</script>
<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style lang="stylus">
  // calendar overrides
  .q-calendar-daily__day-interval:hover
    background-color rgba(0,0,255,.1)
  .q-calendar-weekly__workweek:hover
    background-color rgba(0,0,255,.1)
  .q-calendar-weekly__day:hover
    background-color rgba(0,0,255,.1)
  .q-calendar-weekly__head-weekday:hover
    background-color rgba(0,0,255,.1)
  // this page
  .calendar-container
    position relative
  .my-event
    width 100%
    position absolute
    font-size 12px
  .full-width
    left 0
    width 100%
  .left-side
    left 0
    width 49.75%
  .right-side
    left 50.25%
    width 49.75%
  </style>