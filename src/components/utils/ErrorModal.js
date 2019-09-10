import React, { Component } from 'react';

class ErrorModal extends Component {
 
  componentDidMount() {
    // Add event listener when modal is opened
    document.body.addEventListener('keydown', this.handleKeyDown);
  } 

  componentWillUnMount() {
    // Remove event listener when modal is closed
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    // Close Modal on Escape key press
    if (e.keyCode === 27) {
      this.props.closeErrorModal();
    }
  }

  render() {
    const { modalMessage } = this.props;
    const showErrorModal = this.props.modalState ? 'opened' : '';
    const fatalError = this.props.fatalError ? 'fatal' : '';

    return (
      <div className={`error-modal ${showErrorModal} ${fatalError}`}>
        <div className="error-modal__bg" onClick={this.props.closeErrorModal}></div>
        <div className="error-modal__content">
          <div className="error-modal__content--header">
            <h2 className="error-modal__headline"><i className="fas fa-exclamation-circle"></i> Error</h2>
            <span className="error-modal__btn--close" onClick={this.props.closeErrorModal}></span>
          </div> 
          <div className="error-modal__content--body">
            <p className="error-modal__text">{modalMessage}</p>
            <p className={`error-modal__caption ${fatalError}`}>
              <span className="error-modal__btn--sm" onClick={this.props.closeErrorModal}>Close</span>
            </p>
          </div> 
          
        </div>
      </div>
    );
  }
}

export default ErrorModal;
