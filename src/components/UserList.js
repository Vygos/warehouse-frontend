import React from 'react';
import TablePageable from './TablePageable';
import history from '../history';

import '../css/UserList.css';
class UserList extends React.Component{

    colunas = [
        {
            tittle: "Nome",
            atributo: "noResponsavel"
        },
        {
            tittle: "Email",
            atributo: "email"
        },
        {
            tittle: "Data de Nascimento",
            atributo: "dataNascimento"
        }
    ]

    actions= [
        {
            tittle: 'Gerenciar Permissões',
            icon: 'https',
            callback: (item,index)=> history.push(`/user/permission/edit/${item.idResponsavel}`)
        },
        {
            tittle: 'Editar Usuario',
            icon: 'create',
            callback: ()=> console.log("chamando action Editar")
        }
    ]


    render(){
        return(
            <div>
                <div className="table">
                    <TablePageable columns={this.colunas} data={this.props.data} actions={this.actions} />
                </div>
            </div>
        )
    }
}

export default UserList;
