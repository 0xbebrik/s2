self.addEventListener("push", function (event) {
    console.log("Push received:", event.data.text());

    const title = "SOVA";
    const options = {
        body: event.data.text(),
        icon: "images/icon-192.png",
        badge: "images/badge.png"
    };
    event.waitUntil(self.registration.showNotification(title, options));
});