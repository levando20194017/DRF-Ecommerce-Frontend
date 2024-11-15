import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

export const Footer = () => {

  return (
    <div className="footer">
        <div className="footer-body mt-5">
                <div className="footer-container">
                    <div className="container">
                        <footer className="pt-5 ">
                            <div className="row">
                                <div className="col-2">
                                    <h5>Menu</h5>
                                    <ul className="nav flex-column">
                                        <Link to="/home" onClick={() => window.scrollTo(0, 0)}>
                                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                                        </Link>
                                        <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
                                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Blog</a></li>

                                        </Link>
                                        <li className="nav-item mb-2"><a href="https://github.com/levando20194017/projectCNW_learnprogramming-website" className="nav-link p-0 text-muted">Link github</a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About us</a></li>
                                    </ul>
                                </div>

                                <div className="col-2">
                                    <h5>Contact</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2"><a href="https://www.facebook.com/levando.0708" className="nav-link p-0 text-muted"><i className="fab fa-facebook"
                                            style={{ color: "blue" }}> Facebook</i></a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted"><i className="fab fa-youtube"
                                            style={{ color: "red" }}> Youtube</i></a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted"><i className="fab fa-twitter"
                                            style={{ color: "blue" }}> Twitter</i></a></li>
                                        <li className="nav-item mb-2"><i className="fas fa-phone-volume"></i> Phone: 0971565773</li>
                                    </ul>
                                </div>

                                <div className="col-2">
                                    <h5>Address</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">
                                            <p>61 Định Công, Hoàng Mai, Hà Nội</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-4 offset-1">
                                    <form>
                                        <h5>Subscribe to our newsletter</h5>
                                        <p>Personal information search.</p>
                                        <div className="d-flex w-100 gap-2">
                                            <label htmlFor="newsletter1" className="visually-hidden">Name</label>
                                            <input id="newsletter1" type="text" className="form-control" placeholder="Search product by Name" />
                                            <button className="btn btn-primary" type="button">Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between py-4 my-4 border-top">

                            </div>
                            <br />
                            <br />
                            {/* <div className="footer-title">
                                One love - One future
                            </div> */}
                        </footer>
                    </div>
                </div>
            </div>
    </div>
  );
};
