import React, {} from "react";

export function Page(props) {
    const {changePage, searchValue, type, page, className}  = props;
    
    
    const handleClick = () => {
        changePage(searchValue, type, page);
    };

    return <li className={className}
     onClick={handleClick}><a href="#!" >{page}</a></li>
}