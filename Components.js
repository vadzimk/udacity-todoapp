
const List=(props)=>{
    return(
        <ul>
            <li>List</li>
        </ul>
    );
};

class Todos extends React.Component{
    addItem=(e)=>{
        e.preventDefault();
        const name = this.input.value;
        this.input.value = "";

        this.props.store.dispatch(addTodoAction(
            {
                name,
                complete: false,
                id: generateId(),
            }
        ));
    };
    render(){
        /*set the property of the class instance to input that gets the value of the dome element */
        return (
            <div>
                <h4>Todo List</h4>
                <input type="text"
                placeholder="Add todo"
                ref={input=>this.input=input} />
                <button onClick={this.addItem}>Add todo</button>
                <List/>
            </div>
        );
    }
}

class Goals extends React.Component{
    render(){
        return (
            <div>
                goals
                <List/>
            </div>
        );
    }
}


class App extends React.Component{
    render(){
        return(
            <div>
                <Todos store={this.props.store}/>
                <Goals/>
            </div>
        );
    }
}

ReactDOM.render(<App store={store}/>, document.getElementById("app"));