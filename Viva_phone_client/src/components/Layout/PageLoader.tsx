import React from "react";

const PageLoader: React.FC = () => {
    return (
        <div className="loader-container">
            <div style={{ width: "100%", height: 0, paddingBottom: "75%", position: "relative" }}>
                <img width={200} style={{ background: "transparent" }} src="https://media.giphy.com/media/xTiTnjEFmivkL0cfDi/giphy.gif?cid=ecf05e474umtksbc9zdlhq1l47a44mmnekqejsjddkumfn4o&ep=v1_gifs_related&rid=giphy.gif&ct=g" />
            </div>
        </div>
    );
};

export default PageLoader;
