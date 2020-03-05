<template>
    <q-page>
            <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="deep-orange-4"
            indicator-color="deep-orange-4"
            align="justify"
            narrow-indicator
            >
            <q-tab name="catering" label="Catering" />
            <q-separator vertical/>
            <q-tab name="tray" label="Party Tray" />
            </q-tabs>

            <q-separator />

<!-- CATERING PART -->
            <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="catering">
                <!-- <div class="text-h5 text-center text-deep-orange">Catering</div> -->
                
                <q-list separator>
                    <q-item>
                        <q-item-section>
                            <div style="font-size:16px"><b>Date: </b></div>
                            <div style="font-size:16px"><b>Name: </b></div>
                            <div style="font-size:16px"><b>Where: </b></div>
                            <div class="row">
                                <div class="col" style="font-size:16px"><b>From: </b></div>
                                <div class="col" style="font-size:16px"><b>To: </b></div>
                            </div>
                            <div class="row items-center q-gutter-sm justify-center q-pt-sm">
                                <q-icon name="local_shipping" style="font-size: 1.5rem" />
                            <div>Latest Status</div>
                            </div>
                            <div class="row q-pt-sm">
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="View Status" @click="view_catering = true" />
                                </div>
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="Update Status" @click="update_catering = true" />
                                </div>
                            </div>
                        </q-item-section>    
                    </q-item>

                    <div class="q-py-sm">    
                        <q-separator color="black" />
                    </div>

                    <q-item>
                        <q-item-section>
                            <div style="font-size:16px"><b>Date: </b></div>
                            <div style="font-size:16px"><b>Name: </b></div>
                            <div style="font-size:16px"><b>Where: </b></div>
                            <div class="row">
                                <div class="col" style="font-size:16px"><b>From: </b></div>
                                <div class="col" style="font-size:16px"><b>To: </b></div>
                            </div>
                            <div class="row items-center q-gutter-sm justify-center q-pt-sm">
                            <q-icon name="local_shipping" style="font-size: 1.5rem" />
                            <div>Latest Status</div>
                            </div>
                            <div class="row q-pt-sm">
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="View Status" @click="view_catering = true" />
                                </div>
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="Update Status" @click="update_catering = true" />
                                </div>
                            </div>
                        </q-item-section>    
                    </q-item>

                </q-list>
            </q-tab-panel>
<!-- END OF CATERING PART -->

<!-- PARTY TRAY PART -->
            <q-tab-panel name="tray">
                <!-- <div class="text-h6">Party Tray</div> -->
                <q-list separator>
                    <q-item>
                        <q-item-section>
                            <div style="font-size:16px"><b>Name: </b></div>
                            <div style="font-size:16px"><b>Where: </b></div>
                            <div class="row items-center q-gutter-sm justify-center q-pt-sm">
                                <q-icon name="local_shipping" style="font-size: 1.5rem" />
                            <div>Latest Status</div>
                            </div>
                            <div class="row q-pt-sm">
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="View Status" @click="view_tray = true" />
                                </div>
                                <div class="col">
                                    <q-btn flat color="deep-orange-5" label="Update Status" @click="update_tray = true" />
                                </div>
                            </div>
                        </q-item-section>
                    </q-item>

                </q-list>
            </q-tab-panel>
<!-- END OF PARTY TRAY PART -->

            </q-tab-panels>

<!-- VIEWING OF CATERING STATUS -->
            <q-dialog v-model="view_catering" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Event Status</div>
                <q-timeline color="deep-orange-4">
                    <div class="q-pl-md">
                    <q-timeline-entry
                        title="Event is Today!" 
                        subtitle="10:00am"   
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Preparing Food!" 
                        subtitle="10:30am"   
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Preparing Setup!"
                        subtitle="11:00am"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="The Catering Team is en route!"
                        subtitle="11:30am"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="The Catering Team is on the event area!"
                        subtitle="12:00pm"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Setup on process!"
                        subtitle="12:30pm"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Done Setup!"
                        subtitle="12:30pm"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="The event place is ready!"
                        subtitle="12:30pm"    
                    >
                    </q-timeline-entry>
                    </div>
                </q-timeline>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" color="deep-orange-4" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
<!-- END OF VIEWING OF CATERING STATUS -->

<!-- UPDATE CATERING STATUS -->
            <q-dialog v-model="update_catering" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Update Event Status</div>
                </q-card-section>

                <q-card-section class="column">
                    <q-checkbox v-model="today" color="deep-orange-4" label="Event is Today!" />
                    <q-checkbox v-model="prep_food" color="deep-orange-4" label="Preparing Food!" />
                    <q-checkbox v-model="prep_set" color="deep-orange-4" label="Preparing Setup!" />
                    <q-checkbox v-model="route" color="deep-orange-4" label="The Catering Team is en route!" />
                    <q-checkbox v-model="area" color="deep-orange-4" label="The Catering Team is on the event area!" />
                    <q-checkbox v-model="process" color="deep-orange-4" label="Setup on process!" />
                    <q-checkbox v-model="done" color="deep-orange-4" label="Done Setup!" />
                    <q-checkbox v-model="ready" color="deep-orange-4" label="The event place is ready!" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" color="deep-orange-4" v-close-popup />
                <q-btn flat label="Submit" color="deep-orange-4" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
<!-- END OF UPDATE CATERING STATUS -->

<!-- VIEWING OF PARTY TRAY STATUS -->
            <q-dialog v-model="view_tray" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Order Status</div>
                <q-timeline color="deep-orange-4">
                    <div class="q-pl-md">
                    <q-timeline-entry
                        title="Order Confirmed!" 
                        subtitle="10:00am"   
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Preparing Order!" 
                        subtitle="10:30am"   
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Done Preparing!"
                        subtitle="11:00am"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Pending for delivery!"
                        subtitle="11:30am"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Order is out for delivery!"
                        subtitle="12:00pm"    
                    >
                    </q-timeline-entry>

                    <q-timeline-entry
                        title="Delivered!"
                        subtitle="12:30pm"    
                    >
                    </q-timeline-entry>
                    </div>
                </q-timeline>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" color="deep-orange-4" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
<!-- END OF VIEWING OF PARTY TRAY STATUS -->

<!-- UPDATE PARTY TRAY STATUS -->
            <q-dialog v-model="update_tray" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                <div class="text-h6">Update Order Status</div>
                </q-card-section>

                <q-card-section class="column">
                    <q-checkbox v-model="rec" color="deep-orange-4" label="Order Confirmed!" />
                    <q-checkbox v-model="prep" color="deep-orange-4" label="Preparing Order!" />
                    <q-checkbox v-model="done" color="deep-orange-4" label="Done Preparing!" />
                    <q-checkbox v-model="pen" color="deep-orange-4" label="Pending for Delivery!" />
                    <q-checkbox v-model="out" color="deep-orange-4" label="Order is out for delivery!" />
                    <q-checkbox v-model="del" color="deep-orange-4" label="Order Delivered!" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" color="deep-orange-4" v-close-popup />
                <q-btn flat label="Submit" color="deep-orange-4" v-close-popup />
                </q-card-actions>
            </q-card>
            </q-dialog>
<!-- END OF UPDATE PARTY TRAY STATUS -->


    </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: 'catering',
      view_catering: false,
      update_catering: false,
      view_tray: false,
      update_tray: false,
      today: false,
      prep_food: false,
      prep_set: false,
      route: false,
      area: false,
      process: false,
      done: false, 
      ready: false,
      rec: false,
      prep: false,
      done: false,
      pen: false,
      out: false,
      del: false
    }
  }
}
</script>