<template>
  <q-page>
    <div v-show="showdateform" class="q-pa-md">
        <div>
            <q-card class="my-card fixed-center q-mt-lg" style="width: 700px; max-width: 80vw;height: 470px; max-height: 50vw">
              <q-card-section>
                <strong class="text-grey text-h6 q-pa-md">Select Date and Fill up Form</strong>
                <div class="q-pa-md" style="float:left; width: 50%">
                  <q-date v-model="dates" mask="YYYY/MM/DD" color="pink-3" today-btn/>
                </div>
                <div style="float: right;width:50%;">
                  <div class="row">
                    <q-input class="q-pt-sm" color="pink-3" style="width: 163px" outlined dense v-model="clientFName" label="First Name"/>
                    <q-input class="q-pt-sm q-ml-sm" color="pink-3" style="width: 163px" outlined dense v-model="clientLName" label="Last Name"/>
                  </div>
                  <q-input class="q-pt-sm" color="pink-3" outlined dense v-model="clientEmail" label="Email"/>
                  <q-input class="q-pt-sm" color="pink-3" outlined dense v-model="clientAddress" label="Event Place"/>
                  <q-select class="q-pt-sm" color="pink-3" dense outlined v-model="selectCity" :options="cityOpt" emit-value map-options label="Select City" />
                  <q-input class="q-pt-sm" color="pink-3" outlined dense v-model="clientEvent" label="Event Name"/>
                  <div class="row">
                    <q-select class="q-pt-sm" color="pink-3" dense outlined style="width: 163px" v-model="selectMotif" :options="motifOpt" emit-value map-options label="Select Motif" />
                    <q-input class="q-pt-sm q-ml-sm" type="number" style="width: 163px" color="pink-3" outlined dense v-model="clientPax" label="Pax"/>
                  </div>
                  <div class="row">
                    <q-input type="time" class="q-pt-sm" color="pink-3" dense outlined style="width: 163px" v-model="startTime" hint="Start Time" />
                    <q-input type="time" class="q-pt-sm q-ml-sm" dense style="width: 163px" color="pink-3" outlined v-model="endTime" hint="End Time"/>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal fixed-bottom">
                <q-btn flat label="Continue" color="pink-3" @click="showreserveform = true, showdateform = false" />
              </q-card-actions>
            </q-card>
        </div>
    </div>
    <div v-show="showreserveform">
        <div class="row">
            <div class="col-8 q-pt-lg q-pl-xl q-pl-md">
                <q-card class="my-card">
                    <q-card-section class="row items-center q-pb-none">
                      <div class="q-px-md" style="font-size:30px;font-family: 'Noto Serif SC', serif;"><b>{{clientFName}} {{clientLName}}'s {{clientEvent}}</b></div> 
                      <q-space />
                      <q-btn label="Back to Form" color="grey-8" flat dense @click="showreserveform = false, showdateform = true" />
                    </q-card-section>
                    <q-card-section>
                            <div class="row">
                              <strong class="q-mt-lg q-ml-lg">EVENT DATE:</strong>
                              <div class="q-pa-md" style="max-width: 250px">
                                <q-input filled readonly v-model="dates" style="width: 170px" mask="date">
                                  <template v-slot:append>
                                    <q-icon name="mdi-pencil" color="teal" class="cursor-pointer">
                                      <q-tooltip>Edit</q-tooltip>
                                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="dates" color="pink-3" mask="YYYY/MM/DD" @input="() => $refs.qDateProxy.hide()" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                              </div>
                              <div class="q-mt-lg q-mr-sm"><strong>Email: </strong></div>
                                <div class="q-mt-lg cursor-pointer">
                                        {{ clientEmail }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="clientEmail">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-input style="width: 400px" class="relative position" autofocus dense :value="clientEmail" hint="Enter Email" @input="emitValue">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-input>
                                          </template>
                                        </q-popup-edit>
                                  </div>
                              <div class="q-mt-lg q-mr-sm q-ml-md"><strong>Pax: </strong></div>
                                <div class="q-mt-lg cursor-pointer">
                                        {{ clientPax }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="clientPax">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-input type="number" style="width: 200px" class="relative position" autofocus dense :value="clientPax" hint="Enter Pax" @input="emitValue">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-input>
                                          </template>
                                        </q-popup-edit>
                                  </div>    
                              </div>
                              <div class="row" style="margin-left: 295px; margin-top: -35px">
                                <div class="q-mr-sm q-ml-md"><strong>Motif: </strong></div>
                                <div class=" cursor-pointer">
                                        {{ selectMotif }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="selectMotif">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-select class="q-ml-sm" style="width: 300px" color="pink-3" dense outlined v-model="selectMotif" :options="motifOpt" emit-value map-options label="Select Motif">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-select>
                                          </template>
                                        </q-popup-edit>
                                  </div>
                              <div class="q-mr-sm q-ml-md"><strong>Start Time: </strong></div>
                                <div class=" cursor-pointer">
                                        {{ startTime }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="startTime">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-input type="time" class="q-pt-sm" style="width: 200px" color="pink-3" dense outlined v-model="startTime" hint="Start Time">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-input>
                                          </template>
                                        </q-popup-edit>
                                  </div>
                              <div class="q-mr-sm q-ml-md"><strong>End Time: </strong></div>
                                <div class=" cursor-pointer">
                                        {{ endTime }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="endTime">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-input type="time" class="q-pt-sm" style="width: 200px" color="pink-3" dense outlined v-model="endTime" readonly hint="End Time">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-input>
                                          </template>
                                        </q-popup-edit>
                                  </div>
                              </div>
                        <!-- card for address input -->
                        <div class="q-pa-sm"> 
                          <q-card class="my-card bg-grey-3">
                            <q-card-section>
                            <div class="row">
                              <strong >Event Place:  </strong>    
                                <div class="q-pl-lg cursor-pointer">
                                  {{ clientAddress }}
                                  <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                    <q-tooltip>Edit</q-tooltip>
                                  </q-icon>
                                  <q-popup-edit v-model="clientAddress" :validate="val => val.length > 6">
                                    <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                                        <q-input style="width: 500px" class="relative position" autofocus dense :value="clientAddress" hint="Enter Address" @input="emitValue">
                                          <template v-slot:after>
                                            <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                            <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set"/>
                                          </template>
                                        </q-input>
                                    </template>
                                  </q-popup-edit>
                                </div>
                                <div class="q-ml-sm cursor-pointer">
                                        {{ selectCity }}
                                        <q-icon class="q-ml-sm" name="mdi-pencil" color="teal" style="font-size: 1.5em">
                                          <q-tooltip>Edit</q-tooltip>
                                        </q-icon>
                                        <q-popup-edit v-model="selectCity">
                                          <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                            <q-select class="q-ml-sm" style="width: 300px" color="pink-3" dense outlined v-model="selectCity" :options="cityOpt" emit-value map-options label="Select City">
                                              <template v-slot:after>
                                                <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" />
                                              </template>
                                            </q-select>
                                          </template>
                                        </q-popup-edit>
                                  </div>
                            </div>
                            </q-card-section>
                          </q-card>                    
                        </div>
                        
                        <div class="q-pa-sm q-pt-md">
                        <q-stepper v-model="step" ref="stepper" color="primary" animated active-color="pink-3" inactive-color="grey-8">
                            <q-step :name="1" title="Select Package" icon="settings" :done="step > 1">
                                <q-table grid :data="Packages" :columns="columns" :filter="filter" row-key=".key" selection="single" :selected.sync="selected">
                                    <template v-slot:item="props">
                                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" color="pink-3" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                            <q-card class="my-card" style="border: 2px solid;border-color: grey;" >
                                                <q-card-section side>
                                                    <q-list dense>
                                                    <q-item class="q-mt-sm">
                                                    <span class="full-width text-center text-teal text-h6 text-weight-bold">
                                                        <q-checkbox @input="consoleselected" color="pink-3" dense v-model="props.selected" :label="props.row.name" />
                                                        <br>
                                                        <q-chip class="text-center">{{props.row.price}}php per pax</q-chip>
                                                    </span>
                                                    </q-item>     
                                                    <q-separator class="q-mt-sm"/>
                                                    <q-item class="q-mt-sm text-grey-8" v-show="props.row.viands">
                                                    <span class="full-width text-center text-weight-bold">FOOD CATEGORIES</span>
                                                    </q-item>
                                                    <q-item v-for="(price, index) in props.row.viands" :key="index" class="text-grey-8">
                                                        <q-item-section>
                                                        <q-item-label> {{ price.viandsQty }} viand<span v-show="price.viandsQty != '1'">s</span> of {{ price.category }}</q-item-label>
                                                        </q-item-section>
                                                    </q-item>
                                                    <q-separator class="q-mt-sm"/>
                                                    <q-item class="q-mt-sm" v-show="props.row.inclusions">
                                                    <span class="full-width text-center text-weight-bold text-grey-8" >INCLUSIONS</span>
                                                    </q-item>
                                                    <q-item v-for="(price, index) in props.row.inclusions" :key="index" class="text-grey-8">
                                                        <q-item-section>
                                                        <q-item-label> {{ price.inclusion }}</q-item-label>
                                                        </q-item-section>
                                                    </q-item>
                                                </q-list>
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                    </template>
                                </q-table>
                            </q-step>

                            <q-step :name="2" title="Create an ad group" caption="Optional" icon="create_new_folder" :done="step > 2">
                                
                            </q-step>

                            <q-step :name="3" title="Create an ad" icon="add_comment">
                                Try out different ad text to see what brings in the most customers, and learn how to
                                enhance your ads using features like ad extensions. If you run into any problems with
                                your ads, find out how to tell if they're running and how to resolve approval issues.
                            </q-step>

                            <template v-slot:navigation>
                                <q-stepper-navigation>
                                <q-btn flat  @click="$refs.stepper.next()" color="pink-3" :label="step === 3 ? 'Finish' : 'Continue'" />
                                <q-btn v-if="step > 1" flat color="grey-8" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </template>
                        </q-stepper>
                        </div>

                    </q-card-section>
                  </q-card>
            </div>
            <q-page-sticky position="top-right" :offset="[18, 0]">
            <div class="col-4 q-pt-lg q-pr-xl q-pl-md">
                <q-card class="my-card">
                    <q-card-section>
                      
                        <div class="column items-center q-pa-sm">
                            <q-card flat class="my-card bg-grey-3" style="width:300px">
                                <q-card-section>
                                    <div class="column items-center">Order Summary - #04b7643</div>
                                </q-card-section>
                              </q-card>
                        </div>
                        <div> 
                        <q-separator inset class="black"/>
                        </div>
                    
                        <div class="q-pa-sm"><b>Items</b></div>
                        <div class="q-pa-sm">Mutton Fry</div>
                        <div class="q-pa-sm">Chicken Fried Rice</div>
                        <div class="q-pa-sm">Chili Prawn</div>
                        <div class="q-pa-sm">Ghost Chicken</div>
                        <div class="q-pa-sm">Chicken G5</div>
                        <div class="q-pa-sm">Fish Gravy</div>

                        <div> 
                        <q-separator inset class="black"/>
                        </div>

                        <div class="q-pa-sm"><b>Add-ons</b></div>
                        <div class="q-pa-sm row justify-between">
                            <div>Tattoo Artists</div>
                            <div>3,000</div>
                        </div>
                        <div class="q-pa-sm row justify-between">
                            <div>Hair Braiding</div>
                            <div>3,500</div>
                        </div>
                        <div class="q-pa-sm row justify-between">
                            <div>Master of Ceremony</div>
                            <div>3500</div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>    
            </q-page-sticky>
        </div>
    </div> <!-- <----- End Div-->
  </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      startTime: date.formatDate(new Date(), 'hh:mmA'),
      endTime: date.formatDate(new Date(), 'hh:mmA'),
      clientAddress: '',
      clientFName: '',
      clientLName: '',
      clientEvent: '',
      clientPax: 0,
      clientEmail: '',
      selectMotif: '',
      selectCity: '',
      City: [],
      Packages: [],
      Motif: [],
      selected: [],
      Inclusion: [],
      showreserveform: false,
      showdateform: true,
      tab: 'partytray',
      splitterModel: 20,
      dates: date.formatDate(new Date(), 'YYYY/MM/DD'),
      change: false,
      address: '',
      step: 1,
      filter: '',
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'name', required: true, label: 'Package name', align: 'center', field: 'name', sortable: true },
                { name: 'price', align: 'center', label: 'Package Per Head Price', field: 'price', sortable: true },
            ]
    }
  },
  mounted(){
    this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
            }),
    this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
            }),
    this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            }),
    this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            })
  },
  computed: {
    motifOpt(){
          let optionss = this.Motif.map(m => {
              return {
                  label: m.motif,
                  value: m.motif
              }
          })
          return optionss
      },
      cityOpt(){
          let optionss = this.City.map(m => {
              return {
                  label: m.city,
                  value: m.city
              }
          })
          return optionss
      },
  },
  methods: {
    consoleselected(){
                 console.log(this.selected, 'eventssss')
    },
  }
}
</script>
