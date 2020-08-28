import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FilterBox(props) {
    const dispatch = useDispatch();
    const { setFilterAction } = props;
    /**
     * I use state to enable submitting form by clicking on 'Search" icon.
     * As otherwise, clicking on icon event doesn't contain
     * e.target.querySelector('[name="filterPattern"]').value;
     */
    const [ filterPattern, setFilterPattern ] = useState("");

    function handleChange(e) {
        setFilterPattern(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(setFilterAction(filterPattern));
        console.log('FilterBox searchPattern', filterPattern);
    }

    return (
        <div className="card-header">
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder="Search..."
                           name="filterPattern" className="form-control search"
                           onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text search_btn"
                              onClick={handleSubmit}
                        >
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}