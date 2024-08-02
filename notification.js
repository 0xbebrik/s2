const webpush = require('web-push');

const VAPID = {
    publicKey: "BFNR9RQ7tcWMQxUOsChorckfUT3ghkctLEalE7tbBTyFD-zC20WjVXVb-3_H7GKIVKRLJ6itQ-3fQpBnRBzAySg",
    privateKey: "GYcMgxxyH_Hghz5z60KqibjZaO6iPNR3Hzt0fcXK2dw"
}

webpush.setVapidDetails(
    "mailto: antoshienok08@gmail.com",
    VAPID.publicKey,
    VAPID.privateKey
)

subscribe = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cK2PaQi59PM:APA91bFEsNGO76WdtGYg7DIAWXcHHV8aiFD8qPQrfe8C8xMlCEr7Et7xwvW8wj2o5Mc_D0hwKvKkNUcJq1EbR7Wtf32KLiH0XsU4mlEuPkni2FtcZyuKdvCam27MLLUJHt6Ias5zoLL_",
    "expirationTime": null,
    "keys": {
        "p256dh": "BP4kNprcb4qN5Uuau3_JzP2TCF63I1e39ktc2ETxDBJAkRUuWBfz0GnHgd5tYfow9zt1B0oymdkM_PPg-kL1TF8",
        "auth": "_0P6dRomSOnh-qthyTdrSQ"
    }
}

function sendNotification(subscription, payload) {
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err))
}

sendNotification(subscribe, 'test')