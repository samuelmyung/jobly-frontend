import React, { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import NotFound from "./NotFound";

/**
 * CompanyDetail: Displays all the job cards associated with a company
 *
 * state: company
 *
 * props: none
 *
 * App -> RoutesList -> {JobList, CompanyDetail} -> JobCardList -> JobCard
 *
 */
function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState({
        data: null,
        isLoading: true,
        errors: null
    });
    console.log('company object state: company', company);

    useEffect(function fetchCompanyWhenMounted() {
        console.log('useffect company object', handle);
        async function fetchCompany() {

            try {
                const companyResult = await JoblyApi.getCompany(handle);
                setCompany({
                    data: companyResult,
                    isLoading: false,
                    errors: null
                });

            } catch (err) {
                setCompany({
                    data: null,
                    isLoading: false,
                    errors: err
                });
            }
        }

        fetchCompany();
    }, []);

    if (company.isLoading) {
        return <i>Loading...</i>;
    } else if (company.errors?.length > 0) {
        return (< NotFound />);
    };

    return (
        <div>
            <h4>{company.data.name}</h4>
            <p>{company.data.description}</p>
            <JobCardList jobs={company.data.jobs} />
        </div>);
}

export default CompanyDetail;
