import { SearchInput } from "./SearchInput";

export function SearchModal({expandedSection}){

    return <section className={expandedSection === 'search' ? 'search-modal active' : 'search-modal'} >

    <section className='input-field'>

        <div>Search</div>

        <SearchInput />

    </section>

    <section className='recent'></section>


</section>
}