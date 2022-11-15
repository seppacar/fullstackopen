const Filter = ({handleFilter}) => {
    return <div>filter shown with
        <input name="filter" onChange={handleFilter}/>
    </div>
}


export default Filter;