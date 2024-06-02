(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyCkrma8-C8lxKvvD9LJZY-9gQx_nus52GE",
        authDomain: "lawn-magic-a3c44.firebaseapp.com",
        projectId: "lawn-magic-a3c44",
        storageBucket: "lawn-magic-a3c44.appspot.com",
        messagingSenderId: "207655043153",
        appId: "1:207655043153:web:033a2b6d24c43f13fdb870"
    };
    firebase.initializeApp(firebaseConfig);

    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignup = document.getElementById("btnSignup");

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, password).then(user => {
            alert("Login Successful :)");
            window.location.href = "details.html"; // Redirect to details form
        }).catch(err => {
            alert(err.message);
        });
    });

    btnSignup.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;

        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password).then(user => {
            alert("Signup Successful :)");
            window.location.href = "details.html"; // Redirect to details form
        }).catch(err => {
            alert(err.message);
        });
    });
}());
