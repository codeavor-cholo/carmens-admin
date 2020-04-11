<template>
    <q-page id="page" class="q-pb-md">
        <div id="noti" class="text-weight-bold">
            Notifications
        </div>

        <div id="list">
            <q-list bordered separator>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <div align="right" class="q-pr-lg">
                            Date
                        </div>
                        <div id="newreserve" class="text-weight-medium">We have new Reservation.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>Name</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Date of reservation</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Time of reservation</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Place of reservation</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <div align="right" class="q-pr-lg">
                            Date
                        </div>
                        <div id="newreserve" class="text-weight-medium">We have new Party Tray Order.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>Name</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Date of Order</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Time of Order</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Place of Order</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <div align="right" class="q-pr-lg">
                            Date
                        </div>
                        <div id="newreserve" class="text-weight-medium">You have new Schedule.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>Name of Reservation</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Date of Schedule</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Time of reservation</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Place of Schedule</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <div align="right" class="q-pr-lg">
                            Date
                        </div>
                        <div id="newreserve" class="text-weight-medium">We have new customer's payment.</div>
                        <q-item-label class="q-pt-sm q-pl-md" caption>Details</q-item-label>
                        <div class="column q-pl-xl q-py-sm">
                            <q-item-label class="text-deep-orange" caption>Name</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Amount of Payment</q-item-label>
                            <q-item-label class="text-deep-orange" caption>Balance Payment</q-item-label> 
                        </div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>

            </q-list>
        </div>
    </q-page>
</template>

<style type = "text/css">
    /* #page {
        padding-top:50px;
    } */
    #noti {
        font-size:30px;
        padding-left:10px;
        padding-bottom:10px;
        padding-top:20px;
    }
    #eve {
        font-size:17px;
        font-weight: bold;
    }
    #row {
        padding-right:25px;
    }
    #newreserve {
        font-size:22px;
    }
    

@media only screen and (min-width: 1000px) {
  #noti {
      padding-top:25px;
      padding-bottom:20px;
      font-size:30px;
      padding-left:350px;
  }
  #list{
      padding-left:400px;
      padding-right:400px;
  }
}

</style>