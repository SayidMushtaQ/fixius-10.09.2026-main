import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
const ExampleDataForTitle = [
  {
    id: 1,
    title: "Complete demolition of buildings and structures",
  },
  {
    id: 2,
    title: "Partial demolition/dismantling of buildings",
  },
  {
    id: 3,
    title: "Asbestos removal",
  },
  {
    id: 4,
    title: "Disposal and recycling of construction materials",
  },
  {
    id: 5,
    title: "Hazardous waste disposal",
  },
  {
    id: 6,
    title: "Construction site cleaning",
  },
  {
    id: 7,
    title: "Construction site cleaning 7",
  },
  {
    id: 8,
    title: "Construction site cleaning 8",
  },
  {
    id: 9,
    title: "Construction site cleaning 9",
  },
  {
    id: 10,
    title: "Construction site cleaning 10",
  },
  {
    id: 11,
    title: "Construction site cleaning 11",
  },
  {
    id: 12,
    title: "Construction site cleaning 12",
  },
  {
    id: 13,
    title: "Construction site cleaning 13",
  },
];
function InstructionBar({
  title,
  id,
  setPage1Data,
  page1Data,
  handleTitleError,
}: InstructionBarPropsType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPage1Data((pre) => ({
      ...pre,
      [name]: value,
    }));
    page1Data.other_title = "";
    handleTitleError("");
  };
  return (
    <div className="flex  items-center space-x-4 bg-white shadow px-4 py-3 rounded-lg border relative hover:border-orange">
      <AiOutlineCheck
        className={`bg-green-500 text-white rounded-full text-lg ${
          title === page1Data.service_title ? "visible" : "invisible"
        } absolute left-2`}
      />
      <label
        htmlFor={id.toString()}
        className={`cursor-pointer text-sm   w-full`}
      >
        <input
          type="radio"
          value={title}
          id={id.toString()}
          name="service_title"
          className="peer sr-only"
          onChange={handleChange}
          checked={title === page1Data.service_title}
        />
        <div className="border-2 border-gray-400 w-[17px] h-[17px] rounded-full absolute left-2 top-[15px] peer-checked:hidden" />
        {title}
      </label>
    </div>
  );
}

export default function Page1({
  setPage1Data,
  page1Data,
  titleError,
  handleTitleError,
  serviceTitle,
}: PagePropsType) {
  console.log(
    setPage1Data,
    page1Data,
    titleError,
    handleTitleError,
    serviceTitle
  );
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage1Data((pre) => ({
      ...pre,
      [name]: value,
    }));
    handleTitleError("");
    page1Data.service_title = "";
  }
  return (
    <div className="sm:pt-2 pt-1 px-4 rounded-b-md">
      <div className="py-1">
        <div>
          <h2 className="font-semibold md:text-lg  text-sm mt-1 sm:mt-0">
            Welche Art von Heimwerker- oder Renovierungsarbeiten suchen Sie?
          </h2>
          <ul>
            {titleError !== "" && (
              <div className="bg-red-500 lg:w-[32.5%] p-2 rounded-md mt-2 mb-3 ">
                <span className="text-white  text-sm md:text-[15px] font-semibold">
                  {titleError}
                </span>
              </div>
            )}
            <ul
              className={` ${
                ExampleDataForTitle.length <= 7
                  ? "md:grid-cols-2"
                  : "lg:grid-cols-3"
              } grid-cols-1 md:grid-cols-2   grid gap-5 justify-center items-center relative mb-8 mt-1`}
            >
              {serviceTitle.map((item, index) => (
                <InstructionBar
                  key={index}
                  title={item}
                  id={index + 1}
                  setPage1Data={setPage1Data}
                  page1Data={page1Data}
                  handleTitleError={handleTitleError}
                />
              ))}
            </ul>
            {/* Constant */}
            <div className="space-y-5 mt-5 mb-5">
              <div className="flex gap-5 flex-wrap">
                <div className="flex text-sm sm:text-[15px] justify-between items-center bg-white shadow px-4 py-3 rounded-lg border">
                  <li>Otra </li>
                </div>
                <div className="flex justify-between items-center bg-white shadow px-4 py-3 rounded-lg border">
                  <input
                    type="text"
                    placeholder="Geben Sie einen Titel ein"
                    name="other_title"
                    className="outline-none"
                    onChange={handleChangeInput}
                    value={page1Data.other_title}
                  />
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
