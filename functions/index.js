const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();
const db = admin.firestore();
exports.newNotification = functions.firestore.document('{collection}/{id}').onCreate((snap, context) =>{
    const newData = snap.data();


    if(newData) {

        const collection = context.params.collection
        const id = context.params.id
        const adminNotifs = db.collection('AdminNotifications')
        const clientNotifs = db.collection('ClientNotifications')
        const today  = new Date().toString()

        if(collection === 'Reservation'){
            return adminNotifs.add({userID: newData.clientUID ?  newData.clientUID : '',clientName: newData.clientFName+' '+newData.clientLName,message: 'New Event Reservation for '+  newData.clientFName+' '+newData.clientLName,dateTime: today})
        } else if(collection === 'partyTrayOrders'){
            return adminNotifs.add({userID: newData.accountUID ?  newData.accountUID : '',clientName: newData.clientName,message: 'New Party Tray Order from '+  newData.clientName,dateTime: today})
        } else if(collection === 'EventStatus'){
            return clientNotifs.add({reservationKey: newData.reservationKey,dateTime: newData.dateTime,status:newData.status})
        } else {
            return null
        }

    } else {
        return null
    }
    
});

exports.sendNotification = functions.firestore.document('ClientNotifications/{id}').onCreate((snap, context) =>{
    // if(event.data.previous.val()){
    //     return;
    // }
    // console.log(event)
    const NOTIFICATION_SNAPSHOT = snap.data();
    // console.info(NOTIFICATION_SNAPSHOT.val())
    const payload = {
        notification: {
            title: NOTIFICATION_SNAPSHOT.status,
            body: '1 new notification',
        }
    }

    console.info(payload);

    return admin.database().ref('/CustomerToken').once('value').then((data) => {
        if(!data.val()) return;

        const snapshot = data.val();
        const tokens = [];

        for(let key in snapshot) {
            tokens.push(snapshot[key].token);
        }

        return admin.messaging().sendToDevice(tokens,payload);

    });

});