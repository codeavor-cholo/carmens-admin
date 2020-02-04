<template>
    <q-page>
        <template>
            <div>
                <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">
                <template v-slot:before>
                <q-tabs v-model="tab" vertical class="text-grey-8 bg-white full-height relative-position" active-color="pink-3" active-bg-color="pink-1">
                <q-scroll-area class="fit">
                    <div class="text-h6 text-center q-py-md">FOOD CHOICES
                        <q-btn-dropdown active-color="pink-3" active-bg-color="pink-1" flat dense dropdown-icon="more_vert" color="grey-8">
                            <q-list class="text-grey-8" dense>
                                <q-item clickable v-close-popup @click="addCategory = true, editCateg = false, deleteCateg = false, isEdit = false">
                                    <q-item-section>
                                        <q-item-label>Add Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="editCateg = true, deleteCateg = false">
                                    <q-item-section>
                                        <q-item-label>Edit Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="deleteCateg = true, editCateg = false">
                                    <q-item-section>
                                        <q-item-label>Delete Category</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                <q-tab name="ALLMS" value="ALL" label="ALL"></q-tab>
                 <q-tab :name="i.category" :value="i.category" v-for="(i, index) in FoodCategory" :key="index" class="">
                    <div class="container row">
                    <div>{{i.category}}</div>
                    <q-btn v-show="editCateg" no-caps flat dense color="teal" @click="geteditCateg(i)" icon="mdi-pencil" size="sm" class="q-mx-sm"/>
                    <q-btn v-show="deleteCateg" no-caps flat icon="delete" dense @click="openDeleteDialog(i)" color="pink-6" size="sm" class="q-mx-sm"/>
                    </div>
                 </q-tab>

                </q-scroll-area>
                <q-tab name="addInc" @click="addincDialog = true" class="absolute-bottom"  label="ADD INCLUSION"></q-tab>

                </q-tabs>
                </template>

                <template v-slot:after>
                    <div class="q-px-md text-grey-8">
                        <div class="q-my-md">
                            
                                <q-btn flat fab icon="mdi-plus-thick" color="pink-3" @click="addFoodDialog = true">
                                    <q-tooltip>
                                        Add Food
                                    </q-tooltip>
                                </q-btn>

                        </div>
                    </div>
                    <div class="fixed-center" style="margin-left: 110px; width: 70%;" >
                        <q-table grid :data="filtercateg" :columns="columns">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="max-width: 230px;border: 2px solid;border-color: pink;" >
                                        <q-card-section>
                                            <q-img :src="props.row.foodPic" style="border: 2px solid;border-color: pink; height: 140px; max-width: 200px"/>
                                        </q-card-section>
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

                </q-splitter>
            </div>
        </template>
        <q-dialog v-model="addFoodDialog" persistent>
            <q-card style="min-width: 400px" >
                <q-card-section class="q-pb-none">
                <div class="text-h6">New Food</div>
                </q-card-section>

                <q-card-section class="q-pa-md">
                <div class="container row q-ma-md">
                <q-input color="pink-3" outlined class="q-mr-md col" dense v-model="foodNames" label="Food Name"/>
                <q-input color="pink-3" outlined class="col-3" type="number" dense v-model="foodPrice" label="Package Price"/>
                </div>
                <q-select color="pink-3" class="q-ma-md" dense outlined v-model="selectCategory" :options="categoryOpt" emit-value map-options label="Dish Type" />

                <q-uploader ref="foodref" class="q-ma-md" extensions="'.gif,.GIF,.jpg,.JPG,.jpeg,.JPEG,.png,.PNG'" @added="photoAdded" :url="foodpic" label="Upload Photo" color="pink-3" square flat bordered style="width: 500px; border-color: pink" />

                <div class="my-card q-ma-md q-pa-sm q-py-md" style="border: 1.5px solid;border-color: pink;">
                    <div class="q-mx-md text-weight-bold text-grey-8">
                        <span>
                        Party Tray Size
                        </span>
                        <q-btn class="float-right" flat color="pink-3" size="sm" label="Add Party Tray Package" @click="showlabel = true; hidelabel = false">
                            <q-icon name="mdi-plus-thick" flat fab color="pink-3" />
                        </q-btn>
                    </div>
                    <div class="q-gutter-xs">
                        <q-checkbox v-model="selection" :val="i" :label="i.label +' ('+ i.paxMin +' - '+ i.paxMax +' PAX)'" color="pink-6" v-for="(i, index) in this.PartyTrayLabel" :key="index"/>
                    </div>
                </div>
                <div v-show="showlabel">
                    <q-card class="my-card q-ma-sm">
                        <q-input color="pink-3" style="border-color: pink" label-color="pink-3" class="q-pa-sm" dense v-model="packageLabel" outlined label="Package Size Label"/>
                        <div class="row">
                            <q-input color="pink-3" class="q-ma-sm" type="number" style="width: 230px; border-color: pink" dense v-model="minpax" label="Min Pax"/>
                            <q-input color="pink-3" class="q-ma-sm" type="number" style="width: 230px; border-color: pink" dense v-model="maxpax" label="Max Pax"/>
                        </div>
                        <q-card-actions align="right" class="text-primary">
                        <q-btn flat color="grey-8" @click="clear" label="Cancel"/>
                        <q-btn flat color="pink-3" label-color="pink-3" label="Save" @click="addPTrayLabel" v-close-popup />
                        </q-card-actions>
                    </q-card>    
                </div>
                <div v-show="this.selection.length != 0">
                    <div class="my-card q-ma-md q-pa-md" style="border: 1.5px solid;border-color: pink;">
                        <div>
                            <div class="q-ml-md text-weight-bold text-grey-8">
                            Party Tray Pricing
                            </div>
                            <q-list dense class="text-left text-grey-8 bg-white" v-for="(i, index) in selection" :key="index">
                                <q-item dense>
                                    <q-item-section>
                                        <q-item-label dense class="q-pl-xl" lines="1">{{i.label}} {{i.paxMin}}-{{i.paxMax}}</q-item-label>
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
                <q-btn flat label="Add Food" @click="addFood" color="pink-3" v-close-popup />
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
                    <q-btn flat label="Cancel" v-close-popup @click="clears"/>
                    <q-btn v-if="!isEdit" flat label="Add Category" v-close-popup v-on:click="addCateg"/>
                    <q-btn v-if="isEdit" flat label="Update Category" v-close-popup v-on:click="setTask"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="addincDialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">Add New Inclusion</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="incName" label="Inclusion Name"/>
                    <q-input class="q-ma-sm" dense type="number" v-model="incPrice" label="Individual Price"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup/>
                    <q-btn flat label="Add Inclusion" v-close-popup @click="addInc"/>
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
            partyTrayPricing: [],
            selection: [],
            hidelabel: true,
            showlabel: false,
            minpax: 0,
            maxpax: 0,
            packageLabel: '',
            foodPrice: 0,
            Food: [],
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
            tab: 'ALLMS',
            tabfilter: '',
            incPrice: 0,
            filter: '',
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
                { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
                { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
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
            this.storageRef = this.$firebase.storage().ref()
            console.log(this.storageRef, 'store')
    },
    computed: {
        filtercateg(){
            console.log(this.tab, 'tab')
            if(this.tab === 'ALLMS'){
                    let filter = this.$lodash.filter(this.Food, m => {
                    console.log(m, 'm')
                    return m
                })
                    return filter
            }else{
                let filters = this.$lodash.filter(this.Food, m => {
                    console.log(m, 'm')
                    return m.category == this.tab
                })
                    return filters
            }
        },
        categoryOpt(){
                let optionss = this.FoodCategory.map(m => {
                    return {
                        label: m.category,
                        value: m.category
                    }
                })

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
        addInc () {
            var inc = {
                inclusion: this.incName,
                inclusionPrice: this.incPrice
            }   
            let optionss = this.$lodash.filter(this.Inclusion, m => {
                if(m.inclusion === this.incName){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.incName === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addincDialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addincDialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Inclusion',
                        message: 'Add This Inclusion?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('Inclusion').add(inc)
                            this.$q.notify({
                                    message: 'Inclusion Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.incName = ''
                                this.incPrice = ''
                            }).onCancel(()=>{
                                this.addincDialog = true
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
                            food = {
                                category: this.selectCategory,
                                foodName: this.foodNames,
                                foodPic: this.newFoodPic,
                                foodPrice: this.foodPrice,
                            }   
                        } else {
                            let partyTrays = this.mergePricing
                            food = {
                                category: this.selectCategory,
                                foodName: this.foodNames,
                                foodPic: this.newFoodPic,
                                foodPrice: this.foodPrice,
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