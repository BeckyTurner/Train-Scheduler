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
        $("#destination-input").val() === "" ||
        $("#first-train-time-input").val() === "" ||
        $("#frequency-input").val() === "") {
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

        // clear input fields
        $(".form-control").val("");
    }
});

database.ref().on("child_added", function (childSnapshot) {
    console.log("Snap shot", childSnapshot.val());

    // store into a variable
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    var currentTime = moment();
    firstTrainTime = moment(firstTrainTime, "HH mm");

    if (currentTime < firstTrainTime) {
        var arrivalTime = moment(firstTrainTime).format("HH:mm");
        var nextTrain = moment.duration(firstTrainTime.diff(currentTime));
        var nextTrain = Math.round(nextTrain.asMinutes());
    } else {
        var nextTrain = moment.duration(currentTime.diff(firstTrainTime));
        var nextTrain= Math.round(nextTrain.asMinutes());
        var nextTrain = frequency - (nextTrain%frequency);
        var arrivalTime = moment().add(nextTrain, "minutes").format("HH:mm");
    }
    //append new table rows when a new train is submitted to the database
    var newTableRow = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        firstTrainTime + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" +
        nextTrain + "</td></tr>";
    $("#train-table").append(newTableRow);

});