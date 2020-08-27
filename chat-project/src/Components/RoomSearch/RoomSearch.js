import React, {useState} from "react";
import { useDispatch } from "react-redux";

import { setSearchRoomPattern } from "../../redux/actions";

export default function RoomSearch() {
    const dispatch = useDispatch();
    /**
     * I use state to enable submitting form by clicking on 'Search" icon.
     * As otherwise, clicking on icon event doesn't contain
     * e.target.querySelector('[name="searchPattern"]').value;
     */
    const [ searchPattern, setSearchPattern ] = useState("");

    function handleChange(e) {
        setSearchPattern(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        // const searchPattern = e.target.querySelector('[name="searchPattern"]').value;
        dispatch(setSearchRoomPattern(searchPattern));
        console.log('RoomSearch searchPattern', searchPattern);
    }

    return (
        <div className="card-header">
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder="Search..."
                           name="searchPattern" className="form-control search"
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