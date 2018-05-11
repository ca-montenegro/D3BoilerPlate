import React, {Component} from "react";
import ReactDOM from "react-dom";
import {withTracker} from "meteor/react-meteor-data";
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'

// Comments component
class CommentList extends Component {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call("Comments.insert", text, this.props.tag);
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = "";

    }

    renderComments() {
        filtered = this.props.comments.filter((comment) => {
            return comment.tag === this.props.tag;
        });
        return filtered.map((comment) => (
            <Element key = {comment._id} name="firstInsideContainer" style={{
                marginBottom: '20px'
            }}>
                <Comment key={comment._id} comment={comment}/>
            </Element>
        ));
    }


    componentDidUpdate() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    render() {
        return (
            <div className="comments media-area">
                <h5 className="text-center title">Comments for route: {this.props.tag}</h5>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {Meteor.userId() ?
                        <input className="form-control border-input" type="text" ref="textInput"
                               placeholder="Type to add a new comment"/> :
                        <input className="form-control border-input" type="text" ref="textInput" disabled
                               placeholder="You need to log in to write a comment!"/>
                    }
                </form>
                <br/>
                <div className="media-area">
                    <Element name="test7" className="element" id="containerElement" style={{
                        position: 'relative',
                        height: '200px',
                        overflow: 'scroll',
                        marginBottom: '10px'
                    }}>
                        {this.renderComments()}
                    </Element>
                </div>

            </div>
        );
    }
}

export default CommentList;

class Comment extends Component {
    render() {
        return (
            <div className="media">
                <div className="media-body">

                    <div>
                        <h5 className="media-heading">{this.props.comment.username}
                            <span className="pull-right text-muted">
                            {this.props.comment.createdAt.toDateString() + " " + (this.props.comment.createdAt.getHours() < 10 ? "0" : "") +
                            this.props.comment.createdAt.getHours() + ":" + (this.props.comment.createdAt.getMinutes() < 10 ? "0" : "") +
                            this.props.comment.createdAt.getMinutes() + ":" + (this.props.comment.createdAt.getSeconds() < 10 ? "0" : "") +
                            this.props.comment.createdAt.getSeconds()}
                        </span>
                        </h5>
                    </div>
                    <p>{this.props.comment.text}</p>
                </div>
            </div>
        );
    }
}