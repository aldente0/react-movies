import {Page} from './Page';

export function Pages(props) {
    const {pages, changePage, searchValue, type, currentPage} = props;

    return <ul className="pagination">
        {
            pages.map((page, index) => {
                return <Page 
                    key={index} 
                    page={page} 
                    changePage={changePage} 
                    searchValue={searchValue} 
                    type={type} 
                    className={currentPage === page ? ('active') : ('waves-effect')}></Page>;
            })
        }
    </ul>
}