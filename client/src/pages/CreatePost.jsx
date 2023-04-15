import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();

    if (form?.prompt) {
      try {
        setGeneratingImg(true);

        const response = await axios.post(
          "http://localhost:8080/api/v1/dalle",
          { prompt: form?.prompt }
        );

        const data = await response?.data;

        setForm({ ...form, photo: `data:image/jpeg;base64,${data?.photo}` });
      } catch (error) {
        console.log("error: ", error);
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt!");
    }
  };

  const handleChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
  };

  const handleSupriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form?.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form?.prompt && form?.photo) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/post",
          form
        );
        await response?.data;
        navigate("/");
      } catch (error) {
        console.log("error: ", error);
        alert(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through by DALL-E and
          share with all.
        </p>
        <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSupriseMe={handleSupriseMe}
            />

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
              {form?.photo ? (
                <img
                  src={form?.photo}
                  alt={form?.photo}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}
              {generatingImg ? (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              ) : null}
            </div>
          </div>
          <div
            className="mt-5
          flex gap-5"
          >
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>

          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Once you have created image you want, you can share it with others
              in the community
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium text-sm rounded-md w-full sm:w-auto px-5 py-2.5"
            >
              {loading ? "Sharing..." : "Share with community"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
