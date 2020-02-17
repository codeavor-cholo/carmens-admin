<template>
    <q-page class="flex flex-center">
        <div>
            <div class="row q-gutter-md">
                <div class="q-pa-sm">
                    <q-input v-model="filter" dense style="width:400px" rounded standout="bg-white text-grey-8" clearable input-class="text-pink-6" label="Search Food" color="pink-3" class="q-ma-md" outlined icon="search" >
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </div>
                <div>
                    <q-btn size="1.7rem" class="q-mt-sm" flat color="pink-3" icon="mdi-cart" />
                </div>
            </div>          
        </div>
        <div>
            <q-table grid :data="returnWithPartyTrays" :columns="columns" :pagination="pagination" :filter="filter" class="row items-center q-pa-sm">
                <template v-slot:item="props">            
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card class="my-card" style="border: 2px solid;border-color: pink;" >
                            <div>
                            <q-card-section>
                                <q-img :src="props.row.foodPic" :ratio="4/3"/>
                            </q-card-section>
                            <q-card-section side>
                                <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" v-show="col.name != 'partyTrayPrice'">
                                    <q-item-section dense>
                                    <q-item-label lines="1" overline>{{ col.label }}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side dense>
                                    <q-item-label lines="2" caption>{{ col.value }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item class="q-mt-sm" v-show="props.row.partyTrayPrice">
                                <span class="full-width text-center text-weight-bold">PARTY TRAY PRICES</span>
                                </q-item>
                                <q-item v-for="(price, index) in props.row.partyTrayPrice" :key="index">
                                    <q-item-section>
                                    <q-item-label overline>{{ price.label }}({{price.paxMin}} - {{price.paxMax}})</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                    <q-item-label caption>{{ price.price }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section class="q-mb-none q-pb-none" side>
                                        <q-btn @click="addPorder = true, openPorder(props)" class="q-ml-lg" flat color="pink-3" size="md" label="Add To Purchase Order"/>
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
            <q-card style="min-width: 400px">
                            <q-img
                                :src="this.selectedPorder.foodPic"
                                :ratio="4/3"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{this.selectedPorder.foodName}}
                                </div>
                            </q-img>
                            <span class="full-width text-center text-weight-bold">PARTY TRAY PRICES</span>
                                <div v-for="(price, index) in this.selectedPorder.partyTrayPrice" :key="index">
                                    <div overline>{{ price.label }}({{price.paxMin}} - {{price.paxMax}})</div>
                                    <div caption>{{ price.price }}</div>
                                </div>
                        <q-card-section>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Ok" v-close-popup />
                    </q-card-actions>
                </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    data(){
        return{
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
    },
    methods: {
            openPorder (props) {
            this.selectedPorder = props.row
        }
    }
}   
</script>