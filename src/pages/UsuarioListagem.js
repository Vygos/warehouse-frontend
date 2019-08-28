import React from 'react';
import UserList from "../components/UserList";
import SearchData from '../components/SearchData';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchResponsavel, filtrarResponsavel } from '../actions/responsavel';

class UsuarioListagem extends React.Component {

    onChangePage = (event, page) => {
        this.props.fetchResponsavel(page, {});
    }

    state = {
        totalElements: 0,
        opcoesPaginacao: {
            rowsPerPageOptions: [5, 10, 15],
            count: 0,
            onChangePage: this.onChangePage
        }
    }


    componentDidMount = () => {
        this.props.fetchResponsavel(0,{noResponsavel: null});
    }

    componentDidUpdate = (props,state) =>{
        if(this.state.opcoesPaginacao === state.opcoesPaginacao){
            this.setState({
                opcoesPaginacao: {
                    rowsPerPageOptions: [5, 10, 15],
                    count: this.props.responsaveis.totalElements,
                    onChangePage: this.onChangePage
                }
            })
        }
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
                    <UserList data={this.props.responsaveis.content} opcoesPaginacao={this.state.opcoesPaginacao}/>
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
