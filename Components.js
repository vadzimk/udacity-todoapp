
const List=(props)=>{
    return(
        <ul>
            {props.items.map((item)=>(
                <li key={item.id}>
                    <span>
                        {item.name}
                    </span>
                </li>
            ))}
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
                <List items={this.props.todos}
                />
            </div>
        );
    }
}

class Goals extends React.Component{
    addItem=(e)=>{
        e.preventDefault();
        const name = this.input.value;
        this.input.value = "";
        this.props.store.dispatch(addGoalAction(
            {
                id: generateId(),
                name,
            }
        ))};
    render(){
        return (
            <div>
                <h4>Goals</h4>
                <input
                type="text"
                placeholder="Add goal"
                ref={input=>this.input=input}
                />
                <button onClick={this.addItem}>Add goal</button>
                <List items={this.props.goals}/>
            </div>
        );
    }
}


class App extends React.Component{
    componentDidMount(){
        const {store} = this.props;
        store.subscribe(()=>this.forceUpdate()); //rerender the App component and all its childern after the component mounts
    }

    render(){
        const {todos, goals} = this.props.store.getState();

        return(
            <div>
                <Todos todos={todos} store={this.props.store}/>
                <Goals goals={goals} store={this.props.store}/>
            </div>
        );
    }
}

ReactDOM.render(<App store={store}/>, document.getElementById("app"));