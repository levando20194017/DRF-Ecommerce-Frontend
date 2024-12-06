import React from "react";
import "./test.scss"

const AnimatedModal: React.FC = () => {
    return (
        <div>
            <main className="cd__main container p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <button
                            type="button"
                            className="btn btn-success m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#statusSuccessModal"
                        >
                            Success Modal
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger m-1"
                            data-bs-toggle="modal"
                            data-bs-target="#statusErrorsModal"
                        >
                            Error Modal
                        </button>
                    </div>

                    {/* Error Modal */}
                    <div
                        className="modal fade"
                        id="statusErrorsModal"
                        tabIndex={-1}
                        aria-hidden="true"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                            <div className="modal-content">
                                <div className="modal-body text-center p-lg-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 130.2 130.2"
                                    >
                                        <circle
                                            className="path circle"
                                            fill="none"
                                            stroke="#db3646"
                                            strokeWidth="6"
                                            strokeMiterlimit="10"
                                            cx="65.1"
                                            cy="65.1"
                                            r="62.1"
                                        />
                                        <line
                                            className="path line"
                                            fill="none"
                                            stroke="#db3646"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            x1="34.4"
                                            y1="37.9"
                                            x2="95.8"
                                            y2="92.3"
                                        />
                                        <line
                                            className="path line"
                                            fill="none"
                                            stroke="#db3646"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            x1="95.8"
                                            y1="38"
                                            x2="34.4"
                                            y2="92.2"
                                        />
                                    </svg>
                                    <h4 className="text-danger mt-3">Invalid email!</h4>
                                    <p className="mt-3">
                                        This email is already registered, please login.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-sm mt-3 btn-danger"
                                        data-bs-dismiss="modal"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Success Modal */}
                    <div
                        className="modal fade"
                        id="statusSuccessModal"
                        tabIndex={-1}
                        aria-hidden="true"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                            <div className="modal-content">
                                <div className="modal-body text-center p-lg-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 130.2 130.2"
                                    >
                                        <circle
                                            className="path circle"
                                            fill="none"
                                            stroke="#198754"
                                            strokeWidth="6"
                                            strokeMiterlimit="10"
                                            cx="65.1"
                                            cy="65.1"
                                            r="62.1"
                                        />
                                        <polyline
                                            className="path check"
                                            fill="none"
                                            stroke="#198754"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            points="100.2,40.2 51.5,88.8 29.8,67.5"
                                        />
                                    </svg>
                                    <h4 className="text-success mt-3">Oh Yeah!</h4>
                                    <p className="mt-3">
                                        You have successfully registered and logged in.
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-sm mt-3 btn-success"
                                        data-bs-dismiss="modal"
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnimatedModal;
