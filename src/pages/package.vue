<template>
    <q-page>
        <template>           
                <q-btn flat fab icon="mdi-plus-thick" color="pink-3" @click="addPackageDialog = true">
                    <q-tooltip>
                                        Add New Package
                    </q-tooltip>
                </q-btn>
                    <div class="fixed-center" style="margin-left: 110px; width: 70%;" >
                        <q-table grid :data="Packages" :columns="columns">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="max-width: 230px;border: 2px solid;border-color: pink;" >
                                        <q-card-section side>
                                            <q-list dense>
                                            <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" v-show="col.name != 'partyTrayPrice'">
                                                <q-item-section>
                                                <q-item-label>{{ col.label }}: {{ col.value }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            <q-item class="q-mt-sm" v-show="props.row.partyTrayPrice">
                                            <span class="full-width text-center text-weight-bold">PARTY TRAY PRICES</span>
                                            </q-item>
                                            <q-item v-for="(price, index) in props.row.partyTrayPrice" :key="index">
                                                <q-item-section>
                                                <q-item-label>{{ price.label }}: {{ price.price }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </template>
                        </q-table>
                    </div>
        </template>
        <q-dialog v-model="addPackageDialog" persistent>
            <q-card style="min-width: 400px" >
                <q-card-section class="q-pb-none">
                <div class="text-h6">New Package</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                <div class="container row q-ma-md">
                <q-input color="pink-3" outlined class="q-mr-md col" dense v-model="packageName" label="Package Name"/>
                <q-input color="pink-3" outlined class="col-3" type="number" dense v-model="packagePrice" label="Package Price"/>
                </div>
                <div class="my-card q-ma-md q-pa-sm q-py-md" style="border: 1.5px solid;border-color: pink;">
                    <div class="q-mx-md text-weight-bold text-grey-8">
                        <span>
                        Select Category
                        </span>
                    </div>
                    <div class="q-gutter-xs">
                        <q-checkbox v-model="selection" :val="i" :label="i.category" color="pink-6" v-for="(i, index) in this.FoodCategory" :key="index"/>
                    </div>
                </div>
                <div v-show="this.selection.length != 0">
                    <div class="my-card q-ma-md q-pa-md" style="border: 1.5px solid;border-color: pink;">
                        <div>
                            <div class="q-ml-md text-weight-bold text-grey-8">
                            Food
                            </div>
                            <q-list dense class="text-left text-grey-8 bg-white" v-for="(i, index) in this.selection" :key="index">
                                <q-item dense>
                                    <q-item-section>
                                        <q-item-label dense class="q-pl-xl" lines="1">{{i.category}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-input color="pink-3" class="q-ma-sm q-pr-xl" type="number" dense v-model="partyTrayPricing[index]" label="Party Tray Price"/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </div>
                </div>

                </q-card-section> 

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup color="grey-8" />
                <q-btn flat label="Add Package" color="pink-3" v-close-popup />
                <!-- <q-btn flat label="merge Food" @click="mergePricing" color="pink-3" /> -->
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    data(){
        return {
            Packages: [],
            partyTrayPricing: [],
            selection: [],
            hidelabel: true,
            packagePrice: 0,
            Food: [],
            packageName: '',
            addPackageDialog: false,
            FoodCategory: [],
            PartyTrayLabel: [],
            filter: '',
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
                { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
                { name: 'packagePrice', align: 'center', label: 'Package Price', field: 'packagePrice', sortable: true },
                { name: 'partyTrayPrice', align: 'center', label: 'Party Tray Prices', field: 'partyTrayPrice', sortable: true }
            ]
        }
    },
    mounted () {
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
        this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            })
    },
    computed: {
        categoryOpt(){
                let optionss = this.FoodCategory.map(m => {
                    return {
                        label: m.category,
                        value: m.category
                    }
                })

                return optionss
        },
        selectedCategory(){
            console.log(this.selection, 'ssss')
            if(this.selection.length == 0){
                console.log('no pricing')
                return 0
            }else{
                 let filter = this.$lodash.filter(this.Food, m => {
                    console.log(m, 'm')
                    // let selectedCateg = {...this.selection[0]}
                    // delete selectedCateg['.key']
                    // delete selectedCateg.__index
                    // let types = selectedCateg.category
                    return m.category == this.selection.category
                })
                    return filter
            }
        },
        mergePricing(){

                console.log(this.selection)
                console.log(this.partyTrayPricing)  

                if(this.selection.length == 0){
                    console.log('no pricing')
                    return 0
                }

                let merge = []
                for( var x = 0; x < this.selection.length; x++){
                    let m = {...this.selection[x]}
                    m.price = this.partyTrayPricing[x]
                    let key = m['.key']
                    m.sizeKey = key
                    delete m['.key']
                    merge.push(m)
                }

                console.log(merge,'merge')
                return merge
            }
    },
    methods:{

    }
}
</script>