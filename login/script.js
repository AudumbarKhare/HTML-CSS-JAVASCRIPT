//not all logic complate
window.onload = () => {
    const formLogin = document.querySelector('.form-login');
    const formRegistration = document.querySelector('.form-registration');

    const registrationLink = formLogin.querySelector('a.register-link');
    const loginLink = formRegistration.querySelector('a.login-link');

    registrationLink.addEventListener('click', () => {
        formLogin.style.display = 'none';
        formRegistration.style.display = 'block';
    });

    loginLink.addEventListener('click', () => {
        formLogin.style.display = 'block';
        formRegistration.style.display = 'none';
    });

    // username: "mor_2314",
    // password: "83r5^_"

    formLogin.addEventListener('submit', login);
    formRegistration.addEventListener('submit', registration);


    //login function start here
    function login(event) {
        event.preventDefault();
        //get value from login form
        var username = formLogin.querySelector('#username').value;
        var password = formLogin.querySelector('#password').value;

        // validation
        if (username.trim() == "") {
            formLogin.querySelector('#username').classList.add('error');
            return false;
        } else {
            formLogin.querySelector('#username').classList.remove('error');
        }

        if (password.trim() == "") {
            formLogin.querySelector('#password').classList.add('error');
            return false;
        } else {
            formLogin.querySelector('#password').classList.remove('error');
        }

        // send the json data for user login
        fetch('http://sahosoftweb.com/api/UserMaster/GetAll', {
            method: 'get'
        })
            .then(res => res.json())
            .then(json => console.log(json))
    }


    //Registration function starts here
    function registration(event) {
        event.preventDefault();

        //get data from registration form
        var name = formRegistration.querySelector('#name').value;
        var email = formRegistration.querySelector('#email').value;
        var password = formRegistration.querySelector('#password').value;
        if (name.trim() == "") {
            formRegistration.querySelector('#name').classList.add('error');
            return false;
        } else {
            formRegistration.querySelector('#name').classList.remove('error')
        }
        if (email.trim() == "") {
            formRegistration.querySelector('#email').classList.add('error');
            return false;
        } else {
            // call validateEmail function 
            console.log(validateEmail(email));
            if (!validateEmail(email)) {
                alert();
                formRegistration.querySelector('#email').classList.add('error');
                return false;
            } else {
                formRegistration.querySelector('#email').classList.remove('error');
            }
        }
        if (password.trim() == "") {
            formRegistration.querySelector('#password').classList.add('error');
            return false;
        } else {
            formRegistration.querySelector('#password').classList.remove('error');
        }


    }

    //to check enter email is correct or not
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}