import React, { useRef, useState } from "react";
import "./ImageGen.css";
import default_img from "../Assests/bkg.jpg";

const isFetching = false;
const ImageGen = () => {

    const [image_url, setImage_url] = React.useState("/");
    let [loading, setLoading] = useState(false);
    let inputRef = useRef(null);
    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        const response = await fetch("https://api.getimg.ai/v1/stable-diffusion/text-to-image", {
            method: "POST",
            headers: {
                'accept': "application/json",
                'Content-Type': "application/json",
                Authorization:`bearer ${process.env.REA}`
            },
            body: JSON.stringify({
                prompt: `${inputRef.current.value}`,
                output_format: 'png',
                response_format: 'url'
            })
        });

        let data = await response.json();
        // console.log("key",REACT_APP_API_KEY)
        if (data != 0) {
            setImage_url(data['url']);
            setLoading(false);
        }
    }
    return (
        <div className="ai-image-gen">
            <div className="header">
                ImagenDragon 🐉
                <span>
                    @ Image Generator
                </span>
                <div className="loading-img">
                    <div className="image">
                        <img src={image_url === "/" ? default_img : image_url} alt="loading" width={300} />
                    </div>
                    <div className={loading ? "spinner-border" : "display-none"}>
                    </div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input className="input-field" required ref={inputRef} type="text" placeholder="Description" />
                <div className="generate-btn" onClick={() => {
                    imageGenerator();
                    setLoading(true)
                }}>Generate</div>
            </div>

        </div>
    )
}
export default ImageGen;