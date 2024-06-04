(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyCkrma8-C8lxKvvD9LJZY-9gQx_nus52GE",
        authDomain: "lawn-magic-a3c44.firebaseapp.com",
        projectId: "lawn-magic-a3c44",
        storageBucket: "lawn-magic-a3c44.appspot.com",
        messagingSenderId: "207655043153",
        appId: "1:207655043153:web:033a2b6d24c43f13fdb870"
    };
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const txtPhone = document.getElementById('txtPhone');
    const txtAddress = document.getElementById('txtAddress');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnSubmitInfo = document.getElementById('btnSubmitInfo');

    const loginForm = document.getElementById('loginForm');
    const userInfoForm = document.getElementById('userInfoForm');

    btnLogin.addEventListener('click', e => {
        e.preventDefault();
        const email = txtEmail.value;
        const pass = txtPassword.value;
        auth.signInWithEmailAndPassword(email, pass).then(userCredential => {
            const user = userCredential.user;
            // Check if user has additional information
            firestore.collection('users').doc(user.uid).get().then(docSnapshot => {
                if (docSnapshot.exists) {
                    // Redirect to dashboard or another page
                    window.location.href = 'product.html';
                } else {
                    // Show the additional info form
                    loginForm.style.display = 'none';
                    userInfoForm.style.display = 'block';
                }
            });
        }).catch(e => {
            console.error(e.message);
        });
    });

    btnSignup.addEventListener('click', e => {
        e.preventDefault();
        const email = txtEmail.value;
        const pass = txtPassword.value;
        auth.createUserWithEmailAndPassword(email, pass).then(userCredential => {
            const user = userCredential.user;
            // Show the additional info form for new user
            loginForm.style.display = 'none';
            userInfoForm.style.display = 'block';
        }).catch(e => {
            console.error(e.message);
        });
    });

    btnSubmitInfo.addEventListener('click', e => {
        e.preventDefault();
        const phone = txtPhone.value;
        const address = txtAddress.value;
        const user = auth.currentUser;
        if (user) {
            firestore.collection('users').doc(user.uid).set({
                phone: phone,
                address: address
            }).then(() => {
                // Redirect to dashboard or another page
                window.location.href = 'product.html';
            }).catch(e => {
                console.error(e.message);
            });
        }
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            firestore.collection('users').doc(user.uid).get().then(docSnapshot => {
                if (docSnapshot.exists) {
                    // Redirect to dashboard or another page
                    window.location.href = 'product.html';
                } else {
                    // Show the additional info form
                    loginForm.style.display = 'none';
                    userInfoForm.style.display = 'block';
                }
            });
        } else {
            // No user is signed in
            loginForm.style.display = 'block';
            userInfoForm.style.display = 'none';
        }
    });
})();
