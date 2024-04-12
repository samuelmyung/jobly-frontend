const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3001";
/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  static token;

  static async request(endpoint, data = {}, method = "GET") {

    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };
    console.log('data', data);
    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all companies */
  // Make smarter to handle search term, receive paramater use ternary

  static async getAllCompanies(searchParam = '') {
    let res;
    searchParam
      ? res = await this.request(`companies`, { 'nameLike': `${searchParam}` })
      : res = await this.request(`companies`);

    return res.companies;
  }

  /** Get a list of all jobs */
  static async getAllJobs(searchParam = '') {
    let res;
    searchParam
      ? res = await this.request(`jobs`, { title: searchParam })
      : res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Signup user returns token */
  static async signUpUser(userData) {
    const res = await this.request(`auth/register`, userData, 'POST');
    console.log('res in signup user', res);
    this.token = res.token;
    return res.token;
  }

  /** Edit user, returns { username, firstName, lastName, email } */
  static async editUser(userData) {
    console.log("Edit userData:", userData)
    const res = await this.request(`users/${userData.username}`, userData, 'PATCH');
    console.log('res in edit user', res);
    const { username, firstName, lastName, email } = res.user;
    return { username, firstName, lastName, email };
  }

  /** Login user, returns token */
  static async login(userData) {
    const res = await this.request('auth/token', userData, 'POST');
    this.token = res.token;
    return res.token;
  }

  /** Fetch specific user, returns { username, firstName, lastName, email } */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}


export default JoblyApi;
