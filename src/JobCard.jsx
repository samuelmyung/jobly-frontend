import React from "react";

/**
 * JobCard: Displays a single job
 *
 * state: none
 *
 * props: job => { id, title, salary, equity, companyHandle, companyName }
 *
 * App -> RoutesList -> {JobsList, CompanyDetail} -> JobCardList -> JobCard
 *
 */


function JobCard({ job }) {
    console.log("JobCard rendered")
    return (
        <div>
            <h3>Title: {job.title}</h3>
            {job.companyName
                ? <h4>Company: {job.companyName}</h4>
                : null}
            <h5>Salary: {job.salary}</h5>
            <h5>Equity: {job.equity}</h5>
            <br />
        </div>
    );
}

export default JobCard;