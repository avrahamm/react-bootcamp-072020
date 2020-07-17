import React from 'react';

export default class Counter extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { count: 0}
        this.inc = this.inc.bind(this)
    }

    inc() {
        this.setState({count: this.state.count + this.props.delta});
        console.log(this.state.count, this.state.count + this.props.delta )
        if (this.state.count + this.props.delta > 9 ) {
            this.props.resetDelta()
        }
    }

    render() {
        const {count} = this.state
        return (
            <div>
                <p>
                    I was clicked {count} times
                    <button onClick={this.inc}>Click Me</button>
                </p>
            </div>
        )
    }
}
