const cl = console.log;

let tableTodo = document.getElementById("table-todo")
let statusFilter = document.getElementById("statusFilter")
let todoBody = document.getElementById("todoBody")
let all = document.getElementById("all")
let completed = document.getElementById("completed")
let inComplete = document.getElementById("inComplete")

let todoUrl = `https://jsonplaceholder.typicode.com/todos`;

let TodArr = [];

const genericFun = (methodName, apiUrl) => {
    let xhr = new XMLHttpRequest();

    xhr.open(methodName, apiUrl)

    xhr.send()

    xhr.onload = function () {
        if (xhr.status >= 200 || xhr.status <= 299 && xhr.readyState === 4) {
            cl(xhr.response)

            if (methodName === "GET") {
                TodArr = JSON.parse(xhr.response)
                templating(TodArr)
            }
        }
    }
}

genericFun("GET", todoUrl)//// gets o


const templating = (arr) => {//// tempalting in table /// turner operater used in 42
    let result = ``;
    arr.forEach(ele => {
        result += `<tr>
                    <td>${ele.userId}</td>
                    <td>${ele.title}</td>
                    <td>${ele.completed ? 'Completed' : 'Incomplete'}</td>
                  </tr>
        
                   `
    });
    todoBody.innerHTML = result;//// in todobody saved
}


function filterTodos(status) {/// for all complte and in complete 
    if (status === 'all') {
       
        templating(TodArr)///asits array 
    } else {
        const filteredTodos = TodArr.filter(todo => { /// filter and return true value
            return todo.completed === (status === 'true');
        });
        templating(filteredTodos)//// remaining things (incomplete);
    
    }
}

const onChangeBtn = (eve) => {
    filterTodos(eve.target.value)// getting functions all avlues
}


statusFilter.addEventListener("change", onChangeBtn)// select given id and binded event