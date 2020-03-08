<template>
    <q-page>
        <div>
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">     
            <template v-slot:before>
                <div class="text-h6 bg-grey-9 text-white text-center q-py-md" style="font-family: 'Roboto Slab', serif;">FILE MANAGEMENT</div>
                <q-tabs v-model="tab" @click="clear" vertical class="text-grey-8 bg-grey-9 full-height relative-position" active-color="white" active-bg-color="deep-orange-4">
                <q-tab name="motif" class="text-white" label="Motif" />
                <q-tab name="city" class="text-white" label="City" />
                <q-tab name="category" class="text-white" label="Category" />
                <q-tab name="inclusion" class="text-white" label="Inclusions" />
                <q-tab name="addons" class="text-white" label="Add-Ons" />
                <!-- <q-tab name="position" class="text-white" label="Position" /> -->
                </q-tabs>
            </template>
            <template v-slot:after>
                <q-scroll-area style="height:100%" :visible="true">
                    <div class="q-px-md text-grey-8 full-width">
                        <div class="q-my-md q-pt-xl">
                                <q-btn label="Add Motif" class="bg-deep-orange-4 text-white" v-show="tab == 'motif'" @click="addmotifdialog = true, isEditMotif = false">
                                    <q-tooltip>
                                        Add Motif 
                                    </q-tooltip>
                                </q-btn>
                                <q-btn class="bg-deep-orange-4 text-white" label="Add City" v-show="tab == 'city'" @click="addcitydialog = true, isEditCity = false">
                                    <q-tooltip>
                                        Add City
                                    </q-tooltip>
                                </q-btn>
                                <q-btn class="bg-deep-orange-4 text-white" label="Add Category" v-show="tab == 'category'" @click="addcategorydialog = true, isEditCateg = false">
                                    <q-tooltip>
                                        Add Category
                                    </q-tooltip>
                                </q-btn>
                                <q-btn class="bg-deep-orange-4 text-white" label="Add Inclusion" v-show="tab == 'inclusion'" @click="addinclusiondialog = true, isEditInc = false">
                                    <q-tooltip>
                                        Add Inclusions
                                    </q-tooltip>
                                </q-btn>
                                <q-btn class="bg-deep-orange-4 text-white" label="Add Add-Ons" v-show="tab == 'addons'" @click="addaddonsdialog = true, isEditAdd = false">
                                    <q-tooltip>
                                        Add Add-Ons
                                    </q-tooltip>
                                </q-btn>
                                <q-btn class="bg-deep-orange-4 text-white" label="Add Positon" v-show="tab == 'position'" @click="addpositiondialog = true, isEditPos = false">
                                    <q-tooltip>
                                        Add Position
                                    </q-tooltip>
                                </q-btn>
                                <!-- <q-input v-model="filter" clearable dense type="text" :label="tab !='addInc' ? 'Search Food' : 'Search Inclusions'" color="pink-3" class="q-ma-md float-right" outlined icon="search" >
                                    <template v-slot:prepend>
                                        <q-icon name="search" />
                                    </template>
                                </q-input> -->
                        </div>
                        <div>
                        <q-table grid :data="filterTable" :columns="tab == 'motif' ? motifColumns : tab == 'city' ? cityColumns : tab == 'category' ? categColumns : tab == 'addons' ? addColumns : tab == 'position' ? posColumns : incColumns" :pagination.sync="tab == 'motif' ? motifpagination:citypagination" :filter="filter" class="q-px-sm full-width align-center ">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition q-ma-sm" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="border: 2px solid;border-color: #FFDAB9;" >
                                        <div v-if="tab == 'motif'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section avatar>
                                                        <q-avatar :style="'background-color:'+props.row.hex"/>
                                                    </q-item-section>
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.motif}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditMotif(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogMotif(props.row)">
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
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogCIty(props.row)">
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
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogCateg(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                        <div v-else-if="tab == 'position'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.position}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditPos(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogPos(props.row)">
                                                            <q-tooltip>
                                                                Delete
                                                            </q-tooltip>
                                                        </q-btn>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </div>
                                        <div v-else-if="tab == 'addons'">
                                            <q-list>
                                                <q-item class="text-h6">
                                                    <q-item-section>
                                                        <q-item-label overline> {{props.row.addons}}</q-item-label>
                                                        <q-item-label overline> {{props.row.addonsPrice}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section class="row">
                                                        <q-btn flat dense color="teal" icon="mdi-pencil" @click="geteditAdd(props.row)">
                                                            <q-tooltip>
                                                                Edit
                                                            </q-tooltip>
                                                        </q-btn>
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogAdd(props.row)">
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
                                                        <q-btn flat icon="delete" dense color="grey-8" @click="openDeleteDialogInc(props.row)">
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
                    <q-color v-model="hex" inline class="my-picker q-mt-md"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn v-if="!isEditMotif" flat color="deep-orange-4" label="Add Motif" v-close-popup @click="addMotif"/>
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
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn v-if="!isEditCity" flat color="deep-orange-4" label="Add City" @click="addCity" v-close-popup/>
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
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn flat v-if="!isEditCateg" color="deep-orange-4" label="Add Category" @click="addCateg" v-close-popup/>
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
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn flat v-if="!isEditInc" color="deep-orange-4" label="Add Inclusion" @click="addInc" v-close-popup/>
                    <q-btn flat v-if="isEditInc" label="Update Inclusion" color="teal" v-close-popup v-on:click="setTaskInc"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Add-Ons Dialog -->
        <q-dialog v-model="addaddonsdialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditAdd ? 'Edit Add-Ons': 'Add New Add-Ons'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="addons" label="Add-Ons"/>
                    <q-input type="number" class="q-ma-sm" dense v-model="addonsPrice" label="Add-Ons Prive"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn flat v-if="!isEditAdd" color="deep-orange-4" label="Add Add-Ons" @click="addaddOns" v-close-popup/>
                    <q-btn flat v-if="isEditAdd" label="Update Add-Ons" color="teal" v-close-popup v-on:click="setTaskAdd"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Position Dialog -->
        <q-dialog v-model="addpositiondialog" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{isEditPos ? 'Edit Postion': 'Add New Position'}}</div>
                </q-card-section>

                <q-card-section>
                    <q-input class="q-ma-sm" dense v-model="position" label="Position"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat color="grey-8" label="Cancel" @click="clear" v-close-popup/>
                    <q-btn flat v-if="!isEditPos" color="deep-orange-4" label="Add Position" @click="addposition" v-close-popup/>
                    <q-btn flat v-if="isEditPos" label="Update Position" color="teal" v-close-popup v-on:click="setTaskPos"/>
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
      hex: '#FFFFFF',
      isEditCateg: false,
      isEditInc: false,
      isEditMotif: false,
      isEditCity: false,
      isEditAdd: false,
      addpositiondialog: false,
      isEditPos: false,
      filter: '',
      tab: 'motif',
      position: '',
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
      addaddonsdialog: false,
      addons: '',
      addonsPrice: 0,
      Motif: [],
      FoodCategory: [],
      City: [],
      Position: [],
      Addons: [],
      Inclusion: [],
      motifpagination: { sortBy: 'motif', descending: false, page: 1, rowsPerPage: 10},
      citypagination: { sortBy: 'city', descending: false, page: 1, rowsPerPage: 10},
    //   categpagination: { sortBy: 'category', descending: false, page: 1, rowsPerPage: 10},
    //   incpagination: { sortBy: 'inclusion', descending: false, page: 1, rowsPerPage: 10},
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
      addColumns: [
                { name: 'addons', align: 'center', label: 'Add-Ons', field: 'addons', sortable: true },
                { name: 'addonsPrice', align: 'center', label: 'Add-Ons Price', field: 'addonsPrice', sortable: true },
        ],
      posColumns: [
                { name: 'position', align: 'center', label: 'Position', field: 'position', sortable: true },
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
            }),
      this.$binding('Addons', this.$firestoreApp.collection('Addons'))
            .then(Addons => {
            console.log(Addons, 'Addons')
            }),
      this.$binding('Position', this.$firestoreApp.collection('Position'))
            .then(Position => {
            console.log(Position, 'Position')
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
            }else if (this.tab === 'addons'){
                return this.Addons
            }else if (this.tab === 'position'){
                return this.Position
            }else{
                return this.Inclusion
            }
        },
  },
  methods: {
    // Position Add Edit Delete
      setTaskPos(){
                var positionBago = {
                    position: this.position,
                }
                if(this.position === ''){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update Position',
                    message: 'Update This Position?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Position').doc(this.positionID).set(positionBago)
                    this.$q.notify({
                            message: 'Position Updated!',
                            icon: 'mdi-update',
                            color: 'teal',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.position = ''
                        this.addpositiondialog = false  
                }).onCancel(()=>{
                    this.addpositiondialog = true
                })  
            },
      geteditPos (task) {
            console.log(task, 'task')
            this.positionID = task['.key']
            this.position = task.position
			this.addpositiondialog = true
			this.isEditPos = true
		    },
      openDeleteDialogPos (task) {
                var id = task['.key']
                this.$q.dialog({
                    title: 'Delete Position?',
                    message: 'Delete This Position?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Position').doc(id).delete()
                    this.$q.notify({
                            message: 'Position Deleted!',
                            icon: 'mdi-delete',
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },
      addposition () {
            var position = {
                position: this.position
            }   
            let optionss = this.$lodash.filter(this.Position, m => {
                if(m.position === this.position){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.position === '') {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addpositiondialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addpositiondialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Position',
                        message: 'Add This Position?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('Position').add(position)
                            this.$q.notify({
                                    message: 'Position Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.position = ''
                            }).onCancel(()=>{
                                this.addpositiondialog = true
                            })
                    }
                }
            },
    // Addons Add Edit Delete
      setTaskAdd(){
                var addonsBago = {
                    addons: this.addons,
                    addonsPrice: this.addonsPrice
                }
                if(this.addons === '' || this.addonsPrice === '' || this.addonsPrice === 0){
                    this.$q.dialog({
                    title: 'Field Required!',
                    message: 'Fill all Requirements?',
                    ok: 'Ok',
                    cancel: 'Cancel'
                    })
                    }else
                    this.$q.dialog({
                    title: 'Update Add-Ons',
                    message: 'Update This Add-Ons?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Addons').doc(this.addonsID).set(addonsBago)
                    this.$q.notify({
                            message: 'Add-Ons Updated!',
                            icon: 'mdi-update',
                            color: 'teal',
                            textColor: 'white',
                            position: 'center'
                        })
                        this.addons = ''
                        this.addonsPrice = 0
                        this.addaddonsdialog = false  
                }).onCancel(()=>{
                    this.addaddonsdialog = true
                })  
            },
      geteditAdd (task) {
            console.log(task, 'task')
            this.addonsID = task['.key']
            this.addons = task.addons
            this.addonsPrice = task.addonsPrice
			this.addaddonsdialog = true
			this.isEditAdd = true
		    },
      openDeleteDialogAdd (task) {
                var id = task['.key']
                this.$q.dialog({
                    title: 'Delete Add-Ons?',
                    message: 'Delete This Add-Ons?',
                    ok: 'Yes',
                    cancel: 'Cancel'
                }).onOk(() => { 
                    this.$firestoreApp.collection('Addons').doc(id).delete()
                    this.$q.notify({
                            message: 'Add-Ons Deleted!',
                            icon: 'mdi-delete',
                            color: 'pink-6',
                            textColor: 'white',
                            position: 'center'
                        })
                })

            },
      addaddOns () {
            var addons = {
                addons: this.addons,
                addonsPrice: this.addonsPrice
            }   
            let optionss = this.$lodash.filter(this.Addons, m => {
                if(m.addons === this.addons){
                    return m
                }
            })   
                console.log(optionss, 'option')
                 
                if(this.addons === '' || this.addonsPrice === '' || this.addonsPrice === 0) {
                this.$q.dialog({
                title: 'Required!',
                message: 'Fill all Requirements??',
                ok: 'Ok',
                persistent: true
                }).onOk(()=>{
                    this.addaddonsdialog = true
                })
                }else{
                    if(optionss.length > 0){
                    this.$q.dialog({
                    title: 'Duplicate Entry!',
                    message: 'Unable to save?',
                    ok: 'Ok',
                    persistent: true
                        }).onOk(() => {
                            this.addaddonsdialog = true
                        })
                    }
                    else{
                        this.$q.dialog({
                        title: 'Add Add-Ons',
                        message: 'Add This Add-Ons?',
                        ok: 'Yes',
                        cancel: 'Cancel',
                        persistent: true
                            }).onOk(() => { 
                            this.$firestoreApp.collection('Addons').add(addons)
                            this.$q.notify({
                                    message: 'Add-Ons Added!',
                                    icon: 'mdi-folder-plus-outline',
                                    color: 'pink-3',
                                    textColor: 'white',
                                    position: 'center'
                            })
                                this.addons = ''
                                this.addonsPrice = 0
                            }).onCancel(()=>{
                                this.addaddonsdialog = true
                            })
                    }
                }
            },
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
                        this.inclusion = ''
                        this.inclusionPrice = 0
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
                                this.inclusionPrice = 0
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
                        this.category = ''
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
                        this.city = ''
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
                        this.motif = ''
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
                hex: this.hex
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
        clear(){
            if(this.tab === 'motif'){
               this.motif = ''
            }else if(this.tab === 'city'){
               this.city = ''
            }else if(this.tab === 'category'){
               this.category = ''
            }else if(this.tab === 'inclusion'){
               this.inclusion = ''
               this.inclusionPrice = 0
            }else if(this.tab === 'addons'){
               this.addons = ''
               this.addonsPrice = 0
            }
         }
  }
}
</script>