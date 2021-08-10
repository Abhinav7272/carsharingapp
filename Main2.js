//javascript.js
//set map options
var myLatLng = { lat: 20.5937, lng: 78.9629 };
var mapOptions = {
    center: myLatLng,
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + (result.routes[0].legs[0].distance.text) + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            var dist =
                //display route
                directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

function search2() {
    db.collection('ownerrider').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.data());
            const Origin = document.getElementById("from").value;
            const To = document.getElementById("to").value;
            const source = doc.data().origin;
            const dest = doc.data().destination;
            console.log(source, dest, origin, To);
            if (Origin === source && dest ===To) {
                renderUser(doc);
            }

        });
    })
}
// function adddatatodb() {
//     const Origin = document.getElementById("from").value;
//     const To = document.getElementById("to").value;
//     const Name = document.getElementById("name").value;
//     const Phone = document.getElementById("phone").value;
//     const Price = document.getElementById("price").value;
//     const Route = document.getElementById("route").value;


//     db.collection('ownerrider').add({
//         origin: Origin,
//         destination: To,
//         owner: Name,
//         phone: Phone,
//         price: Price,
//         route: Route,
//     })
//     alert("added sucessfully");
//     location.href = "./indexstart.html";

// }


const tableUsers = document.querySelector('.table-users');

// Create element and render users
const renderUser = doc => {


    const tr = `
      <tr data-id='${doc.id}'>
        <td>${doc.data().origin}</td>
        <td>${doc.data().destination}</td>
        <td>${doc.data().owner}</td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().price}</td>
        <td>${doc.data().route}</td>
        <td>
          <button class="btn btn-delete">BooK Now</button>
        </td>
      </tr>
    `;
    tableUsers.insertAdjacentHTML('beforeend', tr);


    // Click delete user
    const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click', () => {
        db.collection('ownerrider').doc(`${doc.id}`).delete().then(() => {
            alert('sucesfully booked!');
            location.href = "./indexstart.html";


        }).catch(err => {
            console.log('Error removing document', err);
        });
    });

}