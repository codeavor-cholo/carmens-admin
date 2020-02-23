<template>
    <q-page>
        <template>
            <div>
                <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">
                <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-grey-8 bg-grey-9 full-height relative-position" :active-color="tab != 'WOPP' ? 'white' : 'teal'" :active-bg-color="tab != 'WOPP' ? 'deep-orange-4' : 'teal-1'">
                
                    <div class="text-h6 text-center text-white q-py-md" style="font-family: 'Roboto Slab', serif;">PARTY TRAYS
                        <q-btn-dropdown active-color="white" active-bg-color="deep-orange-4" flat dense dropdown-icon="more_vert" color="white">
                            <q-list class="text-grey-8" dense>
                                <q-item clickable v-close-popup @click="addCategory = true, editCateg = false, deleteCateg = false, isEdit = false">
                                    <q-item-section>
                                        <q-item-label style="font-family: 'Roboto Slab', serif;">Add Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="editCateg = true, deleteCateg = false">
                                    <q-item-section>
                                        <q-item-label style="font-family: 'Roboto Slab', serif;">Edit Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="deleteCateg = true, editCateg = false">
                                    <q-item-section>
                                        <q-item-label style="font-family: 'Roboto Slab', serif;">Delete Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                <div class="relative-position text-center">
                <q-btn color="teal" outline class="q-mb-md" icon="check" label="DONE EDITING" @click="editCateg = false" v-show="editCateg == true"/>
                <q-btn color="teal" outline class="q-mb-md" icon="check" label="DONE DELETING" @click="deleteCateg = false" v-show="deleteCateg == true"/>
                <q-scroll-area style="height:80vh" :visible="true">
                <q-tab class="text-white" style="font-family: 'Roboto Slab', serif;" name="ALL" value="ALL" label="ALL"></q-tab>
                <q-tab name="WOPP" value="WOPP" label="WITHOUT PARTY TRAY PRICE" class="text-teal"></q-tab>
                 <q-tab :name="i.category" :value="i.category" v-for="(i, index) in FoodCategory" :key="index" class="" v-show="tab != 'addInc'">
                    <div class="container row">
                    <div class="text-white" style="font-family: 'Roboto Slab', serif;">{{i.category}}</div>
                    <q-btn v-show="editCateg" no-caps flat dense color="teal" @click="geteditCateg(i)" icon="mdi-pencil" size="sm" class="q-mx-sm"/>
                    <q-btn v-show="deleteCateg" no-caps flat icon="delete" dense @click="openDeleteDialog(i)" color="orange-6" size="sm" class="q-mx-sm"/>
                    </div>
                 </q-tab>
                 <br><br>
                </q-scroll-area>
                <q-btn style="font-family: 'Roboto Slab', serif;" label="SCROLL FOR MORE CATEGORIES" flat size="sm" class="bg-grey-9 absolute-bottom full-width" color="deep-orange-6" v-show="tab != 'addInc'"></q-btn>
                </div>

                </q-tabs>
                </template>

                <template v-slot:after>
                    <q-scroll-area style="height:100%" :visible="true">
                    <div class="q-px-md text-grey-8 full-width">
                        <div class="q-my-md">
                                <q-btn fab icon="mdi-plus-thick" color="deep-orange-4" v-show="tab != 'addInc' && tab != 'WOPP'" @click="addFoodDialog = true">
                                    <q-tooltip>
                                        Add Food
                                    </q-tooltip>
                                </q-btn>

                                <q-input v-model="filter" clearable dense type="text" :label="tab !='addInc' ? 'Search Food' : 'Search Inclusions'" color="deep-orange-4" class="q-ma-md float-right" outlined icon="search" >
                                    <template v-slot:prepend>
                                        <q-icon name="search" color="deep-orange-4"/>
                                    </template>
                                </q-input>
                        </div>
                    </div>
                    <div>
                        <q-table grid :data="returnWithPartyTrays" :columns="tab !='addInc' ? columns : incColumns" :pagination="pagination" :filter="filter" class="q-px-sm full-width align-center ">
                            <template v-slot:item="props">
                                
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition q-ma-sm" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="border: 2px solid;border-color: #ffdab9;" >
                                        <div v-if="tab != 'addInc'">
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
                                                <q-item-label overline>{{ price.label }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side>
                                                <q-item-label caption>{{ price.price }}</q-item-label>
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
                    </q-scroll-area>
                </template>

                </q-splitter>
            </div>
        </template>
        <q-dialog v-model="addFoodDialog" persistent>
            <q-card style="min-width: 400px" >
                <q-card-section class="q-pb-none">
                <div class="text-h6" style="font-family: 'Roboto Slab', serif;">New Food</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                <div class="container row q-ma-md">
                <q-input color="deep-orange-4" outlined class="col-12" dense v-model="foodNames" label="Party Tray Name"/>
                <q-select color="deep-orange-4" class="col-12 q-mt-md" dense outlined v-model="selectCategory" :options="categoryOpt" emit-value map-options label="Dish Type" />
                <q-uploader ref="foodref" class="full-width q-ma-md" extensions="'.gif,.GIF,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG'" @added="photoAdded" :url="foodpic" label="Upload Photo" color="deep-orange-4" square flat bordered style="border-color: #FFDAB9" />
                </div>

                <div class="my-card q-ma-md q-pa-sm q-py-md" style="border: 1.5px solid;border-color: #ffdab9;">
                    <div class="q-mx-md text-weight-bold text-grey-8">
                        <span>
                        Party Tray Size
                        </span>
                        <q-btn class="float-right" flat color="deep-orange-4" size="sm" label="Add Party Tray Package" @click="showlabel = true; hidelabel = false">
                            <q-icon name="mdi-plus-thick" flat fab color="deep-orange-4" />
                        </q-btn>
                    </div>
                    <div class="q-gutter-xs">
                        <q-checkbox v-model="selection" :val="i" :label="i.label +' ('+ i.paxMin +' - '+ i.paxMax +' PAX)'" color="deep-orange-6" v-for="(i, index) in this.PartyTrayLabel" :key="index"/>
                    </div>
                </div>
                <div v-show="showlabel == true">
                    <q-card class="my-card q-pa-sm q-ma-md">
                        <span class="text-overline q-ml-md">ADD PARTY TRAY PACKAGE</span>
                        <q-input color="deep-orange-4" style="border-color: #ffdab9" label-color="deep-orange-4" class="q-mx-md" dense v-model="packageLabel" outlined label="Package Size Label"/>
                        <div class="row q-mx-md q-mt-md">
                            <q-input color="deep-orange-4" class="q-mr-md col" outlined="" type="number" style=" border-color: pink" dense v-model="minpax" label="Min Pax"/>
                            <q-input color="deep-orange-4" class="col" outlined="" type="number" style=" border-color: #FFDAB9" dense v-model="maxpax" label="Max Pax"/>
                        </div>
                        <q-card-actions align="right" class="text-primary">
                        <q-btn flat color="grey-8" @click="clear" label="Cancel"/>
                        <q-btn flat color="teal" label-color="deep-orange-4" label="Save Package" @click="addPTrayLabel" v-close-popup />
                        </q-card-actions>
                    </q-card>    
                </div>
                <div v-show="this.selection.length != 0">
                    <div class="my-card q-ma-md q-pa-md" style="border: 1.5px solid;border-color: #FFDAB9;">
                        <div>
                            <div class="q-ml-md text-weight-bold text-grey-8">
                            Party Tray Pricing
                            </div>
                            <q-list dense class="text-left text-grey-8 bg-white" v-for="(i, index) in selection" :key="index">
                                <q-item dense>
                                    <q-item-section>
                                        <q-item-label dense lines="1">{{i.label}} {{i.paxMin}}-{{i.paxMax}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-input color="deep-orange-4" outlined="" class="q-ma-sm q-pr-xl" type="number" dense v-model="partyTrayPricing[index]" label="Party Tray Price"/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                    </div>
                </div>
                <div class="my-card q-ma-md q-pa-sm q-py-md text-overline row" style="border: 1.5px solid;border-color: #FFDAB9;">
                    <q-checkbox left-label v-model="partyTrayShow" label="Add Package Price" class="col-6 q-mr-md"/>
                    <q-input color="deep-orange-4" outlined class="col q-mr-md" type="number" dense v-model="foodPrice" label="Package Price" v-show="partyTrayShow == true"/>
                </div>
                </q-card-section> 

                <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup color="grey-8" />
                <q-btn flat label="Add Food" @click="addFood" color="deep-orange-4" v-close-popup />
                <!-- <q-btn flat label="merge Food" @click="mergePricing" color="pink-3" /> -->
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="addCategory" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEdit ? 'Edit Category': 'Add New Category'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="categName" label="Category"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup @click="clears" color="grey-8"/>
                    <q-btn v-if="!isEdit" flat label="Add Category" color="deep-orange-6" v-close-popup v-on:click="addCateg"/>
                    <q-btn v-if="isEdit" flat label="Update Category" color="deep-orange-6" v-close-popup v-on:click="setTask"/>
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>
<script>
let sri = require('simple-random-id')
export default {
    data(){
        return {
            filter: '',
            partyTrayShow: false,
            partyTrayPricing: [],
            selection: [],
            hidelabel: true,
            showlabel: false,
            minpax: 0,
            maxpax: 0,
            packageLabel: '',
            foodPrice: 0,
            Food: [],
            Inclusion: [],
            incName: '',
            addincDialog: false,
            newFoodPic: '',
            picFood: '',
            storageRef: null,
            selectCategory: '',
            foodNames: '',
            foodpic: '',
            addFoodDialog: false,
            editCateg: false,
            deleteCateg: false,
            splitterModel: 20,
            addCategory: false,
            isEdit: false,
            categName: '',
            FoodCategory: [],
            PartyTrayLabel: [],
            tab: 'ALL',
            tabfilter: '',
            incPrice: 0,
            filter: '',
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 9},
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
            this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            }),
            this.storageRef = this.$firebase.storage().ref()
            console.log(this.storageRef, 'store')
    },
    computed: {
        filtercateg(){
            console.log(this.tab, 'tab')

        },
        returnWithPartyTrays(){
            let party = this.$lodash.filter(this.Food, a=>{
                if(a.partyTrayPrice != null){
                    return a
                } 
            })
            if(this.tab === 'ALL'){
                return party
            } else if(this.tab === 'WOPP') {
                let wo = this.$lodash.filter(this.Food, b=>{
                    return b.partyTrayPrice == null
                })
                return wo
            } else {
                let filter = this.$lodash.filter(party, a=>{
                    return a.category == this.tab
                })
                return filter
            }
        },

        categoryOpt(){
                let arr = []
                let optionss = this.FoodCategory.map(m => {
                    if(m.category == this.tab && this.tab != 'ALL'){
                        arr.push(m.category)
                    }

                    return {
                        label: m.category,
                        value: m.category
                    }
                })
                this.selectCategory = arr[0]
                return optionss
        },
        mergePricing(){

                console.log(this.selection)
                console.log(this.partyTrayPricing)  

                if(this.selection.length == 0 || this.partyTrayPricing.length == 0){
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
        clear(){
            this.hidelabel = true;
            this.showlabel = false;
            this.packageLabel = ''
            this.minpax = 0
            this.maxpax = 0
        },
        addPTrayLabel () {
            var pTrayLabel = {
                label: this.packageLabel,
                paxMin: this.minpax,
                paxMax: this.maxpax
            }   
            let optionss = this.$lodash.filter(this.PartyTrayLabel, m => {
                if(m.label === this.packageLabel){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.packageLabel === '' || this.minpax === 0 || this.maxpax === 0 || this.minpax === '' || this.maxpax === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addFoodDialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addFoodDialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Party Tray Label',
                        message: 'Add This Party Tray Label?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('PartyTrayLabel').add(pTrayLabel)
                            this.$q.notify({
                                    message: 'Party Tray Label Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.packageLabel = ''
                                this.minpax = 0
                                this.maxpax = 0
                                this.showlabel = false
                                this.hidelabel = true
                                this.addFoodDialog = true
                            }).onCancel(()=>{
                                this.addFoodDialog = true
                            })
                    }
                    
                }
            },
        addFood () {
            let vm = this
            let optionss = this.$lodash.filter(this.Food, m => {
                if(m.foodName === this.foodNames){
                    return m
                }
            })   
                if(this.selectCategory === '' || this.foodNames === ''){
                  this.$q.dialog({
                  title: 'Field Required!',
                  message: 'Fill all Requirements?',
                  ok: 'Ok',
                  persistent: true
                }).onOk(()=>{
                    this.addFoodDialog = true
                })
                }else{
                     if(optionss.length > 0){
                        this.$q.dialog({
                        title: 'Duplicate Entry!',
                        message: 'Unable to save?',
                        ok: 'Ok',
                        persistent: true
                        }).onOk(() => {
                            this.addFoodDialog = true
                        })
                    }else{ 
                    this.$q.dialog({
                    title: 'Add Food',
                    message: 'Add This Food?',
                    ok: 'Yes',
                    cancel: 'Cancel',
                    persistent: true
                  }).onOk(() => {
                      vm.uploadFoodPhoto()
                      .then((user) => {
                        let food
                        if(this.mergePricing == 0){
                            this.$q.dialog({
                                title: 'Field Required!',
                                message: 'Fill all Requirements?',
                                ok: 'Ok',
                                persistent: true
                                }).onOk(()=>{
                                    this.addFoodDialog = true
                                })   
                        } else if (this.partyTrayShow == true && this.foodPrice != 0){
                            let partyTrays = this.mergePricing
                            food = {
                                category: this.selectCategory,
                                foodName: this.foodNames,
                                foodPic: this.newFoodPic,
                                foodPrice: this.foodPrice,
                                partyTrayPrice: partyTrays
                            }   
                        } else {
                            let partyTrays = this.mergePricing
                            food = {
                                category: this.selectCategory,
                                foodName: this.foodNames,
                                foodPic: this.newFoodPic,
                                partyTrayPrice: partyTrays
                            }
                        }

                            vm.$firestoreApp.collection('Food').add(food)
                            this.$q.notify({
                                  message: 'Food Added!',
                                  icon: 'mdi-folder-plus-outline',
                                  color: 'pink-3',
                                  textColor: 'white',
                                  position: 'center'
                              })
                                this.additionalPrice = 0
                                this.selectCategory = ''
                                this.foodNames = ''
                                this.foodPrice = 0
                                this.selection = []
                                this.partyTrayPricing = []
                          })
                      }).onCancel(()=>{
                            console.log(this.selectCategory)
                            this.addFoodDialog = true
                      })
                  }
              }
        },
        uploadFoodPhoto: async function () {
                let promise = new Promise((resolve, reject ) => {
                
                let foodss = this.picFood
                let random = sri(9)
                console.log(random, 'rand')
                console.log(this.foodpic, 'foodref')
                let vm = this
                let uploadTask = this.storageRef.child(`foodPhotos/${random}`).put(foodss)
                uploadTask.on('state_changed', function (snapshot) {
                }, function (error) {
                // Handle unsuccessful uploads
                // this.$q.notify({
                //     message: 'An error occur',
                //     type: 'negative',
                //     color: 'negative',
                //     textColor: 'white',
                //     icon: 'warning'
                // })
                console.log('error occur', error)
                }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(uploadTask, 'upload')
                    vm.foodpic = downloadURL
                    resolve(downloadURL)
                    console.log(downloadURL, 'download')
                })
                })
            })
            let result = await promise
            console.log('result',result)
            this.newFoodPic = result
            this.foodpic = this.newFoodPic
            return result
        },
        photoAdded (p) {
            var photo = this.$refs.foodref.files[0]
            
            this.picFood = photo
            console.log('photo2', photo)
        },
        clears(){
            this.categName = ''
        },
        geteditCateg (i) {
            console.log(i, 'i')
            this.categID = i['.key']
            this.categName = i.category
			this.addCategory = true
			this.isEdit = true
		},
        addCateg () {
            var categ = {
                category: this.categName
            }   
            let optionss = this.$lodash.filter(this.FoodCategory, m => {
                if(m.category === this.categName){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.categName === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addCategory = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addCategory = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Category',
                        message: 'Add This Category?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('FoodCategory').add(categ)
                            this.$q.notify({
                                    message: 'Category Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.categName = ''
                            }).onCancel(()=>{
                                this.addCategory = true
                            })
                    }
                }
            },
            setTask(){
                var categBago = {
                    category: this.categName,
                }
                if(this.categName === ''){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update Category',
                    message: 'Update This Category?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('FoodCategory').doc(this.categID).set(categBago)
                    this.$q.notify({
                            message: 'Category Updated!',
                            icon: 'mdi-update',
                            color: 'pink-3',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addCategory = false  
                }).onCancel(()=>{
                    this.addCategory = true
                })  
            },
            openDeleteDialog (i) {
                console.log(i, 'i')
                var id = i['.key']
                console.log(id, 'id')
                this.$q.dialog({
                    title: 'Delete Category?',
                    message: 'Delete This Category?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('FoodCategory').doc(id).delete()
                    this.$q.notify({
                            message: 'Category Deleted!',
                            icon: 'mdi-delete',
                            color: 'grey-8',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },

    }
}
</script>