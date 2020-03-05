<template>
    <q-page class="q-pt-md">
        <div class="row justify-end">
            <q-btn color="deep-orange-4" flat @click="$router.push('/monitor')" icon="keyboard_arrow_left" label="Back" />
        </div>
        <div class="q-pl-md q-pb-md" style="font-size:23px">CUSTOMER'S NAME ORDER</div>
          <div class="row items-center justify-around">  
            <div style="font-size:20px">Delivery Status</div>
            <q-btn color="deep-orange-4" flat label="Update Status" @click="stat = true" />
          </div>
        
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
    

        <q-dialog v-model="stat" persistent>
        <q-card style="min-width: 350px">
            
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
    </q-page>
</template>


<script>
export default {
  data () {
    return {
      stat: false,
      payment: false,
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