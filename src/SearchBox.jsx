import React, { useState, useEffect } from "react";

/**
 * SearchBox: A search box that filters companies to those matching the search
 *
 * state: search term
 *
 * props: search fn
 *
 * App -> RoutesList -> {CompaniesList, JobsList} -> SearchBox
 *
 */
function SearchBox({ search }) {
  const [term, setTerm] = useState("");
  console.log('searchboxstate: term', term);

  /** updates term based on user input */
  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  /** Calls parent function to update parent's state with search term */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(term);
    setTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={term} onChange={handleChange} />
      <button>Search!</button>
    </form>
  );
}

export default SearchBox;