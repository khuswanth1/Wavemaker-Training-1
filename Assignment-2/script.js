const api = 'https://randomuser.me/api/'

let dataArray;
fetch(api).then(
    response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(
        data => {
            console.log(data);
            dataArray = data.results[0];
            document.getElementById('fName').value = dataArray.name.first;
            document.getElementById('lName').value = dataArray.name.last;
            document.getElementById('eMail').value = dataArray.email;
            document.getElementById('age').value = dataArray.dob.age;
            document.getElementById('password').value = dataArray.login.password;
            document.getElementById('cpassword').value = dataArray.login.password;
            if(dataArray.gender == 'male'){
                document.getElementById('male').checked = true;
            }
            else{
                document.getElementById('female').checked = true;
            }

            document.getElementById('music').checked = true;
            document.getElementById('upLoad').src = dataArray.picture.large;
        }
    )
    
    
    

   