<template>
      <q-page class="flex flex-center">
        <template>  
            <q-splitter v-model="splitterModel" style="height: 92vh; width: 100%;" :limits="[18, 18]">  
                <template v-slot:before>
                    <div class="bg-grey-9 fit">
                        <div class="text-h6 text-white text-center q-py-md">FILTER OPTIONS</div>
                        <q-input v-model="filter" clearable type="text" label="Search Users" color="deep-orange-4" class="q-ma-md bg-white" outlined icon="search">
                            <template v-slot:prepend>
                                <q-icon name="search" color="deep-orange-4"/>
                            </template>
                        </q-input>
                    </div>
                    
                </template> 
                <template v-slot:after>   
                <q-btn fab icon="mdi-plus-thick" color="teal" @click="addUserDialog = true,editMode = false" class="q-my-md q-ml-md">
                    <q-tooltip>
                                        Add New User
                    </q-tooltip>
                </q-btn>
                <div>
                    <q-table grid :data="returnNoAdmins" :columns="columns" class="q-px-sm full-width align-center ">
                        <template v-slot:item="props">
                                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-3 grid-style-transition q-ma-sm" :style="props.selected ? 'transform: scale(0.95);' : ''">
                                    <q-card class="my-card" style="border: 2px solid;border-color: #ffdab9;" >
                                        <div>
                                        <q-card-section>
                                            <q-list dense>
                                            <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" v-show="col.name != 'partyTrayPrice'">
                                                <q-item-section dense>
                                                <q-item-label lines="1">{{ col.label }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side dense>
                                                <q-item-label lines="2">{{ col.value }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            <q-item class="q-mt-sm">
                                                <span class="full-width text-center text-weight-bold">PERMISSIONS</span>
                                            </q-item>
                                            <q-item v-for="(permission, index) in returnPermissions(props.row)" :key="index">
                                                <q-item-section>
                                                <q-item-label overline>{{ permission.permissionName }}</q-item-label>
                                                </q-item-section>
                                                <q-item-section side>
                                                <q-item-label caption>
                                                    <q-chip :color="permission.status == true ? 'teal' : 'red'" round size="xs" :text-color="permission.status == true ? 'teal' : 'red'" label=""/>
                                                </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                            
                                        </q-list>
                                        </q-card-section>
                                        <q-separator inset />
                                        <q-card-actions align="right">
                                            <q-btn flat label="DELETE" color="grey-8" @click="removeUser(props.row)"/>
                                            <q-btn flat label="EDIT" color="teal" @click="editUser(props.row)"/>
                                        </q-card-actions>
                                        </div>
                                    </q-card>
                                </div>
                            </template>
                    </q-table>
                </div>

                </template>
            </q-splitter>
        </template>
        <q-dialog v-model="addUserDialog" persistent>
            <q-card style="min-width: 500px" class="q-pa-sm">
                <q-card-section class="row">
                    <div class="text-h6">Add New User</div>
                    <q-space />
                    <q-btn icon="close" v-close-popup flat round @click="addUserDialog = false"></q-btn>
                </q-card-section>
                <q-card-section v-if="!editMode">
                    <q-chip color="teal" text-color="white" class="q-mb-md q-mt-none" icon="info" label="Recommended to Have Both Login Details" />
                    <q-input v-model="newUser.email" type="email" label="Email Address (for gAuth)" outlined="" color="teal" dense/>
                    <div class="text-center q-mt-md">OR</div>
                    <q-input v-model="newUser.userName" type="text" label="User Name" outlined="" color="teal" class="q-mt-md" dense/>
                    <div class="row">
                        <q-input v-model="newUser.password" type="password" label="Password" outlined="" color="teal" class="q-mt-md q-mr-md col" dense/>
                        <q-input v-model="newUser.confirmPassword" type="password" label="Confirm Password" outlined="" color="teal" class="q-mt-md col" dense/>
                    </div>
                    <!-- <q-select v-model="newUser.position" label="Position" outlined="" color="teal" class="q-mt-md" :options="positionOpts" emit-value dense/> -->
                    <div class="text-overline q-my-md">PERMISSIONS</div>
                    <div style="border: 1.5px solid;border-color: teal;" class="q-pa-md">
                        <div class="text-caption text-weight-bold text-teal">POSITION</div>
                        <div>
                            <q-radio @input="radioOpt" color="teal" v-model="newUser.position" val="Staff" label="Staff" />
                            <q-radio @input="radioOpt" color="teal" v-model="newUser.position" val="Delivery Boy" label="Delivery Boy" />
                            <q-radio @input="radioOpt" color="teal" v-model="newUser.position" val="Admin" label="Admin" />
                            <q-radio @input="radioOpt" color="teal" v-model="newUser.position" val="Cashier" label="Cashier" />
                        </div>
                        <div class="text-caption text-weight-bold text-teal">FILE MAINTANCE</div>
                        <q-checkbox v-model="permissions.packages" label="Package Management" color="teal"/>
                        <q-checkbox v-model="permissions.food" label="Food Management" color="teal" class=""/>
                        <q-checkbox v-model="permissions.partyTray" label="Party Trays Management" color="teal" class=""/>
                        <q-checkbox v-model="permissions.others" label="Other Management" color="teal" class=""/>
                        <q-checkbox v-model="permissions.users" label="Users" color="teal" class=""/>
                        <q-separator spaced inset/>
                        <div class="text-caption text-weight-bold text-teal">OTHER MODULES</div>
                        <q-checkbox v-model="permissions.walkIn" label="Walk-In Reservation" color="teal" class=""/>
                        <q-checkbox v-model="permissions.partyTrayOrdering" label="Party Tray Ordering" color="teal" class=""/>
                        <q-checkbox v-model="permissions.reservation" label="Reservation" color="teal" class=""/>
                        <q-checkbox v-model="permissions.dashBoard" label="Dashboard" color="teal" class=""/>
                        <q-checkbox v-model="permissions.calendar" label="Calendar" color="teal" class=""/>
                        <q-checkbox v-model="permissions.partyTrayReservation" label="Party Tray Reservation" color="teal" class=""/>
                        <q-checkbox v-model="permissions.cancelled" label="Cancelled Events" color="teal" class=""/>
                    </div>
                </q-card-section>
                <q-card-section v-else>
                    <q-chip color="teal" text-color="white" class="q-mb-md q-mt-none" icon="info" label="Recommended to Have Both Login Details" />
                    <q-input v-model="selectedUser.email" type="email" label="Email Address (for gAuth)" outlined="" color="teal" dense/>
                    <div class="text-center q-mt-md">OR</div>
                    <q-input v-model="selectedUser.userName" disable type="text" label="User Name" outlined="" color="teal" class="q-mt-md" dense/>
                    <!-- <div class="row">
                        <q-input v-model="selectedUser.password" type="password" label="Password" outlined="" color="teal" class="q-mt-md q-mr-md col" dense/>
                        <q-input v-model="selectedUser.confirmPassword" type="password" label="Confirm Password" outlined="" color="teal" class="q-mt-md col" dense/>
                    </div> -->
                    <!-- <q-select v-model="selectedUser.position" label="Position" outlined="" color="teal" class="q-mt-md" :options="positionOpts" emit-value dense/> -->
                    <div class="text-overline q-my-md">PERMISSIONS</div>
                    <div style="border: 1.5px solid;border-color: teal;" class="q-pa-md">
                        <div class="text-caption text-weight-bold text-teal">POSITION</div>
                        <div>
                            <q-radio @input="radioOptedit" color="teal" v-model="selectedUser.position" val="Staff" label="Staff" />
                            <q-radio @input="radioOptedit" color="teal" v-model="selectedUser.position" val="Delivery Boy" label="Delivery Boy" />
                            <q-radio @input="radioOptedit" color="teal" v-model="selectedUser.position" val="Admin" label="Admin" />
                            <q-radio @input="radioOptedit" color="teal" v-model="selectedUser.position" val="Cashier" label="Cashier" />
                        </div>
                        <div class="text-caption text-weight-bold text-teal">FILE MAINTANCE</div>
                        <q-checkbox v-model="selectedPermission.packages" label="Package Management" color="teal"/>
                        <q-checkbox v-model="selectedPermission.food" label="Food Management" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.partyTray" label="Party Trays Management" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.others" label="Other Management" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.users" label="Users" color="teal" class=""/>
                        <q-separator spaced inset/>
                        <div class="text-caption text-weight-bold text-teal">OTHER MODULES</div>
                        <q-checkbox v-model="selectedPermission.walkIn" label="Walk-In Reservation" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.partyTrayOrdering" label="Party Tray Ordering" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.reservation" label="Reservation" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.dashBoard" label="Dashboard" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.calendar" label="Calendar" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.partyTrayReservation" label="Party Tray Reservation" color="teal" class=""/>
                        <q-checkbox v-model="selectedPermission.cancelled" label="Cancelled Events" color="teal" class=""/>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="CANCEL" v-close-popup/>
                    <q-btn flat label="SAVE USER" color="teal" @click="saveUser" v-if="!editMode"/>
                    <q-btn flat label="UPDATE USER" color="teal" @click="updateUser" v-else/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        </q-page>
</template>
<style>

</style>
<script>
export default {
    data () {
        return {
            editMode: false,
            splitterModel: 20,
            addUserDialog: false,
            filter: '', //testing
            newUser: {
                userName: '',
                password: '',
                confirmPassword: '',
                email: '',
                position: 'Staff',
            },
            permissions: {
                calendar: false,
                partyTrayReservation: true,
                reservation: true,
                dashBoard: false,
                packages: false,
                food: false,
                partyTray: false,
                others: false,
                walkIn: true,
                partyTrayOrdering: true,
                users: false,
                cancelled: true,
            },
            users: [],
            Position: [],
            columns: [
                { name: 'displayName', required: true, label: 'User Name', align: 'center', field: 'displayName', sortable: true },
                { name: 'position', required: true, label: 'Position', align: 'center', field: 'position', sortable: true },
            ],
            selectedUser:{},
            selectedPermission:{}
        }
    },
    mounted (){
            this.$binding('users', this.$firestoreApp.collection('dashboardUsers'))
            this.$binding('Position', this.$firestoreApp.collection('Position'))
    },
    computed :{
        positionOpts(){
            let pushOut = []
            let map = this.$lodash.map(this.Position,a=>{
                return {
                    label: a.position,
                    value: a.position
                }
            })
            return map

        },
        returnNoAdmins(){
            let noAdmin = this.$lodash.filter(this.users, a=>{
                return a.position != 'superadmin' && a.position != 'Admin'
            })
            console.log(noAdmin,'noAdmin')
            return noAdmin
        }
    },
    methods :{
        radioOpt(){
            if(this.newUser.position === 'Admin'){
                this.permissions.calendar = true
                this.permissions.partyTrayReservation = true
                this.permissions.reservation = true
                this.permissions.dashBoard = true
                this.permissions.packages = true
                this.permissions.food = true
                this.permissions.partyTray = true
                this.permissions.others = true
                this.permissions.walkIn = true
                this.permissions.partyTrayOrdering = true
                this.permissions.users = true
                this.permissions.cancelled = true
            }else if(this.newUser.position === 'Staff'){
                this.permissions.calendar = false
                this.permissions.partyTrayReservation = true
                this.permissions.reservation = true
                this.permissions.dashBoard = false
                this.permissions.packages = false
                this.permissions.food = false
                this.permissions.partyTray = false
                this.permissions.others = false
                this.permissions.walkIn = true
                this.permissions.partyTrayOrdering = true
                this.permissions.users = false
                this.permissions.cancelled = true
            }else if(this.newUser.position === 'Cashier'){
                this.permissions.calendar = false
                this.permissions.partyTrayReservation = true
                this.permissions.reservation = true
                this.permissions.dashBoard = false
                this.permissions.packages = false
                this.permissions.food = false
                this.permissions.partyTray = false
                this.permissions.others = false
                this.permissions.walkIn = true
                this.permissions.partyTrayOrdering = true
                this.permissions.users = false
                this.permissions.cancelled = false
            }else{
                this.permissions.calendar = false
                this.permissions.partyTrayReservation = true
                this.permissions.reservation = true
                this.permissions.dashBoard = false
                this.permissions.packages = false
                this.permissions.food = false
                this.permissions.partyTray = false
                this.permissions.others = false
                this.permissions.walkIn = false
                this.permissions.partyTrayOrdering = false
                this.permissions.users = false
                this.permissions.cancelled = false
            }
        },
        radioOptedit(){
            if(this.selectedUser.position === 'Admin'){
                this.selectedPermission.calendar = true
                this.selectedPermission.partyTrayReservation = true
                this.selectedPermission.reservation = true
                this.selectedPermission.dashBoard = true
                this.selectedPermission.packages = true
                this.selectedPermission.food = true
                this.selectedPermission.partyTray = true
                this.selectedPermission.others = true
                this.selectedPermission.walkIn = true
                this.selectedPermission.partyTrayOrdering = true
                this.selectedPermission.users = true
                this.selectedPermission.cancelled = true
            }else if(this.selectedUser.position === 'Staff'){
                this.selectedPermission.calendar = false
                this.selectedPermission.partyTrayReservation = true
                this.selectedPermission.reservation = true
                this.selectedPermission.dashBoard = false
                this.selectedPermission.packages = false
                this.selectedPermission.food = false
                this.selectedPermission.partyTray = false
                this.selectedPermission.others = false
                this.selectedPermission.walkIn = true
                this.selectedPermission.partyTrayOrdering = true
                this.selectedPermission.users = false
                this.selectedPermission.cancelled = false
            }else if(this.selectedUser.position === 'Cashier'){
                this.selectedPermission.calendar = false
                this.selectedPermission.partyTrayReservation = true
                this.selectedPermission.reservation = true
                this.selectedPermission.dashBoard = false
                this.selectedPermission.packages = false
                this.selectedPermission.food = false
                this.selectedPermission.partyTray = false
                this.selectedPermission.others = false
                this.selectedPermission.walkIn = true
                this.selectedPermission.partyTrayOrdering = true
                this.selectedPermission.users = false
                this.selectedPermission.cancelled = true
            }else{
                this.selectedPermission.calendar = false
                this.selectedPermission.partyTrayReservation = true
                this.selectedPermission.reservation = true
                this.selectedPermission.dashBoard = false
                this.selectedPermission.packages = false
                this.selectedPermission.food = false
                this.selectedPermission.partyTray = false
                this.selectedPermission.others = false
                this.selectedPermission.walkIn = false
                this.selectedPermission.partyTrayOrdering = false
                this.selectedPermission.users = false
                this.selectedPermission.cancelled = false
            }
        },
        editUser(user){
            console.log(user,'editmode')
            this.editMode = true
            this.addUserDialog = true

            let edit = {...user}
            let userName = edit.userName.split('@')
            edit.userName = userName[0]
            this.selectedUser = edit
            this.selectedPermission = edit.permissions
        },
        returnPermissions(user){
            let permissions = {...user.permissions}
            let map = this.$lodash.map(permissions,function(value,key){
                let name = ''
                switch(key) {
                    case 'food':
                        name = 'Food Management'
                        break;
                    case 'partyTray':
                        name = 'Party Tray Management'
                        break;
                    case 'others':
                        name = 'Others Management'
                        break;
                    case 'packages':
                        name = 'Package Management'
                        break;    
                    case 'partyTrayOrdering':
                        name = 'Party Tray Ordering'
                        break;  
                    case 'walkIn':
                        name = 'Walk-In Reservation'
                        break; 
                    case 'users':
                        name = 'Users Management'
                        break;                                              
                    default:
                        name = key
                        break;
                }

                return {
                    permissionName: name,
                    status: value
                }
            })
            return map
        },
        saveUser(){
            let data = this.newUser
            data.permissions = this.permissions

            console.log(data,'newUser')
            if(data.userName == '' || data.password == '' || data.confirmPassword == ''){
                this.$q.dialog({
                  title: 'Required Fields is Empty.',
                  message: 'Fill up all Requirements',
                  color:'pink-6',
                  ok: 'Ok',
                  persistent: true
                }).onOk(()=>{
                    this.addUserDialog = true
                })
            } else {
                if(data.password !=  data.confirmPassword){
                    this.$q.dialog({
                        title: 'Password Does Not Match',
                        color:'pink-6',
                        ok: 'Ok',
                        persistent: true
                    }).onOk(()=>{
                        this.addUserDialog = true
                    })  
                } else {
                    this.$q.dialog({
                    title: 'Do you want to save this user',
                    color:'pink-6',
                    ok: 'Ok',
                    persistent: true
                    }).onOk(()=>{
                        let newUserName = data.userName + '@carmens.com'
                        data.displayName = data.userName
                        data.userName = newUserName
                        data.active = true
                        console.log(data,'newUser')
                        this.$auth.createUserWithEmailAndPassword(data.userName, data.password)
                        .then((res)=> {
                            console.log(res,'res')
                            console.log(res.user.uid, 'uid') 
                            delete data.password
                            delete data.confirmPassword
                            console.log(data,'finalSaveDatabase')
                            // this.addUserDialog = true
                            this.$firestoreApp.collection('dashboardUsers').doc(res.user.uid).set(data)
                            .then(() =>{
                                this.addUserDialog = false
                                this.$q.notify({
                                        message: 'User Added!',
                                        icon: 'mdi-folder-plus-outline',
                                        color: 'teal',
                                        textColor: 'white',
                                        position: 'center'
                                    })
                                this.clearAllInput()
                            }).catch(err=>{
                                this.addUserDialog = false
                                this.$q.notify({
                                        message: 'User Add Failed!',
                                        icon: 'error',
                                        color: 'negative',
                                        textColor: 'white',
                                        position: 'center'
                                    })  
                                this.clearAllInput()                              
                            })
                        }).catch((err)=>{
                            console.log(err.code+' '+err.message)
                        })
                    }) 
                }

            }
        },
        updateUser(){
            let data = {...this.selectedUser}
            data.permissions = this.selectedPermission
            data.userName = this.selectedUser.userName +'@carmens.com'
            data.displayName = this.selectedUser.userName
            let docKey = data['.key']
            delete data['.key']
            console.log(data,'update')
            this.$q.dialog({
            title: 'Do you want to update this user',
            color:'pink-6',
            ok: 'Ok',
            persistent: true
            }).onOk(()=>{
                this.$firestoreApp.collection('dashboardUsers').doc(docKey).set(data)
                .then(()=>{
                    this.addUserDialog = false
                    this.$q.notify({
                        message: 'User Updated!',
                        icon: 'mdi-folder-plus-outline',
                        color: 'teal',
                        textColor: 'white',
                        position: 'center'
                    })
                })
                .catch(err =>{
                    this.addUserDialog = false
                    this.$q.notify({
                            message: 'User Update Failed!',
                            icon: 'error',
                            color: 'negative',
                            textColor: 'white',
                            position: 'center'
                        })   
                })

            }).onCancel(()=>{
                this.addUserDialog = true
            })
        },
        removeUser(user){
            let key = user['.key']
            let name = user.displayName
            this.$q.dialog({
            title: 'Do you want to delete ' + user.displayName+' ?',
            color:'pink-6',
            ok: 'Ok',
            cancel: 'cancel',
            persistent: true
            }).onOk(()=>{ 
                this.$firestoreApp.collection(`dashboardUsers`).doc(key).delete()
                .then(() => {
                    this.$q.notify({
                        message: `${name} has been deleted`,
                        type: 'teal',
                        color: 'teal',
                        textColor: 'white',
                        icon: 'info',
                        position: 'center',
                    })
                    this.$forceUpdate()
                })
                .catch(err => {
                    this.$q.notify({
                        message: `An error occur ${err}`,
                        type: 'negative',
                        color: 'negative',
                        textColor: 'white',
                        icon: 'info',
                        position: 'center',
                    })
                })
            })
        },
        clearAllInput(){
            this.newUser.userName = ''
            this.newUser.password = ''
            this.newUser.confirmPassword = ''
            this.newUser.email = ''
            this.newUser.position = ''
            this.permissions = {
                packages: false,
                food: false,
                partyTray: false,
                others: false,
                walkIn: false,
                partyTrayOrdering: false,
                users: false,
            }
        }
    }
}
</script>

