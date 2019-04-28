

export const loginDetail = (data = false)=>{
    return {
        type: 'Login',
        payload: data

    }
}

 export const empList = ()=>{
     return {
         type: 'DIR_LIST',
         payload:[
             {id:'1',name:'John'},
             {id:'2',name:'Rohit'}
         ]
     }
 }


