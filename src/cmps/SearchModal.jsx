import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import { SearchInput } from './SearchInput'
import { ProfilePreview } from './ProfilePreview'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
import { Loader } from '../cmps/Loader'

async function performSearch(query, setSearchResults, setLoading) {
    try {
        const users = await userService.getUsersByUsername(query)
        const fuse = new Fuse(users, {
            keys: ['username'],
            includeScore: true,
            threshold: 0.3
        })
        const results = fuse.search(query).map(result => result.item)
        setSearchResults(results)
    } catch (err) {
        console.error('Error fetching users:', err)
        setSearchResults([])
    } finally {
        setLoading(false)
    }
}

const debouncedPerformSearch = utilService.debounce(async (query, setSearchResults, setLoading) => {
    await performSearch(query, setSearchResults, setLoading)
}, 1000)

export function SearchModal({ expandedSection }) {
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (searchQuery) {
            setLoading(true)
            debouncedPerformSearch(searchQuery, setSearchResults, setLoading)
        } else {
            setSearchResults([])
            setLoading(false)
        }
    }, [searchQuery])

    return (
        <section className={expandedSection === 'search' ? 'search-modal active' : 'search-modal'}>
            <section className='input-field'>
                <div>Search</div>
                <SearchInput onSearch={setSearchQuery} />
            </section>
            {loading && <Loader />}
            {searchQuery && !loading && <section className='results'>
                {searchResults.map(result => (
                    <div className="cursor-pointer highlight" key={result._id}>
                        <ProfilePreview profile={result} />
                    </div>
                ))}
            </section>}
            {!searchQuery && <section className='recent'>
                <h2>Recent</h2>
            </section>}
        </section>
    )
}
