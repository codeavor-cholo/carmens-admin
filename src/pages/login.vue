<template>
<q-layout View: lHh Lpr fFf>
<q-page-container>
    <q-page class="bg-deep-orange-4" style="background-position: center; background-repeat: no-repeat; background-size: cover; position: relative;">

      <div class="fixed-center mobile-only" v-show="splashscreen">
          <div class="q-pa-sm" >
              <img class="col" style="width:350px;height:100%" src="statics/pics/logo.png">
          </div>

          <div class="row justify-center">
          <q-spinner-hourglass
            color="white"
            size="5em"
          />
          <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
          </div>
        </div>

<!-- START OF DESKTOP ONLY     -->
    <div class="desktop-only">
    <q-card class="my-card fixed-center shadow-0" style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); width:400px; height:auto; padding:80px 40px; box-sizing: border-box; background:rgba(255,255,255,0.7) ; border-radius:25px;">
        <div>
          <q-icon name="person" class="bg-white text-deep-orange-5 q-pa-md" style="font-size:100px;overflow:hidden; position:absolute; top:calc(-100px/2); left:calc(50% - 50px); border-radius:50%; "></q-icon>
          <!-- <q-img src="statics/bg/3.png"  :ratio="1" basic spinner-color="white"></q-img> -->
        </div>
        <div class="text-deep-orange-5" style="margin:0; padding:0 0 20px;text-align:center;font-size:30px;font-family: 'Simonetta', serif;"><b>LOGIN HERE</b></div>
      <q-card-section>
        <q-input color="deep-orange-3" outlined style="width:100%; margin-bottom: 20px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" v-model="email" type="text" prefix="Username:">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="person" />
          </q-avatar>
        </template>
      </q-input>
      <q-input color="deep-orange-3" outlined style="width:100%; margin-bottom: 20px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" class="q-mt-md" prefix="Password:" v-model="password" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-avatar>
            <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
          </q-avatar>
        </template>
      </q-input>
      </q-card-section>
      <q-card-actions>
        <q-btn style="border:none; outline:none; height: 40px; color:#fff; font-size:16px; background: rgb(255,38,126); cursor:pointer; border-radius:20px;" label="Login"  class="full-width bg-deep-orange-5" @click="login2" />
        <!-- <q-btn style="border:none; outline:none; height: 40px; color:#fff; font-size:16px; background: rgb(255,38,126); cursor:pointer; border-radius:20px;" rounded color="primary" class="full-width q-mt-md" label="Register" @click="showRegisterDialog" /> -->
      </q-card-actions>
    </q-card>
<!-- 
    <q-dialog v-model="registerDialog">
    <register></register>   
    </q-dialog> -->
    </div>
<!-- END OF DESKTOP ONLY -->

<!-- START OF MOBILE ONLY     -->
    <div class="mobile-only" v-show="!splashscreen">
    <q-card class="my-card fixed-center shadow-0" style=" top:50%; left:50%; transform: translate(-50%, -50%); height:350px; width:320px; box-sizing: border-box; background:rgba(255,255,255,0.7) ; border-radius:25px;">
        <div>
          <q-icon name="person" class="bg-white text-deep-orange-5 q-pa-md" style="font-size:100px;overflow:hidden; position:absolute; top:calc(-100px/2); left:calc(50% - 50px); border-radius:50%; "></q-icon>
          <!-- <q-img src="statics/bg/3.png"  :ratio="1" basic spinner-color="white"></q-img> -->
        </div>
        <div class="text-deep-orange-5" style="margin:0; padding:55px 0 0;text-align:center;font-size:30px;font-family: 'Simonetta', serif;"><b>LOGIN HERE</b></div>
      <q-card-section>
        <q-input color="deep-orange-3" outlined style="width:290px; margin-bottom: 20px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" v-model="email" type="text" prefix="Username:">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="person" />
          </q-avatar>
        </template>
      </q-input>
      <q-input color="deep-orange-3" outlined style="width:290px; margin-bottom: 20px; border: none; border-bottom: 1px solid #fff; background: white; outline:none; height:50px; color:#fff; font-size: 16px;" class="q-mt-md" prefix="Password:" v-model="password" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-avatar>
            <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
          </q-avatar>
        </template>
      </q-input>
      </q-card-section>
      <q-card-actions>
        <q-btn style="border:none; outline:none; height: 40px; color:#fff; font-size:16px; background: rgb(255,38,126); cursor:pointer; border-radius:20px;" label="Login"  class="full-width bg-deep-orange-5" @click="login2" />
        <!-- <q-btn style="border:none; outline:none; height: 40px; color:#fff; font-size:16px; background: rgb(255,38,126); cursor:pointer; border-radius:20px;" rounded color="primary" class="full-width q-mt-md" label="Register" @click="showRegisterDialog" /> -->
      </q-card-actions>
    </q-card>
<!-- 
    <q-dialog v-model="registerDialog">
    <register></register>   
    </q-dialog> -->
    </div>
<!-- END OF MOBILE ONLY -->
</q-page>
</q-page-container>    
</q-layout>    
</template>

<script>
// import Register from '../pages/signup.vue'

export default {
    // components: {
    //   Register
    // },
    data () {
        return {
         email: '',
         splashscreen: true,
         password: '',   
         isPwd: '',
         registerDialog: true,
         users: []
        }
    },
    mounted() {
            this.$binding('users', this.$firestoreApp.collection('dashboardUsers'))
    },
    
    created(){
          setTimeout(() => {
          this.splashscreen=false;
          // console.log('sdf')
          }, 7000)

          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              
              if (user) {
                console.log('createdUser',user)
                if(self.returnUserPosition(user.uid) == 'Admin' || self.returnUserPosition(user.uid) == 'Cashier'){
                  self.$router.push('/dashboard')
                } else {
                  self.$router.push('/staffdashboard')
                }
              } else {
                  // No user is signed in.
                  // self.$router.push('/')
              }
          })
      },
    computed: {

    },
    methods: {
        returnUserPosition(uid){
          try {
            return this.users.filter(a=>{
              return a['.key'] == uid
            })[0].position
          } catch (error) {
            return 'Admin'
          }
        },
        signup(){
          this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(result => {
                    console.log(result, 'result')
                    let user = this.$firebase.auth().currentUser
                    console.log(user, 'users')
                    user.sendEmailVerification()
                    .then(() => {
                      console.log('email verification send')
                    })
                    .catch(err => {
                      console.log(err, 'email verify not send')
                    })
                })
        },
        login2(){
          let self = this
          let userName = this.email + '@carmens.com'

          //check Index
          let index = this.$lodash.findIndex(this.users,a=>{
            return a.userName == userName
          })
          if(index == -1){
              this.$q.notify({
                message: `User is not authorized to access the admin dashboard!`,
                type: 'negative',
                color: 'negative',
                textColor: 'white',
                icon: 'warning',
                position: 'center'
            })         
          } else {
            this.$firebase.auth().signInWithEmailAndPassword(userName, this.password)
              .then(result => {
              console.log(result, 'result')
              self.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
                  .then(function() {
                    console.log('setPersistence!')
                    // Existing and future Auth states are now persisted in the current
                    // session only. Closing the window would clear any existing state even
                    // if a user forgets to sign out.
                    // ...
                    // New sign-in will be persisted with session persistence.
                    return self.$firebase.auth().signInWithEmailAndPassword(email, password);
                  })
                  .catch(function(error) {
                    // Handle Errors here.
                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage)
                  });
                self.$router.push('/home')
              })
              .catch(err =>{
                console.log(err, 'error')
                self.$router.push('/')
                //this.isLoading = false
              })
          }
        },
        login () {
            this.$q.loading.show({
                message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>'
              })
            console.log(this.$firebase, 'firebaseApp')
            let userName = this.email + '@carmens.com'
            console.log(userName,'userName')
            this.$firebase.auth().signInWithEmailAndPassword(userName, this.password)
            .then(result => {
             console.log(result, 'result')
            //  this.isLoading = false
             let optionss = this.$lodash.filter(this.Accounts, m => {
                            return m.accountEmailAdd == this.email    
              })
              console.log(optionss[0],'optionss')
             // code for checkinh of activated
              // if (result.user.emailVerified === true){
              if (optionss[0].activated === true){
                this.$router.push('/dashboard')
              }
              else {
                this.$q.notify('Accounts not yet Activated')
                console.log('email is not verified')
              }
            })
            .catch(err =>{
              console.log(err, 'error')
              this.$q.notify({
                    message: `Incorrect Email and Password`,
                    type: 'negative',
                    color: 'negative',
                    textColor: 'white',
                    icon: 'warning'
              })
            }) 
              // hiding in 3s
              this.timer = setTimeout(() => {
              this.$q.loading.hide()
              this.timer = void 0
              }, 2000)
        },
        showRegisterDialog (){
          this.registerDialog = true
        }
    }

}
</script>