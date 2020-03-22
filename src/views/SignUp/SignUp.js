import React, { Component } from 'react';
import { Row, Col, Form, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import './../Settings/Register.css';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

/*const [formState, setFormState] = useState({
  isValid: false,
  values: {},
  touched: {},
  errors: {}
});

useEffect(() => {
  const errors = validate(formState.values, schema);

  setFormState(formState => ({
    ...formState,
    isValid: errors ? false : true,
    errors: errors || {}
  }));
}, [formState.values]);
*/
/*const handleChange = event => {
  event.persist();

  setFormState(formState => ({
    ...formState,
    values: {
      ...formState.values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
    },
    touched: {
      ...formState.touched,
      [event.target.name]: true
    }
  }));
};*/

/*const handleBack = () => {
  history.goBack();
};

const handleSignUp = event => {
  event.preventDefault();
  history.push('/');
};

const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false;


const Pharmacist = props => {
  const { className, pharmacist, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}> 
      Cool
    </div>
  );
};*/



class SignUp extends Component{
  constructor(props){
      super(props);

      this.state = {
          firstname: "", 
          lastname: "", 
          email: "", 
          password: "",
          pharmacy:"", 
          connected: false,
          pharmacists:[],
          pharmacies:[],
      };
  }

  componentDidMount(){
    axios.get('http://localhost:5000/sign-up/')
      .then(res => {
        console.log(res.data)
        this.setState({pharmacists: res.data})
      })
      .catch((error)=> {
        console.log(error);
      });
      axios.get('http://localhost:5000/pharmacies/')
      .then(res => {
        console.log(res.data)
        this.setState({
          pharmacies: res.data.map(pharmacy => pharmacy.name),
          pharmacy: res.data[0].name
        })
      })
      .catch((error)=> {
        console.log(error);
      });
  }

  checkPharmacist = () => {
      //recover the tab of pharmacists

      //in the tab search if there is a person corresponding to the one that is trying to sign in
      var searchPharmacist = this.state.pharmacists.find(function(element) {
          return element.email === this.state.email;
        }, this);

      //doesn't exist, can create user
      if(this.state.lastname === "" || this.state.firstname === "" || this.state.email === ""  || this.state.password === "" || this.state.pharmacy == "Choose your pharmacy"){
          alert('Fill correctly the form');
      }
      else{
          if(searchPharmacist === undefined) {
            this.createPharmacist();
            console.log(this.state.pharmacists);
            this.setState({connected: true});
        }
        else {
            console.log("pharmacist already exists");
            this.setState({email: "", password: ""});  
            alert("This email is already taken ! Please choose another one.");
        }
      }
      
      
  }

  createPharmacist = () => {
      var pharmacist = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
          pharmacy: this.state.pharmacy,
      };
      console.log("POST");
      console.log(pharmacist);
      axios.post('http://localhost:5000/sign-up/add', pharmacist)
      .then(res => {
        //this.setState({pharmacists: res.data})
        console.log(res.data);
      })
      .catch((error)=> {
        console.log(error);
      });

     axios.get('http://localhost:5000/sign-up/')
      .then(res => {
        this.setState({pharmacists: res.data})
      })
      .catch((error)=> {
        console.log(error);
      });
      //this.state.pharmacists.push(pharmacist);
      console.log("PTN");
      console.log(this.state.pharmacists);
      
  }

  handleChangeFirstName = (event) => {
      this.setState({firstname: event.target.value});
  }

  handleChangeLastName = (event) => {
      this.setState({lastname: event.target.value});
  }

  handleChangeEmail = (event) => {
      this.setState({email: event.target.value});
  }

  handleChangePharmacy = (event) => {
    this.setState({pharmacy: event.target.value});
  }

  handleChangePassword = (event) => {
      this.setState({password: event.target.value});
  }


  render() {
    if(this.state.connected){
      return( <Redirect to="/products" />);  
    }
    else{
      return (
        <div >
            <div> 
                <h1>Sign Up</h1>  
            </div>
            <div className="SignForm">
                <Row>
                    <Col md="4" />
                    <Col md="4">
                        <Form > 
                            <FormGroup>
                                <Label for="UserFirstName">Firstname: </Label>
                                <Input value={this.state.firstname} onChange={this.handleChangeFirstName} type="text" name="text" id="UserFirstName" placeholder="Type your first name" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="UserLastName">Lastname: </Label>
                                <Input value={this.state.lastname} onChange={this.handleChangeLastName} type="text" name="text" id="UserLastName" placeholder="Type your last name" required />
                            </FormGroup>
                            <FormGroup>
                              <Label for="PharmacyName">Pharmacy: </Label>
                              <select ref="userInput" name="PharmacyName" value={this.state.pharmacy} onChange={this.handleChangePharmacy} type ="select" placeholder="Choose the brand">
                                {
                                  this.state.pharmacies.map(function(pharmacy) {
                                    return <option key={pharmacy} value={pharmacy}>{pharmacy} </option>;
                                  })
                                }
                              </select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="UserEmail">Email: </Label>
                                <Input value={this.state.email} onChange={this.handleChangeEmail} type="email" name="email" id="UserEmail" placeholder="Type your email" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="UserPassword">Password: </Label>
                                <Input value={this.state.password} onChange={this.handleChangePassword} type="password" name="password" id="UserPassword" placeholder="Type your password" required />
                            </FormGroup>
                            <Button color="success" onClick={this.checkPharmacist}>Create account</Button>
                        </Form>
                    </Col>
                    <Col md="4" />
                </Row>
            </div>
        </div>
    );
    }
  }
}

export default SignUp;