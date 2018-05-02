import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Codemirror from 'react-codemirror';
import io from 'socket.io-client';
import * as actions from '../actions/challengesActions';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript.js';

const socket = io();

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      users: []
    }
    socket.on('receive code', (payload) => {
      this.updateCodeFromSockets(payload);
    });

    this.updateCodeInState = this.updateCodeInState.bind(this);
    this.updateCodeFromSockets = this.updateCodeFromSockets.bind(this);
  }

  componentDidMount() {
    if (this.props.challenge.id === undefined) {
      this.props.actions.getChallenges();
    } else {
      socket.emit('room', { room: this.props.challenge.id });
      this.setState({ users: users });
    }
  }

  getDerivedStateFromProps(nextProps, prevState) {
    socket.emit('room', { room: nextProps.challenge.id });
  }

  updateCodeInState(newText) {
    this.setState({ code: newText });
    socket.emit('coding event', {
      room: this.props.challenge.id,
      newCode: newText
    });
  }

  updateCodeFromSockets(payload) {
    this.setState({ code: payload.newCode })
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.challenge.id });
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      theme: 'monokai'
    };

    return (
      <div>
        <h1>{this.props.challenge.title}</h1>
        <p>{this.props.challenge.description}</p>
        <Codemirror
          value={"hello world!"}
          onChange={this.updateCodeInState}
          options={options} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.challenges.length > 0) {
    const challenge = state.challenges
      .filter(challenge => { return challenge.id == ownProps.params.id; })[0];
    return { challenge: challenge };
  } else {
    return { challenge: { title: '', description: '' } };
  }
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);

