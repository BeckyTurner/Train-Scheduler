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

$("#add-train").on("click", function (event) {

    event.preventDefault();

    // validation for input fields
    if ($("#train-name-input").val() === "" ||
        $("#train-name-input").val() === "" ||
        $("#train-name-input").val() === "" ||
        $("#train-name-input").val() === "") {
        alert("Please fill out all input fields!");
    } else {
        // gets user input
        var trainName = $("#train-name-input").val();
        var destination = $("#destination-input").val();
        var firstTrainTime = $("#first-train-time-input").val();
        var frequency = $("#frequency-input").val();

        // creates new var for holding all new train info
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-time-input").val("");
        $("#frequency-input").val("");
    }


});

database.ref().on("child_added", function (childSnapshot) {
    console.log("Snap shot", childSnapshot.val());
})