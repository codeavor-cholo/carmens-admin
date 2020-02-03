<template>
    <q-page padding>
        <q-table  grid :data="Packages" :columns="columns" :filter="filter" row-key=".key" selection="single" :selected.sync="selected">
            <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                    <q-card style="max-width: 250px" >
                        <q-card-section class="row items-center">
                            <strong><q-checkbox @input="consoleselected" dense v-model="props.selected" :label="props.row.eventName" /> </strong>
                            <q-space />
                            <div>
                                <q-btn no-caps icon="delete" dense color="negative" @click="openDeleteDialog(props.row)"></q-btn>
                            </div>
                        </q-card-section>
                        <q-card-section>
                            <div  v-for="(i, index) in props.row.dishType" :key="index">
                                <strong>
                                    {{i.dishName}}
                                </strong>
                                <q-list v-for="(j, jindex) in  i.category" :key="jindex" dense>
                                                <q-item clickable v-ripple>
                                                    <q-item-section>
                                                        <q-item-label lines="1">{{j.category}}</q-item-label>
                                                    </q-item-section>
                                                    <q-item-section side>
                                                        <q-item-label lines="1">{{j.qty}}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                </q-list>
                            </div>
                        </q-card-section>
                         <q-card-section>
                            <strong>{{props.row.packagePrice}} Php per head</strong>
                        </q-card-section>
                        <q-separator/>
                        <q-card-section>
                            <q-btn label="View Package Inclusion" dense color="primary" icon="mdi-pencil" @click="packIncDialog = true, openInclusion(props.row)"></q-btn>
                        </q-card-section>
                    </q-card>
                </div>
            </template>
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
                </q-input>
            </template>
          </q-table>
<!--FLOATING BUTTON-->
        <q-page-sticky position="top-left" :offset="[18, 18]">
            <q-btn flat fab icon="mdi-plus-thick" color="pink-3" @click="addPackDialog = true" />
                <q-tooltip>
                    Add Package
                </q-tooltip>
        </q-page-sticky>
        <!--Modal For add Food-->
        <q-dialog v-model="addPackDialog" persistent>
            <q-card style="min-width: 1000px">
                 <q-card-section class="row items-center">
                    <div class="text-h6">New Package</div>
                    <q-space />
                    <q-btn @click="clear" icon="close" flat round dense v-close-popup>
                        <q-tooltip>
                            Cancel
                        </q-tooltip>
                    </q-btn>
                </q-card-section>

                <q-card-section>
                    <q-stepper v-model="step" ref="stepper" style="border: 1px solid; border-color: pink" color="pink" inactive-color="grey-8" active-color="pink-3" active-bg-color="pink-1" animated>
                    <q-step :name="1" title="Select Dish Type For Package" icon="settings" :done="step > 1">
                        <q-table title="Select Food Category" grid :data="FoodCategory" :pagination.sync="pagination" :columns="dishcolumn" row-key=".key" selection="multiple" :selected.sync="selected">
                            <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card>
                                        <q-list>
                                            <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                                                <q-item-section side>
                                                        <div class="row">
                                                            <q-checkbox @input="checkcateg" color="pink-3" v-model="props.selected" :label="props.row.category" />
                                                        </div>
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                        
                                    </q-card>
                                </div>
                            </template>
                        </q-table>
                    </q-step>

                    <q-step :name="2" title="Select Food Type For Package" active-color="pink-3" active-bg-color="pink-1" icon="create_new_folder" :done="step > 2">
                      <div style="float: left; width: 50%;">  
                        <div  v-for="(i, index) in this.blanko" :key="index" class="q-ma-md">
                            <strong>
                                {{i.foodName}}
                            </strong>


                        <q-list v-for="(j, jindex) in i.category" :key="jindex" dense bordered padding>
                                        <q-item clickable v-ripple>
                                            <q-item-section>
                                                <q-item-label lines="1">{{j.foodName}}</q-item-label>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label lines="1">{{j.foodPrice}}</q-item-label>
                                            </q-item-section>
                                            <q-item-section side>
                                                <q-btn round color="pink-3" flat icon="add" @click="push(i.dishType,j)"/>
                                            </q-item-section>
                                        </q-item>
                        </q-list>

                        </div>

                        </div>

                    </q-step>

                    <template v-slot:navigation>
                        <q-stepper-navigation>
                        <q-btn @click="step === 2? addpack() : stepChecker()" color="pink-3" flat :label="step === 2 ? 'Add Package' : 'Continue'" />
                        <q-btn v-if="step > 1" flat color="grey-8" @click="stepBackCurry()" label="Back" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </template>
                    </q-stepper>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    mounted () {
            this.$binding('Food', this.$firestoreApp.collection('Food'))
            .then(Food => {
            console.log(Food, 'Food')
            }),
            this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
            .then(FoodCategory => {
            console.log(FoodCategory, 'FoodCategory')
            }),
            this.$binding('Inclusion', this.$firestoreApp.collection('Inclusion'))
            .then(Inclusion => {
            console.log(Inclusion, 'Inclusion')
            }),
            this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            })
        },
    methods: {
        stepBackCurry(){
            this.gg = []
            this.$refs.stepper.previous()
        },
        stepChecker(){
            if(this.selected.length === 0){
                    this.$q.dialog({
                    title: 'Fill all Requirements',
                    message: 'Filled Required?',
                    ok: 'Ok',
                    persistent: true
                })
            }
            else{
                this.$refs.stepper.next()
            }
        },
        check(){
            if(this.selectEvent === '' && this.selected === []){
                this.$q.dialog({
				title: 'Unable To Continue',
                message: 'Please fill or select something?',
                ok: 'Add',
                cancel: 'Cancel'
                })
            }
        },
        clear(){
            this.addPackDialog = false
            this.selectEvent = ''
            this.selected = []
            this.gg = []
            this.packPriceReal = 0
            this.setupselected = []
        },
        openInclusion (props) {
                this.selectedInclusion = props 
            },
        push(dishName,category){
            let optionss = this.$lodash.countBy(this.Food, m => {
						return m.category == category
                    })
            // let count = this.$lodash.countBy(optionss,'category')  
            console.log(optionss, 'count')  
            let arr = []
            let save = {...category}
            let maxPrice = parseInt(save.maxPrice)
            save.qty = 1
            if(this.gg.length !== 0){
                let index = this.$lodash.findIndex(this.gg, function(o) { return o.dishName == dishName; });
                console.log(index,'index')
                if(index > -1){
                    let check = this.$lodash.findIndex(this.gg[index].category, function(o) { return o.category == category.category; });
                    console.log(check,'check')
                    if(check > -1){
                        this.gg[index].category[check].qty = this.gg[index].category[check].qty + 1
                        this.gg[index].category[check].maxPrice = parseInt(this.gg[index].category[check].maxPrice) + maxPrice 
                    } else {
                        this.gg[index].category.push(save)
                    }
                } else {
                    this.gg.push({dishName: dishName, category: [save]})
                }
            } else {
                    this.gg.push({dishName: dishName, category: [save]})
            }
            console.log(this.gg,'gg')
            console.log(this.gg[0].category,'gg.category')
        },
        spliced(index,dindex){
                this.gg[dindex].category.splice(index,1) 
        },
        checkcateg(){
           this.blanko = []
            console.log(this.Dishprice)
                if(this.selected.length !== 0){
                    let arr = []
                    for(var x=0; x<this.selected.length; x++){
                        let categ = []
                        let optionss = this.$lodash.map(this.Food, m => {  
                            if(m.foodName === this.selected[x].foodName){
                                let data  = {...m}
                                let key  = data['.key']
                                delete data['.key']
                                data.categoryKey = key
                                console.log(data, 'datas')
                               categ.push(data)
                            }  
                        }) 
                        console.log(categ)
                        arr.push({
                            FoodName: this.selected[x].foodName,
                            category: categ
                        }) 
                    }
                    this.blanko = arr
                    console.log(this.blanko,'blanko')
                }else{

                }
        }
    },
    computed: {
        
    },
    data () {   
        return {
            Inclusion: [],
            packPriceReal: 0,
            setupselected: [],
            gg: [],
            blanko: [],
            filter: '',
            Packages: [],
            columns: [
                { name: 'eventName', required: true, label: 'Event Name:', align: 'center', field: 'eventName', sortable: true },
                { name: 'packagePrice', required: true, label: 'Price:', align: 'center', field: 'packagePrice', sortable: true },
            ],
            filter: '',
            addPackDialog: false,
            quantityInc: 0,
            incPrice: 0,
            pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            step: 1,
            Food: [],
            packIncDialog: false,
            FoodCategory: [],
            selected: [],
            selectEvent: '',
            dishcolumn: [
                { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
            ],
        }
    }

}
</script>
