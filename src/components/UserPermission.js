import React from 'react';
import { Container, Box, TextField, Grid, Button, Icon } from '@material-ui/core';
import TablePageable from './TablePageable';
import '../css/UserPermission.css';
import history from '../history';
import { rest } from '../authentication/tokenConfig';

class UserPermission extends React.Component{

    state = {nome: ""};

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

    limparForm(){
        this.setState({nome: ""})
        this.props.fetchResponsavel();
    }


    render(){
        return(
            <div>
                <Container fixed >
                    <Box boxShadow={3} p={3}>
                        <Container>
                            <Box>
                                <div style={{margin: '50px'}}>
                                    <h2>Filtrar Responsaveis</h2>
                                    <Grid>
                                        <TextField
                                            name="Nome"
                                            label="Nome"
                                            variant="outlined"
                                            value={this.state.nome}
                                            onChange={(event)=> this.setState({nome: event.target.value})}
                                            fullWidth
                                            />
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" >
                                        <div className="button">
                                            <Button variant="contained" color="secondary" onClick={() => this.limparForm()}>
                                                <Icon>highlight_off</Icon>
                                                Limpar
                                            </Button>
                                        </div>
                                        <div className="button">
                                            <Button variant="contained" color="primary" onClick={() => this.props.buscarPorNome(this.state.nome)}>
                                                <Icon>search</Icon>
                                                Pesquisar
                                            </Button>
                                        </div>
                                    </Grid>
                                </div>
                            </Box>
                        </Container>
                    </Box>

                <div className="table">
                    <TablePageable columns={this.colunas} data={this.props.data} actions={this.actions} />
                </div>
                </Container>
            </div>
        )
    }
}

export default UserPermission;
