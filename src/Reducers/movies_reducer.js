

export default function(state = {},action){
    switch(action.type){
        case 'Login':
            return {...state,login:action.payload}
        default:
            return state;
    }
}
