<template>
    <q-page>
        <div>
            <div class="row q-gutter-md justify-center">
                <div class="q-pa-sm">
                    <q-input v-model="filter" dense style="width:400px" rounded standout="bg-white text-grey-8" clearable input-class="text-deep-orange-4" label="Search Food" class="q-ma-md" outlined icon="search" >
                        <template v-slot:prepend>
                            <q-icon name="search" color="deep-orange-4"/>
                        </template>
                    </q-input>
                </div>
                <div>
                    <q-btn @click="viewFoodOrder = true" size="1.7rem" class="q-mt-sm" flat color="grey-8" icon="mdi-cart">
                        <q-badge color="deep-orange-4" v-show="this.cartList.length != 0" floating>{{cartLength}}</q-badge>
                        <q-tooltip>
                            View Food Order
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>          
        </div>
        <div>
            <q-table grid :data="returnWithPartyTrays" :columns="columns" :pagination="pagination" :filter="filter" class="row items-center q-pa-sm">
                <template v-slot:item="props">            
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card flat class="my-card" style="border: 2px solid;border-color: orange" >
                            <div>
                            <q-card-section>
                                <q-img :src="props.row.foodPic" :ratio="4/3"/>
                            </q-card-section>
                            <q-card-section side>
                                <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" v-show="col.name != 'partyTrayPrice'">
                                    <q-item-section >
                                    <div class="row justify-between">
                                        <div style="font-family: 'Roboto Slab', serif;"><b>
                                            {{ col.label }}
                                            </b>
                                        </div>
                                        <div style="font-family: 'Roboto Slab', serif;">
                                            {{ col.value }}
                                        </div>
                                    </div>
                                    </q-item-section>
                                </q-item>
                                <q-item class="q-mt-sm" v-show="props.row.partyTrayPrice">
                                <span class="full-width text-center text-weight-bold" style="font-size:18px;font-family: 'Roboto Slab', serif;">PARTY TRAY PRICES</span>
                                </q-item>
                                <q-item v-for="(price, index) in props.row.partyTrayPrice" :key="index">
                                    <q-item-section>
                                    <div class="row justify-between">
                                        <div style="font-family: 'Roboto Slab', serif;"><b>
                                            {{ price.label }}({{price.paxMin}} - {{price.paxMax}})
                                            </b>
                                        </div>
                                        <div style="font-family: 'Roboto Slab', serif;">                               
                                            {{ price.price }}
                                        </div>
                                    </div>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section class="q-mb-none q-pb-none" side>
                                        <q-btn color="deep-orange-4" @click="addPorder = true, openPorder(props)" class="q-ml-lg" flat size="md" label="Add To Purchase Order"/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            </q-card-section>
                            </div>
                        </q-card>
                    </div>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="addPorder">
            <q-card class="text-center text-weight-bold" style="min-width: 400px">
                            <q-img
                                :src="this.selectedPorder.foodPic"
                                :ratio="4/3"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{this.selectedPorder.foodName}}
                                </div>
                            </q-img>
                            <span class="text-center text-weight-bold text-h6" style="font-family: 'Roboto Slab', serif;">PARTY TRAY SIZE/s AND PRICES</span>
                                <div class="q-pa-sm" v-for="(price, index) in this.selectedPorder.partyTrayPrice" :key="index">
                                    <div>
                                        <q-checkbox @input="consolePorder" keep-color color="deep-orange-4" dense :val="price" v-model="pOrderSelected" />
                                        {{ price.label }}({{price.paxMin}} - {{price.paxMax}}) for {{ price.price }}php
                                        </div>
                                </div>
                        <q-card-section>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat color="grey-8" label="Cancel" v-close-popup />
                        <q-btn flat color="deep-orange-4" label="Add To Order" @click="addToCart" v-close-popup />
                    </q-card-actions>
                </q-card>
        </q-dialog>
        <q-dialog v-model="viewFoodOrder">
            <q-card style="width: 400px">
                <q-card-section>
                <div class="text-h6">Food Ordered List</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-list padding>
                        <!-- <q-item>
                            <q-item-section top avatar>
                            <q-avatar rounded>
                                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                            <q-item-label caption>meta</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator spaced /> -->

                        <q-item v-for="(food, index) in this.cartList" :key="index">
                            <q-item-section top thumbnail class="q-ml-none">
                            <img :src="food.foodpic" style="height: 80px; max-width: 150px">
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>{{food.foodNames}}</q-item-label>
                            <q-item-label caption>{{food.partyTraySize[0].paxMin}}</q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                            <q-item-label caption>meta</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator spaced />
                        </q-list>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Checkout" style="color:#ffbb80" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    data(){
        return{
            viewFoodOrder: false,
            cartList: [],
            pOrderSelected: [],
            addPorder: false,
            selection: [],
            Food: [],
            Inclusion: [],
            newFoodPic: '',
            picFood: '',
            storageRef: null,
            foodpic: '',
            FoodCategory: [],
            PartyTrayLabel: [],
            selectedPorder: [],
            tab: 'ALL',
            tabfilter: '',
            incPrice: 0,
            filter: '',
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
                { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
                // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },

            ],
            incColumns: [
                { name: 'inclusion', align: 'center', label: 'Inclusion', field: 'inclusion', sortable: true },
                { name: 'inclusionPrice', align: 'center', label: 'Inclusion Price', field: 'inclusionPrice', sortable: true }
            ]
        }
    },
    mounted(){
        this.$binding('PartyTrayLabel', this.$firestoreApp.collection('PartyTrayLabel'))
        .then(PartyTrayLabel => {
        console.log(PartyTrayLabel, 'PartyTrayLabel')
        }),
        this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
        .then(FoodCategory => {
        console.log(FoodCategory, 'FoodCategory')
        }),
        this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        }),
        this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
        .then(Inclusion => {
        console.log(Inclusion, 'Inclusion')
        }),
        this.storageRef = this.$firebase.storage().ref()
        console.log(this.storageRef, 'store')
    },
    computed: {
        returnWithPartyTrays(){
            let party = this.$lodash.filter(this.Food, a=>{
                if(a.partyTrayPrice != null){
                    return a
                } 
            })
            return party
        },
        cartLength(){
            if(this.cartList.length === 0){
                return 0
            }else{
                return this.cartList.length
            }
        },
    },
    methods: {
        addToCart(){
            var foodDetails = {
                foodpic: this.selectedPorder.foodPic,
                foodNames: this.selectedPorder.foodName,
                category: this.selectedPorder.category,
                partyTraySize: this.pOrderSelected
            }
            if(this.pOrderSelected.length === 0){
                this.$q.dialog({
                title: 'Please Select Party Tray Size   !',
                message: 'Select Party Tray Size!',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addPorder = true
                })
            }else{
                this.cartList.push(foodDetails)
                console.log(this.cartList, 'cartList')
            }
        },
        consolePorder(){
            console.log('porder', this.pOrderSelected)
        },
        openPorder (props) {
            this.selectedPorder = props.row
        }
    }
}   
</script>