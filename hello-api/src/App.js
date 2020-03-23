import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataApi: [],
      edit: false,
      dataPost: {
        id: 0,
        title: '',
        body: ''
      }
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  reloadData() {
    axios.get('http://localhost:3002/posts').then(res => {
      this.setState({
        dataApi: res.data,
        edit: false
      })
    });
  }

  handleRemove(e) {
    console.log(e.target.value)
    fetch(`http://localhost:3002/posts/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.reloadData());

  }

  inputChange(e) {
    let newdataPost = { ...this.state.dataPost };
    if(this.state.edit===false){
      newdataPost['id'] = new Date().getTime();
    }
    newdataPost[e.target.name] = e.target.value;

    this.setState({
      dataPost: newdataPost
    },
      () => console.log(this.state.dataPost))
  }

  clearData = () => {
    let newdataPost = { ...this.state.dataPost };

    newdataPost['id'] = "";
    newdataPost['body'] = "";
    newdataPost['title'] = "";

    this.setState({
      dataPost: newdataPost
    });
  }

  onSubmitForm() {
    if (this.state.edit === false) {
      axios
        .post(`http://localhost:3002/posts`, this.state.dataPost).then(() => { 
          this.reloadData();
          this.clearData();
        });


    } else {
      axios.put(`http://localhost:3002/posts/${this.state.dataPost.id}`, this.state.dataPost).then(() => {
        this.reloadData();
        this.clearData();

      })
    }

  }


  getDataId = (e) => {
    axios
      .get(`http://localhost:3002/posts/${e.target.value}`)
      .then(res => {
        this.setState({
          dataPost: res.data,
          edit: true
        })
      });
  }

  componentDidMount() {
    // metode menggunakan fetch
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi: res
    //     })
    //   })
    //metode menggunakan axios yang di install axios
    this.reloadData();
  }
  render() {
    return (
      <div>
        <h1>halo api</h1>
        <input
          type="text"
          name='body'
          value={this.state.dataPost.body}
          placeholder="Masukan body"
          onChange={this.inputChange}
        />
        <input
          type="text"
          name='title'
          value={this.state.dataPost.title}
          placeholder="Masukan title"
          onChange={this.inputChange}
        />
        <button type='submit' onClick={this.onSubmitForm}>
          Save Data
        </button>
        {this.state.dataApi.map((dat, index) => {
          return (
            <div key={index}>
              <p>{dat.body}</p>
              <button value={dat.id} onClick={this.handleRemove}>
                Delete
              </button>
              <button value={dat.id} onClick={this.getDataId}>
                Edit Data
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;