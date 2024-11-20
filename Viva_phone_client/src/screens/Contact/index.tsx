import Breadcrumb from "../../components/Breadcrumb";
import ContactForm from "../../components/Contact/ContactForm";
import ContactInfo from "../../components/Contact/ContactInfo";
import Map from "../../components/Contact/Map";
import { Routes } from "../Routes";
import './contact.scss'
const ContactPage = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Liên hệ", path: Routes.Contact.path },
    ];
    return (
        <>
            <div className="div-empty"></div>
            <div className="container contact-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <div className="mt-5">
                    <Map />
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <ContactInfo />
                    </div>
                    <div className="col-md-6">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
