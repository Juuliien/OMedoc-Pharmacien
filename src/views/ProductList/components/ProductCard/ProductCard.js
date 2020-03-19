import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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

const Product = props => {
  const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)} margin-bottom="30px"> 
      <CardContent>
        <div className={classes.imageContainer}>
          <img alt="Product" className={classes.image} src={product.imageUrl}/>
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {product.name}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
      </CardContent>

      <Divider />

      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {product.price} €
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};



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
        console.log(error);
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

  allProducts = () => {
    console.log("allProducts");
    console.log(this.state.products);
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} key = {currentproduct._id}/>;
    })
  }

  render(){
    return(
        <div>{this.allProducts()}</div>
    )
  }
}

export default ProductCard;

