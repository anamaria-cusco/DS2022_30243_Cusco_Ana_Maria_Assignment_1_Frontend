import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DeviceService from '../../services/device.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


function AddEditForm(props) {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const[form, setValues] = useState({
    id: 0,
    description: '',
    max_consumption: '',
    address: ''
  })
  
  const required = (value) => {
    if (!value) {
      return (
        <div className="invalid-feedback d-block">
          This field is required!
        </div>
      );
    }
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = (e) => {
    e.preventDefault();
    
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    
    if (checkBtn.current.context._errors.length === 0) {
        DeviceService.addDevice(id, props.item).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        )
        .then(item => {
            if(Array.isArray(item)) {
              props.addItemToState(item[0])
              props.toggle()
            } else {
              console.log('failure')
            }
          });
    }
}


  const submitFormEdit = e => {
    e.preventDefault();
    
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        DeviceService.addDevice(id, props.item).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        )
        .then(item => {
            if(Array.isArray(item)) {
              props.updateState(item[0])
              props.toggle()
            } else {
              console.log('failure')
            }
          });
  
  }

  useEffect(() => {
    if(props.item){
      const { id, description, max_consumption, address } = props.item
      setValues({ id, description,max_consumption, address})
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="first" id="first" onChange={onChange} value={form.first === null ? '' : form.first} />
      </FormGroup>
      <FormGroup>
        <Label for="last">Last Name</Label>
        <Input type="text" name="last" id="last" onChange={onChange} value={form.last === null ? '' : form.last}  />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email}  />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="text" name="phone" id="phone" onChange={onChange} value={form.phone === null ? '' : form.phone}  placeholder="ex. 555-555-5555" />
      </FormGroup>
      <FormGroup>
        <Label for="location">Location</Label>
        <Input type="text" name="location" id="location" onChange={onChange} value={form.location === null ? '' : form.location}  placeholder="City, State" />
      </FormGroup>
      <FormGroup>
        <Label for="hobby">Hobby</Label>
        <Input type="text" name="hobby" id="hobby" onChange={onChange} value={form.hobby}  />
      </FormGroup>
      <Button>Submit</Button>
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  )
};


export default AddEditForm;