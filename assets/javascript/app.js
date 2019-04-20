// Initialize Firebase
var config = {
    apiKey: "AIzaSyDcwZRI3RQz4Sb3dDozsQVugmZQu4Ga3VE",
    authDomain: "train-scheduler-f36b1.firebaseapp.com",
    databaseURL: "https://train-scheduler-f36b1.firebaseio.com",
    projectId: "https://console.firebase.google.com/project/train-scheduler-f36b1",
    storageBucket: "train-scheduler-f36b1.appspot.com",
    messagingSenderId: "36791001763"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

    // gets user input
    var trainName = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var firstTrainTime = $("#first-train-time-input").val();
    var frequency = $("#frequency-input").val();

    // creats new var for holding all new train info
    var newTrain = {
        "trainName": trainName,
        "destination": destination,
        "firstTrainTime": firstTrainTime,
        "frequency": frequency
    };
    console.log(newTrain);
    database.ref("/").push(newTrain);
})