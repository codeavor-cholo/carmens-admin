<template>
    <q-page>
        <q-list class="q-pt-md" separator>
            <q-item>
                <q-item-section>
                    <div class="row">    
                        <div class="col-8 column">
                            <q-item-label>Name of the customer</q-item-label>
                            <q-item-label caption>Number of the customer</q-item-label>
                            <q-item-label>Address here</q-item-label>
                        </div>
                        <div class="col">
                            <q-btn outline color="deep-orange-4" label="Payment" />
                        </div>
                    </div>
                <q-item-label class="text-center">Orders to deliver</q-item-label>
                    <q-list bordered separator>
                        <q-item>
                            <q-item-section>
                            <q-item-label>Food Name</q-item-label>
                            <div class="row justify-around">
                                <img src="statics/pics/foo.jpeg" style="width:60px;height:60px">
                                <div class=" items-center">
                                    <q-item-label caption>Price</q-item-label>
                                    <q-item-label caption>x2</q-item-label>
                                    <q-item-label caption>Total Price</q-item-label>
                                </div>
                            </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section>
                            <q-item-label>Food Name</q-item-label>
                            <div class="row justify-around">
                                <img src="statics/pics/foo.jpeg" style="width:60px;height:60px">
                                <div class=" items-center">
                                    <q-item-label caption>Price</q-item-label>
                                    <q-item-label caption>x2</q-item-label>
                                    <q-item-label caption>Total Price</q-item-label>
                                </div>
                            </div>
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section class="text-right q-pr-lg">
                            <q-item-label>Total Price: &nbsp;&nbsp;&nbsp; TOTAL</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <div class="row items-center q-gutter-sm justify-center q-pt-sm">
                        <q-icon name="local_shipping" style="font-size: 1.5rem" />
                        <div>Latest Status</div>
                    </div>
                    <div class="q-pt-sm">
                        <q-btn flat class="full-width" color="deep-orange-4" @click="$router.push('/status')" label="View Delivery Status" icon-right="keyboard_arrow_right" />
                    </div>
                </q-item-section>      
            </q-item>

            <div class="q-py-sm">    
                <q-separator color="black" />
            </div>

            <q-item>
                <q-item-section>
                <q-item-label>Name of the customer</q-item-label>
                <q-item-label caption>Number of the customer</q-item-label>
                <q-item-label>Address here</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page>    
</template>