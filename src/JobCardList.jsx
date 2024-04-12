import React from "react";
import JobCard from "./JobCard";


/**
 * JobCardList: Displays a list of all the job cards
 *
 * state: none
 *
 * props: jobs [{ id, title, salary, equity, companyHandle, companyName }, ...]
 *
 * App -> RoutesList -> {JobsList, CompanyDetail} -> JobCardList -> JobCard
 *
 */
function JobCardList({ jobs }) {
    console.log("JobCardList rendered");
    return (
        <div>
            <ul>
                {jobs.map((j) => (
                    <li key={j.id}>
                        <JobCard job={j} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobCardList;