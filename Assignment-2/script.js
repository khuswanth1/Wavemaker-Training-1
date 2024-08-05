document.addEventListener('DOMContentLoaded', () => {
    const api = 'https://randomuser.me/api/';

    fetch(api).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        let dataArray = data.results[0];
        document.getElementById('fName').value = dataArray.name.first;
        document.getElementById('lName').value = dataArray.name.last;
        document.getElementById('eMail').value = dataArray.email;
        document.getElementById('age').value = dataArray.dob.age;
        document.getElementById('password').value = dataArray.login.password;
        document.getElementById('cpassword').value = dataArray.login.password;
        if (dataArray.gender == 'male') {
            document.getElementById('male').checked = true;
        } else {
            document.getElementById('female').checked = true;
        }
        document.getElementById('music').checked = true;
    }).catch(error => {
        console.error('Fetch error:', error);
    });

    document.getElementById('accountForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
            alert("Sucess");
            console.log("Data uploaded successfully", data);
        }).catch(error => {
            console.log("Error while uploading data", error);
        });
    });
});
