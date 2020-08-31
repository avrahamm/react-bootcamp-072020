import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function UseInput(props) {
    const dispatch = useDispatch();
    const { dispatchAction, title, filedName, iconClass } = props;

    const [ input, setInput ] = useState("");

    function handleChange(e) {
        setInput(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(dispatchAction(input));
        // console.log('InputBox searchPattern', input);
        setInput("");
    }

    return (
        <div className="card-header">
            <h4>{title}</h4>
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder={title + "..."}
                           name={filedName} className="form-control search"
                           onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text search_btn"
                              onClick={handleSubmit}
                        >
                            <i className={iconClass}></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}