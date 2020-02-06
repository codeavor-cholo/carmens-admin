<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-white" bordered style="border: 1px solid;border-color: pink;">
      <q-toolbar>
        <q-btn color="pink-3" flat dense round @click="drawer = !drawer" icon="menu" elevated aria-label="Menu"/>
        <q-toolbar-title class="text-pink-3">
          <img style="height:80%;width:130px" src="statics/pics/carmen-logo.png" @click="$router.push('/')">Carmen's Diner and Catering Services
        </q-toolbar-title>
      </q-toolbar>
      <div class="fixed-right q-pt-sm">
            <div>
                <q-btn flat color="pink-3" icon="mdi-settings">
                  <q-menu>
                    <div class="row no-wrap q-pa-md">
                      <div class="column items-center">
                        <!-- <div class="text-subtitle1 q-mt-md q-mb-xs">{{email}}</div> -->
                        <q-btn color="pink" label="Logout" @click="logout" push size="sm" v-close-popup/>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
            </div>
          </div>
    </q-header>
    <q-drawer
        v-model="drawer"
        overlay
        show-if-above
        :width="280"
        :breakpoint="400"
        class="text-pink-3"
        style="overflow: hidden;"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding style="background-color: white; height: 500px;">
            <q-item clickable @click="$router.push('/walkin')">
              <q-item-section avatar>
                <q-icon name="mdi-walk" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Walk-In</q-item-label>
              </q-item-section>
            </q-item>
            
            <q-item clickable :to="{ name: 'dashboard' }">
              <q-item-section avatar>
                <q-icon name="mdi-view-dashboard" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
            </q-item>


            <q-expansion-item
              expand-separator
              icon="mdi-settings-outline"
              label="File Management"
              default-opened
            >
                  <q-item clickable :to="{ name: 'foodmanage' }">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon name="fastfood" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Food Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'package' }">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon name="assignment" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Package Management</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'otherManage' }">
                    <q-item-section avatar class="q-pl-xl">
                      <q-icon name="mdi-table-chair" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Other Management</q-item-label>
                    </q-item-section>
                  </q-item>

            </q-expansion-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px;" >
          <div class="absolute-bottom bg-transparent" >
            <q-avatar color="pink-3" size="56px" class="q-my-sm" text-color="white" style="filter: none;">{{userEmail.charAt(0).toUpperCase()}}</q-avatar>
            <!-- <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar> -->
            <!-- <div class="text-weight-bold">STYX SALCEDO</div> -->
            <div>{{userEmail}}</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container style="background-color: #F5F2F2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import firebase from 'firebase'
import { date } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
            drawer: false,
            userEmail: ''
      }
  },
  created() {
          let self = this
          this.$firebase.auth().onAuthStateChanged(function(user) {
              
              if (user) {
                let gg = {...user}
                console.log('createdUser',user)
                console.log('createdUser',user.email)
                self.userEmail = gg.email
                
              } else {
                  // No user is signed in.
                  self.$router.push('/')
              }
          })
  },
  methods: {
    logout(){
      this.$q.dialog({
                title: `Are you sure you want to logout?`,
                type: 'negative',
                color: 'negative',
                textColor: 'white',
                icon: 'warning',
                ok: 'Ok',
                cancel: 'Cancel'
                
            }).onOk(()=>{
                    this.$q.loading.show({
                  message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>'
                  })
                  this.timer = setTimeout(() => {
                  this.$q.loading.hide()
                  this.timer = void 0
                  }, 2000)  
                  // hiding in 3s  
                    this.$firebase.auth().signOut()
                    .then(() => {
                    this.$router.push('/')
                  })
            })
            
    }
  },
}
</script>
<style type = "text/css">
        .listwidth {
            width: 200px;
          }
      
</style>
