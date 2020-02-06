<template>
  <q-page>
    <div>
          <q-tabs v-model="tab" vertical class="text-grey-8 bg-white full-height relative-position" active-color="pink-3" active-bg-color="pink-1">
          <div class="row q-pa-sm">
            <q-tab name="partytray" label="Party Trays" />
            <q-tab name="catering" label="Catering" />
          </div>
          </q-tabs>
          <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
           <!-- PARTY TRAYS -->
            <q-tab-panel name="partytray" style="background-color: #F5F2F2">
                <div>
                    <div class="row q-gutter-md">
                    <div style="font-size:60px;font-family: 'Domine', serif">PARTY TRAYS</div>
                    <div class="row items-center q-pa-sm" style="padding-left:120px">
                    <q-input dense style="width:400px" rounded standout="bg-white text-grey-8" clearable input-class="text-pink-6" v-model="search" label="Search" color="pink-3"/>
                    </div>
                    <div class="row items-center">
                    <q-btn-dropdown dense label="filter by" flat color="grey-8">
                        <q-list>
                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Photos</q-item-label>
                            </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Videos</q-item-label>
                            </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="onItemClick">
                            <q-item-section>
                                <q-item-label>Articles</q-item-label>
                            </q-item-section>
                            </q-item>
                        </q-list>
                        </q-btn-dropdown>
                        </div>
                        </div>          
                </div>
            </q-tab-panel>
              <!-- CATERING -->
            <q-tab-panel name="catering" style="background-color: #F5F2F2">
                <div class="row">
                    <div class="col-8 q-pl-xl q-pl-md">
                        <q-card class="my-card">
                            <q-card-section>
                                <div class="q-px-md q-pt-md" style="font-size:30px;font-family: 'Noto Serif SC', serif;"><b>John's Birthday</b></div> 
                                    <div class="row">
                                    <div class="q-pa-md"><strong>EVENT DATE:</strong></div>
                                    <div class="q-pa-md" style="max-width: 300px">
                                      <q-input filled readonly v-model="dates" mask="date">
                                        <template v-slot:append>
                                          <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                              <q-date v-model="dates" color="pink-3" mask="YYYY-MM-DD" @input="() => $refs.qDateProxy.hide()" />
                                            </q-popup-proxy>
                                          </q-icon>
                                        </template>
                                      </q-input>
                                    </div>
                                  <div class="q-pa-md q-pr-xl">
                                      </div>
                                      <div class="q-ma-lg"><strong>Pax: </strong></div>
                                        <div class="q-ma-lg cursor-pointer">
                                                {{ pax }}
                                                <q-popup-edit v-model="pax">
                                                  <template v-slot="{ initialValue, value, emitValue, set, cancel }">
                                                    <q-input type="number" style="width: 200px" class="relative position" autofocus dense :value="pax" hint="Enter Pax" @input="emitValue">
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
                                      <strong >DELIVERY ADDRESS:  </strong>    
                                        <div class="q-pl-lg cursor-pointer">
                                          {{ popAdd }}
                                          <q-popup-edit v-model="popAdd" :validate="val => val.length > 6">
                                            <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                                              <q-input style="width: 500px" class="relative position" autofocus dense :value="popAdd" hint="Enter Address" :rules="[val => validate(value) || 'Please Input Correct Address']" @input="emitValue">
                                                <template v-slot:after>
                                                  <q-btn flat dense color="grey-8" icon="cancel" @click.stop="cancel" />
                                                  <q-btn flat dense color="pink-3" icon="check_circle" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
                                                </template>
                                              </q-input>
                                            </template>
                                          </q-popup-edit>
                                        </div>
                                    </div>
                                    </q-card-section>
                                  </q-card>                    
                                </div>
                                
                                <div class="q-pa-sm q-pt-md">
                                <q-stepper v-model="step" ref="stepper" color="primary" animated active-color="pink-3" inactive-color="grey-8">
                                    <q-step :name="1" title="Select campaign settings" icon="settings" :done="step > 1">
                                        For each ad campaign that you create, you can control how much you're willing to
                                        spend on clicks and conversions, which networks and geographical locations you want
                                        your ads to show on, and more.
                                    </q-step>

                                    <q-step :name="2" title="Create an ad group" caption="Optional" icon="create_new_folder" :done="step > 2">
                                        An ad group contains one or more ads which target a shared set of keywords.
                                    </q-step>

                                    <q-step :name="3" title="Create an ad" icon="add_comment">
                                        Try out different ad text to see what brings in the most customers, and learn how to
                                        enhance your ads using features like ad extensions. If you run into any problems with
                                        your ads, find out how to tell if they're running and how to resolve approval issues.
                                    </q-step>

                                    <template v-slot:navigation>
                                        <q-stepper-navigation>
                                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" />
                                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                                        </q-stepper-navigation>
                                    </template>
                                </q-stepper>
                                </div>

                            </q-card-section>
                          </q-card>
                    </div>
                    <div class="col-4 q-pr-xl q-pl-md">
                        <q-card class="my-card">
                            <q-card-section>
                              
                                <div class="column items-center q-pa-sm">
                                    <q-card flat class="my-card bg-grey-3" style="width:300px">
                                        <q-card-section>
                                            <div class="column items-center">Order Summary - #04b7643</div>
                                        </q-card-section>
                                      </q-card>
                                </div>
              
                                <div class="q-pa-sm row justify-between">
                                    <div>Date</div>
                                    <div>27 Jul 2019</div>
                                </div>
                                <div class="q-pa-sm row justify-between">
                                    <div>Time</div>
                                    <div>04:36 PM</div>
                                </div>
                                <div class="q-pa-sm row justify-between">
                                    <div>Total Number of People</div>
                                    <div>45</div>
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
        <!-- END OF RIGHT PART -->

                </div>
            </q-tab-panel>
          </q-tab-panels>
    </div>
  </q-page>
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      tab: 'partytray',
      splitterModel: 20,
      dates: date.formatDate(new Date(), 'YYYY-MM-DD'),
      change: false,
      address: '',
      step: 1,
      popAdd: 'Click To Enter Address',
      pax: 'Click To Add Pax'
    }
  }
}
</script>
