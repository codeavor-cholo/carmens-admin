<template>
    <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <div class="bg-white fit">
                        <div class="text-h6 text-center q-py-md">FILTER OPTIONS</div>
                        <q-input v-model="filter" clearable type="text" label="Search Reservation" color="pink-3" class="q-ma-md" outlined icon="search">
                            <template v-slot:prepend>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>
                    
                </template>    
                <template v-slot:after>   
                <q-btn label="ADD NEW RESERVATION" :to="{ name: 'walkinreserve' }" color="pink-3"  class="q-my-md q-ml-md">
                    <q-tooltip>
                                        Add New Reservation
                    </q-tooltip>
                </q-btn>
                    <div class="q-mx-lg" >
                        <q-table grid :data="Reservation" :columns="columns" :filter="filter">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition " :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="border: 2px solid;border-color: grey;" >
                                        <q-card-section side>
                                            <q-list dense>
                                            <q-item class="q-mt-sm">
                                            <span class="full-width text-center text-teal text-h6 text-weight-bold">{{props.row.clientFName}} {{props.row.clientLName}}
                                                <br>
                                                <q-chip class="text-center">{{props.row.clientReserveDate}}</q-chip>    
                                            </span>
                                            </q-item>
                                            <q-separator class="q-mt-sm"/>
                                            <q-item class="q-mt-sm text-grey-8" v-show="props.row.clientFoodChoice">
                                            <span class="full-width text-center text-weight-bold">FOOD CATEGORIES</span>
                                            </q-item>
                                            <q-item v-for="(i, index) in props.row.clientFoodChoice" :key="index" class="text-grey-8">
                                                <q-item-section>
                                                <q-item-label>{{ i.category }} - {{i.foodName}}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            <q-separator class="q-mt-sm"/>
                                            <q-item class="q-mt-sm" v-show="props.row.clientSelectPackage.inclusions">
                                            <span class="full-width text-center text-weight-bold text-grey-8" >INCLUSIONS</span>
                                            </q-item>
                                            <q-item v-for="(price, index) in props.row.clientSelectPackage.inclusions" :key="index" class="text-grey-8">
                                                <q-item-section>
                                                <q-item-label> {{ price.inclusion }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            <q-separator class="q-mt-sm"/>
                                            <q-item class="q-mt-sm" v-show="props.row.clientAddOns.lenght != 0">
                                            <span class="full-width text-center text-weight-bold text-grey-8" >ADD-ONS</span>
                                            </q-item>
                                            <q-item v-for="(price, index) in props.row.clientAddOns" :key="index" class="text-grey-8">
                                                <q-item-section>
                                                <q-item-label>{{ price.addonsQuantities }} {{ price.addonsNames }}</q-item-label>
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
                </q-splitter>
        </template>
    </q-page>
</template>
<script>
export default {
    data(){
        return {
            showCompleteBanner: false,
            checkerArray: [],
            filter: '',
            splitterModel: 20,
            Inclusion: [],
            Packages: [],
            viandsArray:[],
            Reservation: [],
            viandsQty: [],
            selection: [],
            selectedInclusions: [],
            hidelabel: true,
            packagePrice: 0,
            Food: [],
            packageName: '',
            addPackageDialog: false,
            FoodCategory: [],
            filter: '',
            pagination: { sortBy: 'clientReserveDate', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'clientFName', required: true, label: 'First Name', align: 'center', field: 'clientFName', sortable: true },
                { name: 'clientLName', align: 'center', label: 'Last Name', field: 'clientLName', sortable: true },
            ]
        }
    },
    mounted () {
        this.$binding('Reservation', this.$firestoreApp.collection('Reservation'))
            .then(Reservation => {
            console.log(Reservation, 'Reservation')
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
            ,
        this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            })
    },
    methods:{
    }
}
</script>