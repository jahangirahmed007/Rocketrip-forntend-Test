import React, { Component } from "react";
import Axios from "axios";
import "./data.css";
import Pagination from "../Pagination/Pagination";
import { CURRENCY_HTML_CODES } from "../../currencies";
import Loader from "react-loader-spinner";
export default class Data extends Component {
  state = {
    searchCont: "",
    names: "",
    continent: "",
    iso3: "",
    capital: "",
    phone: "",
    currency: "",
    filter: [],
    postsPerPage: "20",
    currentPage: "1",
    loading: false,
    keys: [],
    country: false,
    countryInfo: "",
    currencyCodes: CURRENCY_HTML_CODES
  };

  componentDidMount() {
    const data = {
      names: "",
      continent: "",
      iso3: "",
      capital: "",
      phone: "",
      currency: ""
    };
    for (const key in data) {
      Axios.get(`http://localhost:3001/api/${key}`).then(info => {
        if (key === "names") {
          this.setState({
            names: info.data,
            loading: true
          });
        } else if (key === "continent") {
          this.setState({
            continent: info.data,
            loading: true
          });
        } else if (key === "iso3") {
          this.setState({
            iso3: info.data,
            loading: true
          });
        } else if (key === "capital") {
          this.setState({
            capital: info.data,
            loading: true
          });
        } else if (key === "phone") {
          this.setState({
            phone: info.data,
            loading: true
          });
        } else if (key === "currency") {
          this.setState({
            currency: info.data,
            loading: true
          });
        }
      });
    }
  }

  filterData = contKey => {
    const { continent } = this.state;
    var module = Object.keys(continent)
      .filter(key => continent[key] === contKey)
      .map((key, index) => {
        return { val: key };
      });
    const helo = module.map((val, ind) => {
      return { cod: val.val };
    });
    let filterCountries = [];
    let keys = [];
    helo.forEach(val => {
      let value = val.cod;
      let some = this.state.names[value];
      filterCountries.push(some);
      keys.push(value);
    });
    this.setState({
      filter: filterCountries,
      searchCont: contKey,
      currentPage: "1",
      loading: false,
      keys: keys,
      country: false
    });
  };

  onChangeContinent = e => {
    const val = e.target.value;
    if (val === "ALL") {
      const { names } = this.state;
      let countries = [];
      let keys = [];
      Object.keys(names).forEach(function eachKey(key) {
        countries.push(names[key]);
        keys.push(key);
      });
      this.setState({
        filter: countries,
        keye: keys,
        searchCont: val,
        currentPage: "1",
        country: false
      });
    } else {
      this.filterData(val);
    }
  };
  paginate = pageNumber => {
    this.setState({
      currentPage: pageNumber
    });
  };
  onCountryChange = e => {
    const value = e.target.value;
    const countName = this.state.names[value];
    const countCapital = this.state.capital[value];
    const countISO3 = this.state.iso3[value];
    const countPhone = this.state.phone[value];
    const countCurrency = this.state.currency[value];
    const countContinent = this.state.continent[value];
    const info = {
      name: countName,
      capital: countCapital,
      iso3: countISO3,
      phone: countPhone,
      currency: countCurrency,
      continent: countContinent,
      flag: "https://www.countryflags.io/" + value + "/shiny/64.png"
    };
    if (e.target.value === "" || e.target.value === null) {
      this.setState({
        country: false
      });
    } else {
      this.setState({
        countryInfo: info,
        country: true
      });
    }
  };
  onLinkClick = val => {
    const countIndex = this.state.filter.indexOf(val);
    const ket = this.state.keys[countIndex];
    const value = ket;
    const countName = this.state.names[value];
    const countCapital = this.state.capital[value];
    const countISO3 = this.state.iso3[value];
    const countPhone = this.state.phone[value];
    const countCurrency = this.state.currency[value];
    const countContinent = this.state.continent[value];
    const info = {
      name: countName,
      capital: countCapital,
      iso3: countISO3,
      phone: countPhone,
      currency: countCurrency,
      continent: countContinent,
      flag: "https://www.countryflags.io/" + value + "/shiny/64.png"
    };
    this.setState({
      countryInfo: info,
      country: true
    });
  };

  render() {
    console.log(this.state);
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.filter.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const country = this.state.filter.map((val, ind) => {
      return (
        <option key={ind} value={this.state.keys[ind]}>
          {val}
        </option>
      );
    });

    return (
      <div className=" d-flex flex-column  justify-content-center mt-4 f">
        <h1 className="text-center"> Country Data</h1>
        <div className="d-flex   justify-content-center mt-3">
          <select
            className="ml-2 p-0"
            style={{ width: "250px", height: "35px" }}
            onChange={this.onChangeContinent}
            id="continent"
          >
            <option value="">Select a Continent</option>
            <option value="ALL">(All)</option>
            <option value="AF">Africa</option>
            <option value="AS">Asia</option>
            <option value="EU">Europe</option>
            <option value="NA">North America</option>
            <option value="OC">Oceania</option>
            <option value="SA">South America</option>
          </select>
        </div>
        {/* Select for country info */}
        {this.state.searchCont ? (
          <div className="d-flex   justify-content-center mt-3">
            <select
              className="ml-2 p-0"
              style={{ width: "250px", height: "35px" }}
              onChange={this.onCountryChange}
              id="continent"
            >
              <option value="">Select a Country</option>
              {country}
            </select>
          </div>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-center flex-row w-100">
          {/* Getting country Information */}
          {this.state.country ? (
            <div className="w-75  text-center p-4 mt-5 bg-light">
              <div className="row ">
                <div className="col-4">
                  <img
                    style={{ width: "150px", height: "150px" }}
                    src={this.state.countryInfo.flag}
                    alt="countryFlag"
                  />
                </div>
                <div className="col-8 pt-4">
                  <div className="row mb-4">
                    <div className="col-4">
                      <h6 className="mb-4">Country Name</h6>
                      <p>{this.state.countryInfo.name}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mb-4">Country Capital</h6>
                      <p>{this.state.countryInfo.capital}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mb-4">Country IOS 3 Code</h6>
                      <p>{this.state.countryInfo.iso3}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <h6 className="mb-4">Country Currency</h6>
                      <p>{this.state.countryInfo.currency} </p>
                      <p>
                        {
                          this.state.currencyCodes[
                            this.state.countryInfo.currency
                          ]
                        }{" "}
                      </p>
                    </div>
                    <div className="col-4">
                      <h6 className="mb-4">Country Phone Code</h6>
                      <p>{this.state.countryInfo.phone}</p>
                    </div>
                    <div className="col-4">
                      <h6 className="mb-4">Contient</h6>
                      <p>{this.state.countryInfo.continent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            //   List of countries and pagination

            <div style={{ width: "50%" }}>
              <div className="container  mt-4 ">
                <div className="mt-2 ">
                  {this.state.loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "400px" }}
                    >
                      <Loader
                        type="TailSpin"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000}
                      />
                    </div>
                  ) : (
                    <ul className="list-group mb-4">
                      {currentPosts.map(post => (
                        <li key={post} className="list-group-item">
                          <button
                            className="btn btn-link"
                            onClick={() => this.onLinkClick(post)}
                          >
                            {post}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <Pagination
                  postsPerPage={this.state.postsPerPage}
                  totalPosts={this.state.filter.length}
                  paginate={this.paginate}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
