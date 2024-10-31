import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Row } from '@themesberg/react-bootstrap';
import "./style.scss"
import { FormSetting } from "../../components/setting/FormSetting";
import { apiUpdateSetting } from "../../services/setting";
import { toastFailed, toastSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";


export default () => {
    const [isShowToast, setIsShowToast] = useState(false)
    useEffect(() => {
        isShowToast === true ? toastSuccess('Save setting successfully', '') : <></>
    }, [isShowToast])
    const handleSubmitSetting = async (settings) => {
        await settings.map((item) => {
            if (item.settingVal !== '') {
                try {
                    const params = {
                        settingKey: item.settingKey,
                        settingVal: item.settingVal
                    }
                    apiUpdateSetting({ params, id: item.id })
                } catch (e) {
                }
            }
        })
        const arrCheck = settings.filter(item => item.settingVal === '')
        if (arrCheck.length === 0) {
            toastSuccess('Save setting successfully', '')
        } else {

        }
    }

    return (
        <>
            <ToastContainer />
            <div className="setting-page">
                <div
                    className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2">
                    <div className="w-100 mb-4 mb-xl-0">
                        <Breadcrumb className="d-none d-md-inline-block"
                            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                            <Breadcrumb.Item active>Setting</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <h4 className="mb-0">Setting</h4>
                        </div>
                    </div>

                </div>
                <Row>
                    <FormSetting handleSubmitSetting={handleSubmitSetting} />
                </Row>
            </div>

        </>
    );
};
