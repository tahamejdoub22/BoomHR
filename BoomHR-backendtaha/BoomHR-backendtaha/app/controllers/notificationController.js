const axios = require("axios");





  function sendNotification(title, body) {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const data = {
    to:"fKTuUtBkS-m7wdPL5upPMd:APA91bEhtEZSUDInGoql-VIrlSvVvYOfnYnEPzlvQ9EtJdCaUt5sNtbCgg1shnXln9rBfT-uDNAoq77K3GH5h-rLY99j_j4BJDlImiRgNa5fqLO-bfGXJpMFMGhNrxfyRMk3FO9xvv2",
    notification: {
      body: body,
      title: title
    }
  };
  
  const config = {
    headers: {
      Authorization: 'key=AAAAIKjFLJw:APA91bEZKQ1BuKsWzBStK2KazpJbrbFxPG-S0TGRa5StjGzavhMWHS-zd1uF_N8o_XqnSaZ9-NyLf5lFkysBZvp-9O4mmwDpHLYWCFZ3VHXdu7L39d0_rcsnKCuYZ145fVf9wxuZci0k',
      'Content-Type': 'application/json'
    }
  };
  
  axios.post(url, data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendNotification;