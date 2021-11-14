import MyContext from './MyContext';

class MyProvider extends Component {
    state = {
        //à compléter avec infos à partager
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    //fonctions etc
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}