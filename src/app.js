import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import {connect } from 'react-redux';
import { loginDetail } from './actions'
import { bindActionCreators} from 'redux';



import  json from './db.json';

class App extends Component {

    componentWillMount(){
        this.props.loginDetail();
    }

    renderMovies =(movies) =>(
        movies?
        movies.map((movie, i) =>(
            <div key={i}>{movie.name}</div>
        )): null
    )
    render(){
        console.log(json);
        return(
        <div>

            {this.renderMovies(json.user)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        data: state.login
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        loginDetail
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);