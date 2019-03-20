import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: "",
      comment: ""
    };

    this.deletePet = this.deletePet.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3001/api/pets/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ pet: res });
      });
  }

  lickHandle(event) {
    event.preventDefault();
    console.log("Lick");
  }

  handleComment(event) {
    console.log(event);
    axios
      .put(
        `http://localhost:3001/api/pets/${this.props.match.params.id}/comment`,
        {
          comment: this.state.comment
        }
      )
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
      });
    this.componentDidMount();
    this.props.history.push(`/pets/${this.state.pet._id}/`);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  deletePet(event) {
    event.preventDefault();
    fetch(`http://localhost:3001/api/pets/${this.state.pet._id}`, {
      method: "DELETE"
    })
      .then(this.props.history.push("/pets"))
      .finally(() => this.props.getPets());
  }

  deleteComment(event) {
    console.log(event);
    axios
      .put(
        `http://localhost:3001/api/pets/${this.state.pet._id}/comment/delete`,
        {
          body: event.target.dataset.id
        }
      )
      .then(response => console.log(response))
      .then(result => {
        console.log(result);
      });
    this.componentDidMount();
    this.props.history.push(`/pets/${this.props.match.params.id}/`);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-image">
                <img
                  src={this.state.pet.profilepicture}
                  alt="Profile"
                  className="card-image"
                />
                <span className="card-title">{this.state.pet.name}</span>
              </div>
              <div className="card-content">
                <p>{this.state.pet.description}</p>
                <h4>Species - {this.state.pet.species}</h4>
                <form onSubmit={this.lickHandle}>
                  <button className="btn blue lighten-2">
                    # of licks {this.state.pet.licks}
                  </button>
                </form>
                {this.state.pet &&
                  this.state.pet.comments.map((comment, id) => {
                    return (
                      <div className="card" key={id}>
                        <div className="card-body">
                          <div className="card-content">
                            <p>{comment.message}</p>
                          </div>
                          <form
                            data-id={comment._id}
                            onSubmit={this.deleteComment}
                          >
                            <p>
                              <button className="btn red accent-3">
                                Delete
                              </button>
                            </p>
                          </form>
                        </div>
                      </div>
                    );
                  })}
                <div className="card">
                  <div className="card-content">
                    <form onSubmit={this.handleComment}>
                      <input
                        id="comment"
                        name="comment"
                        type="text"
                        onChange={this.handleInputChange}
                      />
                      <button className="btn orange lighten-2">Comment</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <Link to={this.state.pet && this.state.pet.sociallink}>
                  <i className="fab fa-twitter" />
                </Link>
                <Link to={"/pets/" + this.props.match.params.id + "/edit"}>
                  <button className="btn blue lighten-2">Edit Pet</button>
                </Link>
                <button className="btn red accent-3" onClick={this.deletePet}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pet;
