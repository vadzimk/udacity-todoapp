console.log("connected");

// // Library code - removed after importing redux in the index.html
// //returns store
// const createStore =(reducer)=>{
//     //1 the state
//     //2 get state
//     //3 listen changes on the state
//     //4 update state
//
//     let state;
//     let listeners = [];
//
//     const getState =()=>state;
//     const subscribe =(listener)=>{
//         listeners.push(listener);
//
//         return ()=>{
//             listeners.filter((l)=>l!==listener);
//         };
//     };
//
//     const dispatch =(action)=>{
//         state = reducer(state, action);
//         listeners.forEach((listener)=>listener());
//     };
//
//     return {
//         getState,
//         subscribe,
//         dispatch
//     };
// //now store will have 3 methods on it: getState, subscribe, dispatch
// };

const {createStore, combineReducers} = Redux;


// App code
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";


//action creator - returns an action object
const addTodoAction =(todo)=>{
    return {
        type: ADD_TODO,
        todo,
    };
};

const removeTodoAction =(id)=>{
    return {
        type: REMOVE_TODO,
        id,
    };
};

const toggleTodoAction =(id)=>{
    return {
        type: TOGGLE_TODO,
        id,
    };
};

const addGoalAction=(goal)=>{
    return {
        type: ADD_GOAL,
        goal,
    };
};


const removeGoalAction =(id)=>{
    return {
        type: "REMOVE_GOAL",
        id,
    };
};
//reducer
const todos =(state=[], action)=>{
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.todo]; //returns a new state
            //array.concat(array2) returns a new array
        case REMOVE_TODO:
            return  state.filter(todo=>todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map(todo=>{
                if (todo.id===action.id){
                   return Object.assign({}, todo, {complete: !todo.complete});
                } else {
                    return todo;
                }
            });
        default:
            return state;
    }


};

//reducer
const goals =(state=[], action)=>{
    switch(action.type){
        case "ADD_GOAL":
            return [...state, action.goal];
        case "REMOVE_GOAL":
            return state.filter(goal=>goal.id!==action.id);
        default:
             return state;
    }
};

//root reducer
// const app=(state={}, action)=>{
//     //returns new state
//     //now we want to have our state to be an object with 2 properties on it
//     return {
//         todos: todos(state.todos, action), //a reducer function that handles its part of state
//         goals: goals(state.goals, action),
//     };
// };

//Bulit in Redux
const app = combineReducers(
    {
        todos,
        goals
    }
);

const store = createStore(app);

// store.dispatch({
//     type: "ADD_TODO",
//     todo: {
//         id:0,
//         name:"learn redux",
//         completed: false
//     }
// });
//
// store.dispatch(addTodoAction({
//     id:0,
//     name:"learn redux",
//     completed: false
// }));



store.subscribe(()=>{
    const {goals, todos}=store.getState();
    document.getElementById("goals").innerHTML = "";
    document.getElementById("todos").innerHTML = "";
    goals.forEach(addGoalToDOM);
    todos.forEach(addTodoToDOM);
    console.log(store.getState());
});

function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

//DOM code
const addTodo=()=>{
    const input = document.getElementById("todo");
    const name = input.value;
    input.value = '';
    store.dispatch(addTodoAction({
        name,
        complete: false,
        id:generateId()
    }));
};
const addGoal=()=>{
    const input = document.getElementById("goal");
    const name = input.value;
    input.value = '';
    store.dispatch(addGoalAction({
        id:generateId(),
        name
    }));
};

document.getElementById("todoBtn").addEventListener('click', addTodo);
document.getElementById("goalBtn").addEventListener('click', addGoal);


function createRemoveButton(onClick){
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", onClick);
    return removeBtn;
}

const addTodoToDOM =(todo)=>{
    const node = document.createElement("li");
    const text = document.createTextNode(todo.name);

    const removeBtn = createRemoveButton(()=>{
        store.dispatch(removeTodoAction(todo.id));
    });

    node.appendChild(text);
    node.appendChild(removeBtn);

    document.getElementById("todos").appendChild(node);
    node.style.textDecoration = todo.complete===true?"line-through":"none";
    node.addEventListener("click", ()=>{
        store.dispatch(toggleTodoAction(todo.id));
    });
};
const addGoalToDOM =(goal)=>{
    const node = document.createElement("li");
    const text = document.createTextNode(goal.name);

    const removeBtn = createRemoveButton(()=>{
        store.dispatch(removeGoalAction(goal.id));
    });

    node.appendChild(text);
    node.appendChild(removeBtn);
    document.getElementById("goals").appendChild(node);
};