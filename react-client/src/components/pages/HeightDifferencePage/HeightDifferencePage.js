import React, {Component} from 'react';

class HeightDifferencePage extends Component {
    render() {
        return (
            <div>
                <h1>Players' height difference</h1>
                <button type="button" className="btn btn-bulldogs" data-toggle="modal" data-target="#modalConfirmation">
                    Launch demo modal
                </button>

                <div className="modal fade" id="modalConfirmation" tabIndex="-1" role="dialog"
                     aria-labelledby="modalLabelConfirmation" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalLabelConfirmation">Are you sure you want to delete player bla bla</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-bulldogs">Yes delete player</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeightDifferencePage;