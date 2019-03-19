import React, { Component } from "react";

class New extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log("Create PETZ!!!");
  }
  render() {
    return (
      <div>
        <div className="card m-5">
          <div className="card-body">
            <div className="card-content">
              <h1>Create New Pet</h1>
              <form onSubmit={this.handleSubmit} action="/pets">
                <p>Name </p>
                <p>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    //   onChange={this.handleInputChange}
                  />
                </p>
                <p>Description </p>
                <p>
                  <input
                    id="description"
                    name="descriptoion"
                    type="text"
                    //   onChange={this.handleInputChange}
                  />
                </p>
                <p>Species - Cat or Dog? </p>
                <div>
                  <p>
                    <select className="browser-default m5">
                      <option defaultValue="" disabled>
                        Choose your option
                      </option>
                      <option value="Cat">Cat</option>
                      <option value="Dog">Dog</option>
                    </select>
                  </p>
                </div>
                {/* onChange={this.handleInputChange} */}

                <p>Profile Picture </p>
                <p>
                  <input
                    id="profilepicture"
                    name="profilepicture"
                    type="text"
                    //   onChange={this.handleInputChange}
                  />
                </p>
                <p>Social Link </p>
                <p>
                  <input
                    id="sociallink"
                    name="sociallink"
                    type="text"
                    //   onChange={this.handleInputChange}
                  />
                </p>
                <p>
                  <button className="btn orange lighten-2">Create Pet</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default New;