import React from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import { TextField } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core';
import {rest} from '../authentication/tokenConfig'

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(0,1,5,5),
        width: 300,
    },
    cardInsert:{
        padding:'20px 20px',
        marginBottom: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14)'+
                    '0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width:'10px'
    },
    content: {    
        marginTop: '20px',   
      },
      title: {
        height: '28px',
        lineHeight: '30px',
        fontSize: '15px'
      },
});

class ProductForm extends React.Component{
    state = { setor: [] }
    componentDidMount(){
        rest("").get("/setor").then(response => {
            this.setState({setor: response.data});
        })
    }

    tableProductAddButton(){ 
        if(this.props.action === 'add'){
            return (
                <Button variant="contained" color="default" style={{marginRight:"10px"}}>
                    <AddIcon style={{marginRigth:"5px"}}/>
                    Produtos
                </Button>
            );
        }     
    }

    renderSelectInput = ({
        input,
        placeholder,
        label,
        name,
        children,
    }) => {
        return (
            <>
              <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
              <Select
                {...input}
                inputProps={{
                    name,
                    id: 'age-native-simple'
                }}
                placeholder={placeholder}
               >
                   {children}
               </Select>    
               
            </>    
        );
    }


    renderFieldInput = ({
        input,
        label,
        placeholder,
        className,
        type,
    }) => {
        return (
          <TextField 
            label={label}
            required
            type={type}
            placeholder={placeholder}
            className={className}
            {...input}   
          />
          
        );
    }

    render(){
        const { classes } = this.props;
        return (
            <Container fixed>
            <Box boxShadow={3} className={classes.content}>
                <h2 style={{ marginLeft: '28px' }}>{this.props.title}</h2>
                <Container> 
                    <Grid container>
                        <form className={classes.form} autoComplete="off" noValidate>
                            <Grid item className={classes.cardInsert} xs={12} >                
                                    <Field 
                                        name="marca" 
                                        label="Marca" 
                                        component={this.renderFieldInput} 
                                        placeholder="Marca do Produto" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="fabricante" 
                                        label="Fabricante" 
                                        component={this.renderFieldInput} 
                                        placeholder="Fabricante" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="tipo" 
                                        label="Tipo de Produto" 
                                        component={this.renderFieldInput} 
                                        placeholder="Tipo de Produto" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="qtde_produto" 
                                        label="Qtde em Estoque"  
                                        type="number"
                                        component={this.renderFieldInput} 
                                        placeholder="Qtde em estoque" 
                                        className={classes.textField}
                                    />
                                    <Field 
                                        name="cod_produto" 
                                        label="Cod. Produto"  
                                        type="text"
                                        component={this.renderFieldInput} 
                                        placeholder="Código do Produto" 
                                        className={classes.textField}
                                    />
                                    <FormControl className={classes.textField}>
                                        <Field
                                            name="setor"
                                            label="Setor"
                                            component={this.renderSelectInput}
                                            placeholder="Setor do Produto"
                                            className={classes.selectEmpty}
                                        >
                                            {this.state.setor.map((s) =>{
                                                return  <MenuItem value={{s}} key={s.idSetor}>{s.dsSetor}</MenuItem>
                                            })}
                                        </Field>
                                    </FormControl>
                                    
                            </Grid>
                            <Box>
                                {this.tableProductAddButton()}
                                <Button type="submit" variant="contained" color="primary" >
                                    Salvar
                                    <Icon style={{marginLeft: '5px'}}>send</Icon>
                                </Button>
                                <Button variant="contained" color="secondary" style={{margin: '10px'}}>
                                        Sair
                                        <CloseIcon/>
                                </Button>
                            </Box>    
                        </form>       
                </Grid>
               </Container>
            </Box> 
            </Container>
        );
    }    

}


export default reduxForm({
    form: 'productForm'
})(withStyles(styles)(ProductForm))