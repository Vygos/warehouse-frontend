import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TablePageable from '../../components/TablePageable';
import Modal from '../../components/Modal';
import ProductEdit from './ProductEdit';

import { connect } from 'react-redux';
import { productList, productDelete, productEdit, productSearch } from '../../actions/product';
import { Container, Grid } from '@material-ui/core';
import { rest } from '../../authentication/tokenConfig';
import { TextField } from '@material-ui/core';
import { reduxForm, reset } from 'redux-form';
import SearchData from '../../components/SearchData';

import '../../css/Lista.css';


class ProductList extends React.Component{


    onChangePage = (event,page) =>{
        this.props.productList(page, { noProduto: null });
    }

    state = {
        openModal: false,
        item: null,
        idEmpresa: null,
        opcoesPaginacao: {
            rowsPerPageOptions: [5, 10, 15],
            count: 0,
            onChangePage: this.onChangePage
        }
    }

    async componentDidMount(){
        await this.fetchIdEmpresa()
        this.fetchAllProducts();
    }

    componentDidUpdate(props,state){
        if(state.opcoesPaginacao === this.state.opcoesPaginacao){
            this.setState({
                opcoesPaginacao: {
                    rowsPerPageOptions: [5, 10, 15],
                    count: this.props.allProducts.totalElements,
                    onChangePage: this.onChangePage
                }
            })
        }
    }


    fetchIdEmpresa = async () =>{
        await rest('').get('/responsavel/logado').then(response => {
            this.setState({idEmpresa: response.data.empresa.idEmpresa })
        });
    }

    fetchAllProducts = () =>{
        this.props.productList(0, {noProduto: null});
    }

    fetchSearch = (page,nome) =>{
        this.props.productSearch(page,nome)
    }

    colunas = [
        {
            tittle: "Nome",
            atributo: "noProduto"
        },
        {
            tittle: "Fabricante",
            atributo: "fabricante"
        },
        {
            tittle: "Qtde em Estoque",
            atributo: "qtdeProduto"
        },
        {
            tittle: "Cod. Produto",
            atributo: "codigoProduto"
        },
        {
            tittle: "Setor",
            atributo: "setor.dsSetor"
        }

    ];

    actions = [
        {
            tittle: 'Editar',
            icon: 'create',
            callback: (item) => this.setState({ openModal: true, item})
        },
        {
           tittle: 'Excluir',
           icon: 'delete_forever',
           callback: (item) => {
                this.props.productDelete(item.idProduto)
           }

        }
    ]

    closeModal = (openModal) =>{
        this.setState({ openModal });
    }

    renderModal(){
        const { openModal, item } = this.state;
        if(openModal){
           return (
              <Modal title="Editar" open={openModal} onClose={this.closeModal}>
                    <ProductEdit product={item}/>
              </Modal>
           );

        }
     }

     renderFieldInput = ({
        input,
        placeholder,
        label,
        type,
        ...custom
    }) => {
        return (
          <>
          <TextField
            required
            placeholder="Buscar Produto..."
            {...input}
            {...custom}

          />
          </>
        );
    }

    render(){
       return (
        <Container fixed >
            <Box boxShadow={3} id="container" pt={3} pb={4}>
                <Container>
                    <Typography variant="h6" gutterBottom>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                        <SearchData
                            title="Estoque"
                            fetchAll={this.fetchAllProducts}
                            buscarPorNome={this.fetchSearch}
                        />
                        </Grid>
                    </Grid>

                    </Typography>

                    <Box boxShadow={5}>
                        <TablePageable
                            data={this.props.allProducts.content}
                            columns={this.colunas}
                            actions={this.actions}
                            opcoesPaginacao={this.state.opcoesPaginacao}/>
                        {this.renderModal()}
                    </Box>
                </Container>
            </Box>
        </Container>
       );
    }
}

const mapStateToProps = (state) =>{
    return { allProducts: state.products };
}

const afterSubmitSuccess = (result, dispatch) => (dispatch(reset('searchForm')));


export default reduxForm({
    form:"searchForm",
    onSubmitSuccess: afterSubmitSuccess,
    enableReinitialize :true
})(connect(mapStateToProps,
    {
        productList,
        productDelete,
        productEdit,
        productSearch
    })(ProductList));
