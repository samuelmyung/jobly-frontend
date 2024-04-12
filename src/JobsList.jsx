import React, { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import JobCardList from "./JobCardList";
import SearchBox from "./SearchBox";
/**
 * JobsList: Displays a list of all the jobs
 *
 * state: jobs, searched
 *
 * props: none
 *
 * App -> RoutesList -> {JobsList, CompanyDetail} -> JobCardList -> JobCard
 *
 */
function JobsList() {
    const [jobs, setJobs] = useState({
        data: null,
        isLoading: true
    });
    const [searched, setSearched] = useState("");

    console.log('jobs list state: jobs', jobs);
    console.log("searched", searched);

    useEffect(function fetchJobsWhenMounted() {
        console.log('useffect jobs list');
        async function fetchJobs() {
            const jobsResult = await JoblyApi.getAllJobs();
            setJobs({
                data: jobsResult,
                isLoading: false
            });
        }
        fetchJobs();
    }, []);

    /** Filters jobs by search term */
    async function search(term) {
        const formattedTerm = term.trim().replace('.', '');

        const JobsResult = await JoblyApi.getAllJobs(formattedTerm);
        setJobs({
            data: JobsResult,
            isLoading: false
        });
        setSearched(formattedTerm);
        return;
    }

    if (jobs.isLoading) return <i>Loading...</i>;


    return (
        <div>
            <br />
            <SearchBox search={search} />
            <br />
            {searched
                ? <h2>{`Search Results for '${searched}'`}</h2>
                : <h2>All Jobs</h2>}
            <br />
            <JobCardList jobs={jobs.data} />
            {jobs?.data.length === 0 && searched
                ? <div> No Results Found </div>
                : null}
        </div>
    );
}

export default JobsList;
