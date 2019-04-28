import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoutes = ({
                        user,
                        component:Comp,
                        ...rest
                       }) =>{

    return <Route
        {...rest} component = {(props) =>(
        rest.login? <Comp {...props} user={user}/> :
                <Redirect to={'/sign-in'}/>
    )}
    />
}
export default PrivateRoutes;