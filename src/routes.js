import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from './signin/signin';
import Deshboard from './deshboard';
import PublicRoutes from './signin/publicRoutes';
import PrivatRoutes from './signin/privateRoutes';

import {connect } from 'react-redux';
import { loginDetail } from './actions'
import { bindActionCreators} from 'redux';

 class Routes extends Component {

     componentWillMount(){
         this.props.loginDetail(false);
     }
     render() {
         let data = this.props.data;
         return (
             <Switch>
                 <PublicRoutes {...data}  restricted={false} path="/sign-in" exact component={SignIn}/>
                 <PrivatRoutes {...data}  path="/" exact component={Deshboard}/>
             </Switch>
         );
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);