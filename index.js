function loginmain(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id ;

    }

  } else {
    // No user is signed in.
    
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});
}


function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...

  });
     loginmain();
}


function logout(){
  firebase.auth().signOut();
  loginmain()

}


function signup_main(){
 
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";  
  document.getElementById("signup_div").style.display = "block";
}
function loginmain2(){
 
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "block";  
  document.getElementById("signup_div").style.display = "none";
}


function signup(){

  var userEmail = document.getElementById("email_field2").value;
  var userPass = document.getElementById("password_field2").value;
  // console.log(userPass);

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  .then((userCredential) => {

    // Signed in 
    document.getElementById("signup_div").style.display = "none";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id ;

    }
    // var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);

    // ..
  });
}

function findride(){
  location.href = "./indexstart.html";

}
