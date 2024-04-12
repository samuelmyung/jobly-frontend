import React from "react";
import { useNavigate } from "react-router-dom";


/**
 * CompanyCard: Displays a single company
 *
 * state: none
 *
 * props: company
 *
 * App -> RoutesList -> CompanyList -> CompanyCard
 *
 */
function CompanyCard({ company }) {
console.log("CompanyCard rendered")

    const navigate = useNavigate();

    function handleClick() {
        navigate(`/companies/${company.handle}`);
    }

    return (
        <div onClick={handleClick}>
            <h5>{company.name}</h5>
            <p>{company.description}</p>
            {company.logoUrl && <img src={company.logoUrl} alt={`Logo for ${company.name}`} />}
        </div>
    );
}

export default CompanyCard;