<template>
    <q-page>
        <div>
            <div class="row q-gutter-md">
            <q-space />
            <div class="row items-center q-pa-sm" style="padding-left:120px">
            <q-input dense style="width:400px" rounded standout="bg-white text-grey-8" clearable input-class="text-pink-6" v-model="search" label="Search" color="pink-3"/>
            </div>
            <div class="row items-center">
            <q-btn-dropdown dense label="filter by" flat color="grey-8">
                <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Photos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Videos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Articles</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
                </q-btn-dropdown>
                </div>
                </div>          
        </div>
    </q-page>
</template>