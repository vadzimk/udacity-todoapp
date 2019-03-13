
const List=(props)=>{
    return(
        <ul>
            <li>List</li>
        </ul>
    );
};

class Todos extends React.Component{
    render(){
        return (
            <div>
                todos
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
                <Todos/>
                <Goals/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));