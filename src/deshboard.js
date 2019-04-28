import React from 'react';
import db from './db.json';
const Deshboard = () =>{

    const renderTableData =()=> {
        return db.user.map((student, index) => {
            const { id, name, age,gender,email, phoneNo } = student //destructuring
            return (
                <tr key={index}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{email}</td>
                    <td>{phoneNo}</td>
                </tr>
            )
        })
    }
    const renderTableHeader =() => {
        let header = Object.keys(db.user[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
   const tablebody = () => {
        return (
            <div>
                <h1 id='title'>EmployeeList Page</h1>
                <table id='students'>
                    <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <div>
            {tablebody()};
        </div>
    )
}
export default Deshboard;
