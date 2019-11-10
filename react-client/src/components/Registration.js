import React, {Component} from 'react';

class Registration extends Component {

    constructor(props) {
        super(props);
    }

        render() {
        return (
            <div className="container">
                <h1 className="nBrand">BULLDOGS</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <div className="row d-flex justify-content-center">


                    <div className="col-lg-3 rounded border">
                        <form onSubmit={this.handleSubmit} className="m-3">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    className="form-control"
                                    id="homeUsername"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>

                                <input
                                    className="form-control"
                                    id="homePassword"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-bulldogs">Log In</button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;