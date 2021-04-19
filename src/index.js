
document.getElementById('dog-form').addEventListener('submit', function (error) {
    error.preventDefault();
    updateDog();
})

function updateDog() {
    
    let dog = {
        id : document.getElementById('id').value,
        name : document.getElementById('name').value,
        breed : document.getElementById('breed').value,
        sex : document.getElementById('sex').value
    };
    let url =`http://localhost:3000/dogs/${dog.id}`;
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(response => response.json())
    .then()
    .catch(function(error){
        console.log(eooro.message);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadDogs();
})

function loadDogs() {
    let url = `http://localhost:3000/dogs`;
    fetch (url)
        .then(response => response.json())
        .then(function(result){
            document.getElementById('table-body').innerHTML = '';
            result.forEach(element => {
                render(element);
            });
        })
        .catch(function(error) {
            console.log(error.message);
        })
}

function render(item) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    tdName.textContent = item.name;
    let tdBreed = document.createElement('td');
    tdBreed.textContent = item.breed;
    let tdSex = document.createElement('td');
    tdSex.textContent = item.sex;
    let tdBtn = document.createElement('td');
    tdBtn.appendChild(btnEditDog(item));

    tr.appendChild(tdName);
    tr.appendChild(tdBreed);
    tr.appendChild(tdSex);
    tr.appendChild(tdBtn);

    document.getElementById('table-body').appendChild(tr);
}

function btnEditDog(item) {
    let btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'Edit Dog';
    btn.addEventListener('click', function(error) {
        error.preventDefault();
        activeForm(item);
    })
    return btn;
}

function activeForm(item) {
    document.getElementById('id').value = item.id;
    document.getElementById('name').value = item.name;
    document.getElementById('breed').value = item.breed;
    document.getElementById('sex').value = item.sex;
}