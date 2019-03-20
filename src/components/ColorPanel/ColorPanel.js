import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setColors } from '../../actions';
import firebase from '../../firebase';
import { SketchPicker, HuePicker } from 'react-color';
import { Sidebar, Menu, Divider, Button, Modal, Icon, Label, Segment } from 'semantic-ui-react';


class ColorPanel extends Component {
    state = {
        modal: false,
        primary: '',
        secondary: '',
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        userColors: []
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListener(this.state.user.uid);
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    removeListener = () => {
        this.state.usersRef.child(`${this.state.user.uid}/colors`).off();
    }

    addListener = userId => {
        let userColors = [];
        this.state.usersRef
            .child(`${userId}/colors`)
            .on('child_added', snap => {
                userColors.unshift(snap.val());
                this.setState({ userColors })
            })
    }

    handleChangePrimary = color => this.setState({ primary: color.hex });

    handleChangeSecondary = color => this.setState({ secondary: color.hex });

    handleSaveColors = () => {
        this.saveColors(this.state.primary, this.state.secondary);
    }

    saveColors = (primary, secondary) => {
        this.state.usersRef
            .child(`${this.state.user.uid}/colors`)
            .push()
            .update({
                primary,
                secondary
            })
            .then(() => {
                console.log('Color added');
                this.closeModal();
            })
            .catch(err => console.error(err));
    }

    opneModal = () => this.setState({ modal: true });

    closeModal = () => this.setState({ modal: false });

    displayUserColors = colors => (
        colors.length > 0 && colors.map((color, i) => (
            <React.Fragment key={i}>
                <Divider />
                <div
                    className="color__container"
                    onClick={() => this.props.setColors(color.primary, color.secondary)}
                >
                    <div className="color__spuare" style={{ background: color.primary }}>
                        <div className="color__overlay" style={{ background: color.secondary }}></div>
                    </div>
                </div>
            </React.Fragment>
        ))
    )

    render() {
        const { modal, primary, secondary, userColors } = this.state;

        return (
            <Sidebar
                as={Menu}
                icon="labeled"
                inverted
                vertical
                visible
                width="very thin"
            >
                <Divider />
                <Button icon="add" size="small" color="blue" onClick={this.opneModal} />
                {this.displayUserColors(userColors)}
                {/* Coler picker Modal */}
                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Choose App Color</Modal.Header>
                    <Modal.Content>
                        <Segment inverted>
                            <Label content="Primary colors" />
                            <SketchPicker onChange={this.handleChangePrimary} color={primary} />
                        </Segment>

                        <Segment inverted>
                            <Label content="Secondary colors" />
                            <HuePicker onChange={this.handleChangeSecondary} color={secondary} />
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSaveColors}>
                            <Icon name="checkmark" /> Save colors
                        </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" color="red" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar>
        )
    }
}

export default connect(null, {
    setColors
})(ColorPanel);
