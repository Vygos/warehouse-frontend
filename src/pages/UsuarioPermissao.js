import React from 'react';
import UserPermission from '../components/UserPermission'
import { rest } from '../authentication/tokenConfig';


class PermissaoUsuario extends React.Component{
    state = {responsavel: []}
    componentDidMount = async() => {
        this.fetchResponsavel();
    }

    buscarPorNome = async (nome) => {
        const response = await rest('').get(`responsavel/buscar-nome/${nome}`);
        this.setState({responsavel: response.data});
    }

    fetchResponsavel = async () => {
        const response = await rest('').get('responsavel')
        this.setState({responsavel: response.data})
    }


    render(){
        return(
            <div>
                <UserPermission
                    data={this.state.responsavel}
                    buscarPorNome={this.buscarPorNome}
                    fetchResponsavel={this.fetchResponsavel}
                    />
            </div>
        )
    }
}

export default PermissaoUsuario;
