export function PageNumbers(props) {
    const {numberPage, handleGetPage, statePageNumber} = props;

    return <>
        <p>
        <label>
            <input className='pageNumber' name="pageNumber"  type="radio" data-page={numberPage} onChange={handleGetPage} checked={numberPage === statePageNumber}/>
            <span>1</span>
            </label>
        </p>
    </>
}