import React from 'react';
import UserList from "../components/UserList";
import SearchData from '../components/SearchData';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchResponsavel, filtrarResponsavel } from '../actions/responsavel';

class UsuarioListagem extends React.Component {

    componentDidMount = async() => {
        this.props.fetchResponsavel();
    }

    buscarPorNome = async (nome) => {
        this.props.filtrarResponsavel(nome);
    }

    render(){
        return (
            <div>
                <Container fixed>
                    <SearchData
                        buscarPorNome={this.props.filtrarResponsavel}
                        fetchAll={this.props.fetchResponsavel}
                        title="Filtrar Responsavel"
                    />
                    <br />
                    <UserList data={this.props.responsaveis} />
                </Container>
            </div>
        );
    }
}

const myStateToProps = (state) =>{
    const {responsaveis} = state;
    return {responsaveis};
}

export default connect(myStateToProps, {fetchResponsavel, filtrarResponsavel})(UsuarioListagem);
