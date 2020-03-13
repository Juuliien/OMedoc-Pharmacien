import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { renderComponent } from 'recompose';


const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

/*const Product = props => (
  <tr>
    <td>{this.props.name}</td>
    <td>{this.props.description}</td>
    <td>{this.props.imageUrl}</td>
    <td>{this.props.property}</td>
    <td>{this.props.property}</td>
  </tr>
)*/

class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {products: []};
  }

  componentDidMount(){
    axios.get('http://localhost:5000/products/')
      .then(res => {
        this.setState({products: res.data})
      })
      .catch((error)=> {
        console.log("YTF?kneiujc");
      });
  }

  deleteProduct(id){
    axios.delete('http://localhost:5000/products/'+id)
      .then(res => console.log("Delete "+ res.data));

      this.setState({
        //retrieve all products that are not deleted
        products : this.state.products.filter(el => el._id !== _id)
      });
  }

  allProducts(){
    return this.state.products.map(currentproduct => {
      //console.log("ICIIIII")
      console.log(currentproduct)
      return (
        <tr>
          <td>{currentproduct.name}</td>
          <td>{currentproduct.description}</td>
          <td>{currentproduct.imageUrl}</td>
          <td>{currentproduct.property}</td>
        </tr>
      )
      //<Product product={currentproduct} deleteProduct={this.deleteProduct} key = {currentproduct._id}/>;
    });
  }

  render(){
    return(
        <div><tr>{this.allProducts()}</tr></div>
    )
  }
}

export default ProductCard;
