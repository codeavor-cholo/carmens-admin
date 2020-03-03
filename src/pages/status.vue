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
            title="Order Received!" 
            subtitle="10:00pm"   
        >
        </q-timeline-entry>

        <q-timeline-entry
            title="Preparing Order!" 
            subtitle="10:00pm"   
        >
        </q-timeline-entry>

        <q-timeline-entry
            title="Done Preparing!"
            subtitle="10:00pm"    
        >
        </q-timeline-entry>

        <q-timeline-entry
            title="Pending for delivery!"
            subtitle="10:00pm"    
        >
        </q-timeline-entry>

        <q-timeline-entry
            title="Order is out for delivery!"
            subtitle="10:00pm"    
        >
        </q-timeline-entry>

        <q-timeline-entry
            title="Delivered!"
            subtitle="10:00pm"    
        >
        </q-timeline-entry>
        </div>
        </q-timeline>
    

        <q-dialog v-model="stat" persistent>
        <q-card style="min-width: 350px">
            
            <q-card-section class="column">
                <q-radio v-model="status" color="deep-orange-4" val="rec" label="Order Received!" />
                <q-radio v-model="status" color="deep-orange-4" val="prep" label="Preparing Order!" />
                <q-radio v-model="status" color="deep-orange-4" val="done" label="Done Preparing!" />
                <q-radio v-model="status" color="deep-orange-4" val="pen" label="Pending for Delivery!" />
                <q-radio v-model="status" color="deep-orange-4" val="out" label="Order is out for delivery!" />
                <q-radio v-model="status" color="deep-orange-4" val="del" label="Order Delivered!" />
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
      status: 'rec'
    }
  }
}
</script>