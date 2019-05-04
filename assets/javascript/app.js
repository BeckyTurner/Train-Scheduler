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

//getting the info from the form submit
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

    //calculate next train arrivals in minutes--I can't get the arrival times to display and function properly
    //get current time
    var currentTime = moment();

    //converts the time to make sure it comes earlier than current time
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    //difference between times
    var timeDifference = currentTime.diff(moment(firstTrainTimeConverted), "minutes");

    //remainding time
    var remaindingTime = timeDifference % frequency;

    //minutes until next train
    var minutesAway = frequency - remaindingTime;

    //var to figure out when next train arriecs
    var nextTrain = currentTime.add(minutesAway, "minutes");

    //calucaulting arrival time
    var arrivalTime = moment(nextTrain).format("HH:mm");

    //append new table rows when a new train is submitted to the database
    var newTableRow = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        firstTrainTime + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" +
        minutesAway + "</td></tr>";
    $("#train-table").append(newTableRow);

});