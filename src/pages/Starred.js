import React, { useEffect, useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';
const Starred = () => {
    const [starred] = useShows();
    const [shows, setShows] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // to fetch data when the component mount
    useEffect(() => {
        if (starred && starred.length > 0) {
            const promises = starred.map(showId => apiGet(`/shows/${showId}`))
            // Promise.all() - to manage concurrent promises
            Promise.all(promises)
                .then(apiData => apiData.map(show => ({ show })))
                .then(results => {
                    setShows(results);
                    setIsLoading(false);
                }).catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                })

        } else {
            setIsLoading(false);
        }
    }, [starred])
    // to display actual data

    return (
        <MainPageLayout>
            {isLoading && <div>Shows are still Loading</div>}
            {error && <div>Error occured: {error}</div>}
            {!isLoading && !shows && <div>No Shows were Added</div>}
            {!isLoading && !error && shows && <ShowGrid data={shows} />}

        </MainPageLayout>
    )
}

export default Starred