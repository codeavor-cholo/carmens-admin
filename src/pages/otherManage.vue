<template>
    <q-page>
        <div>
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">     
            <template v-slot:before>
                <div class="text-h6 text-center q-py-md">FILE MANAGEMENT</div>
                <q-tabs v-model="tab" vertical class="text-grey-8 bg-white full-height relative-position" active-color="pink-3" active-bg-color="pink-1">
                <q-tab name="motif" label="Motif" />
                <q-tab name="city" label="City" />
                <q-tab name="category" label="Category" />
                <q-tab name="inclusion" label="Inclusions" />
                </q-tabs>
            </template>
            <template v-slot:after>
                <q-scroll-area style="height:100%" :visible="true">
                    <div class="q-px-md text-grey-8 full-width">
                        <div class="q-my-md q-pt-xl">
                                <q-btn label="Add Motif" color="pink-3" v-show="tab == 'motif'" @click="addmotifdialog = true, isEditMotif = false">
                                    <q-tooltip>
                                        Add Motif
                                    </q-tooltip>
                                </q-btn>
                                <q-btn color="pink-3" label="Add City" v-show="tab == 'city'" @click="addcitydialog = true, isEditCity = false">
                                    <q-tooltip>
                                        Add City
                                    </q-tooltip>
                                </q-btn>
                                <q-btn color="pink-3" label="Add Category" v-show="tab == 'category'" @click="addcategorydialog = true, isEditCateg = false">
                                    <q-tooltip>
                                        Add Category
                                    </q-tooltip>
                                </q-btn>
                                <q-btn color="pink-3" label="Add Inclusion" v-show="tab == 'inclusion'" @click="addinclusiondialog = true, isEditInc = false">
                                    <q-tooltip>
                                        Add Inclusions
                                    </q-tooltip>
                                </q-btn>
                                <!-- <q-input v-model="filter" clearable dense type="text" :label="tab !='addInc' ? 'Search Food' : 'Search Inclusions'" color="pink-3" class="q-ma-md float-right" outlined icon="search" >
                                    <template v-slot:prepend>
                                        <q-icon name="search" />
                                    </template>
                                </q-input> -->
                        </div>
                        <div>
                        <q-table grid :data="filterTable" :columns="tab == 'motif' ? motifColumns : tab == 'city' ? cityColumns : tab == 'category' ? categColumns : incColumns" :filter="filter" class="q-px-sm full-width align-center ">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition q-ma-sm" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="border: 2px solid;border-color: pink;" >
                                        <div v-if="tab == 'motif'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.motif}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditMotif(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="pink-6" @click="openDeleteDialogMotif(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                        <div v-else-if="tab == 'city'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.city}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditCity(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="pink-6" @click="openDeleteDialogCIty(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                        <div v-else-if="tab == 'category'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.category}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditCateg(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="pink-6" @click="openDeleteDialogCateg(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                        <div v-else>
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.inclusion}}</q-item-label>
                                                        <q-item-label overline> {{props.row.inclusionPrice}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditInc(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="pink-6" @click="openDeleteDialogInc(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                    </q-card>
                                </div>
                            </template>
                        </q-table>
                    </div>
                    </div>
                </q-scroll-area>
            </template>

            </q-splitter>

        </div>
        <!-- Motif Dialog -->
        <q-dialog v-model="addmotifdialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditMotif ? 'Edit Motif': 'Add New Motif'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="motif" label="Motif Name"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" v-close-popup/>
                    <q-btn v-if="!isEditMotif" flat color="pink-3" label="Add Motif" v-close-popup @click="addMotif"/>
                    <q-btn v-if="isEditMotif" flat label="Update Motif" color="teal" v-close-popup v-on:click="setTask"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- City Dialog -->
        <q-dialog v-model="addcitydialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditCity ? 'Edit City': 'Add New City'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="city" label="City"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" v-close-popup/>
                    <q-btn v-if="!isEditCity" flat color="pink-3" label="Add City" @click="addCity" v-close-popup/>
                    <q-btn v-if="isEditCity" flat label="Update City" color="teal" v-close-popup v-on:click="setTaskCity"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Category Dialog -->
        <q-dialog v-model="addcategorydialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditCateg ? 'Edit Category': 'Add New Category'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="category" label="Category"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" v-close-popup/>
                    <q-btn flat v-if="!isEditCateg" color="pink-3" label="Add Category" @click="addCateg" v-close-popup/>
                    <q-btn flat v-if="isEditCateg" label="Update Category" color="teal" v-close-popup v-on:click="setTaskCateg"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Inclusion Dialog -->
        <q-dialog v-model="addinclusiondialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditCateg ? 'Edit Inclusion': 'Add New Inclusion'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="inclusion" label="Inclusion"/>
                    <q-input type="number" class="q-ma-sm" dense v-model="inclusionPrice" label="Inclusion"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" v-close-popup/>
                    <q-btn flat v-if="!isEditInc" color="pink-3" label="Add Inclusion" @click="addInc" v-close-popup/>
                    <q-btn flat v-if="isEditInc" label="Update Category" color="teal" v-close-popup v-on:click="setTaskInc"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>  
</template>
<script>
import { date } from 'quasar'
export default {
  data () {
    return {
      isEditCateg: false,
      isEditInc: false,
      isEditMotif: false,
      isEditCity: false,
      filter: '',
      tab: 'motif',
      splitterModel: 20,
      addmotifdialog: false,
      motif: '',
      addcitydialog: false,
      city: '',
      addcategorydialog: false,
      category: '',
      addinclusiondialog: false,
      inclusion: '',
      inclusionPrice: 0,
      Motif: [],
      FoodCategory: [],
      City: [],
      Inclusion: [],
      motifColumns: [
                { name: 'motif', align: 'center', label: 'Motif', field: 'motif', sortable: true },
        ],
      cityColumns: [
                { name: 'city', align: 'center', label: 'City', field: 'city', sortable: true },
        ],
      categColumns: [
                { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
        ],
      incColumns: [
                { name: 'inclusion', align: 'center', label: 'Inclusion', field: 'inclusion', sortable: true },
                { name: 'inclusionPrice', align: 'center', label: 'Price', field: 'inclusionPrice', sortable: true },
        ],
    }
  },
  mounted(){
      this.$binding('Motif', this.$firestoreApp.collection('Motif'))
            .then(Motif => {
            console.log(Motif, 'Motif')
            }),
      this.$binding('City', this.$firestoreApp.collection('City'))
            .then(City => {
            console.log(City, 'City')
            }),
      this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
            .then(FoodCategory => {
            console.log(FoodCategory, 'FoodCategory')
            }),
      this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            })
  },
  computed: {
      filterTable(){
            console.log(this.tab, 'tab')
            if(this.tab === 'motif'){
                return this.Motif
            } else if (this.tab === 'city'){
                return this.City
            }else if (this.tab === 'category'){
                return this.FoodCategory
            }else{
                return this.Inclusion
            }
        },
  },
  methods: {
    // Inclusion Add Edit Delete
      setTaskInc(){
                var inclusionBago = {
                    inclusion: this.inclusion,
                    inclusionPrice: this.inclusionPrice
                }
                if(this.inclusion === '' || this.inclusionPrice === '' || this.inclusionPrice === 0){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update Inclusion',
                    message: 'Update This Inclusion?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Inclusion').doc(this.inclusionID).set(inclusionBago)
                    this.$q.notify({
                            message: 'Inclusion Updated!',
                            icon: 'mdi-update',
                            color: 'teal',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addinclusiondialog = false  
                }).onCancel(()=>{
                    this.addinclusiondialog = true
                })  
            },
      geteditInc (task) {
            console.log(task, 'task')
            this.inclusionID = task['.key']
            this.inclusion = task.inclusion
            this.inclusionPrice = task.inclusionPrice
			this.addinclusiondialog = true
			this.isEditInc = true
		    },
      openDeleteDialogInc (task) {
                var id = task['.key']
                this.$q.dialog({
                    title: 'Delete Inclusion?',
                    message: 'Delete This Inclusion?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Inclusion').doc(id).delete()
                    this.$q.notify({
                            message: 'Inclusion Deleted!',
                            icon: 'mdi-delete',
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },
      addInc () {
            var inclusion = {
                inclusion: this.inclusion,
                inclusionPrice: this.inclusionPrice
            }   
            let optionss = this.$lodash.filter(this.Inclusion, m => {
                if(m.inclusion === this.inclusion){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.inclusion === '' || this.inclusionPrice === '' || this.inclusionPrice === 0) {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addinclusiondialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addinclusiondialog = true
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
                            this.$firestoreApp.collection('Inclusion').add(inclusion)
                            this.$q.notify({
                                    message: 'Inclusion Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.inclusion = ''
                            }).onCancel(()=>{
                                this.addinclusiondialog = true
                            })
                    }
                }
            },
    // Category Add Edit Delete
      setTaskCateg(){
                var categoryBago = {
                    category: this.category,
                }
                if(this.category === ''){
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
                    this.$firestoreApp.collection('FoodCategory').doc(this.categoryID).set(categoryBago)
                    this.$q.notify({
                            message: 'Category Updated!',
                            icon: 'mdi-update',
                            color: 'teal',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addcategorydialog = false  
                }).onCancel(()=>{
                    this.addcategorydialog = true
                })  
            },
      geteditCateg (task) {
            console.log(task, 'task')
            this.categoryID = task['.key']
            this.category = task.category
			this.addcategorydialog = true
			this.isEditCateg = true
		    },
      openDeleteDialogCateg (task) {
                var id = task['.key']
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
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },
      addCateg () {
            var category = {
                category: this.category,
            }   
            let optionss = this.$lodash.filter(this.FoodCategory, m => {
                if(m.category === this.category){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.category === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addcategorydialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addcategorydialog = true
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
                            this.$firestoreApp.collection('FoodCategory').add(category)
                            this.$q.notify({
                                    message: 'Category Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.category = ''
                            }).onCancel(()=>{
                                this.addcategorydialog = true
                            })
                    }
                }
            },
    // City  Add Edit Delete
      setTaskCity(){
                var cityBago = {
                    city: this.city,
                }
                if(this.city === ''){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update City',
                    message: 'Update This City?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('City').doc(this.cityID).set(cityBago)
                    this.$q.notify({
                            message: 'City Updated!',
                            icon: 'mdi-update',
                            color: 'teal',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addcitydialog = false  
                }).onCancel(()=>{
                    this.addcitydialog = true
                })  
            },
      geteditCity (task) {
            console.log(task, 'task')
            this.cityID = task['.key']
            this.city = task.city
			this.addcitydialog = true
			this.isEditCity = true
		    },
      openDeleteDialogCIty (task) {
                var id = task['.key']
                this.$q.dialog({
                    title: 'Delete City?',
                    message: 'Delete This City?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('City').doc(id).delete()
                    this.$q.notify({
                            message: 'City Deleted!',
                            icon: 'mdi-delete',
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            }, 
      addCity () {
            var city = {
                city: this.city,
            }   
            let optionss = this.$lodash.filter(this.City, m => {
                if(m.city === this.city){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.city === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addcitydialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addcitydialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add City',
                        message: 'Add This City?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('City').add(city)
                            this.$q.notify({
                                    message: 'City Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'teal',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.city = ''
                            }).onCancel(()=>{
                                this.addcitydialog = true
                            })
                    }
                }
            },
    //   Motif Add Edit Delete
      setTask(){
                var motifBago = {
                    motif: this.motif,
                }
                if(this.motif === ''){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update Motif',
                    message: 'Update This Motif?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Motif').doc(this.motifID).set(motifBago)
                    this.$q.notify({
                            message: 'Motif Updated!',
                            icon: 'mdi-update',
                            color: 'pink-3',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addmotifdialog = false  
                }).onCancel(()=>{
                    this.addmotifdialog = true
                })  
            },
      geteditMotif (task) {
            console.log(task, 'task')
            this.motifID = task['.key']
            this.motif = task.motif
			this.addmotifdialog = true
			this.isEditMotif = true
		    },
      openDeleteDialogMotif (task) {
                var id = task['.key']
                this.$q.dialog({
                    title: 'Delete Motif?',
                    message: 'Delete This Motif?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Motif').doc(id).delete()
                    this.$q.notify({
                            message: 'Motif Deleted!',
                            icon: 'mdi-delete',
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },
      addMotif () {
            var motif = {
                motif: this.motif,
            }   
            let optionss = this.$lodash.filter(this.Motif, m => {
                if(m.motif === this.motif){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.motif === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addmotifdialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addmotifdialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Motif',
                        message: 'Add This Motif?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('Motif').add(motif)
                            this.$q.notify({
                                    message: 'Motif Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.motif = ''
                            }).onCancel(()=>{
                                this.addmotifdialog = true
                            })
                    }
                }
            },
  }
}
</script>