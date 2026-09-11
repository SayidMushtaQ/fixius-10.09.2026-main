"use client";
import useUserRequests from "@/ApiRequests/user";
import { ServiceCards } from "@/constants/landingPage";
import { useAuth } from "@/context/AuthContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FaTimes } from "react-icons/fa"; // Import icons as needed
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "@/components/ui/Modal";
import SliderCrouserl from "react-slick";
import { Service } from "../ServiceCard";
import { Context } from "../Common/DashboardLayout";

const AddServices = ({
  isOpen,
  setIsOpen,
  // serviceList,
  selectCard,
  setSelectCard,
}: {
  isOpen: string;
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  serviceList?: any;
  setSelectCard: React.Dispatch<React.SetStateAction<string[]>>;
  selectCard: string[];
}) => {
  const closeModal = () => {
    setIsOpen("");
  };

  const [selectCaredError, setSelectCardError] = useState<string>("");
  const [showIcons, setShowIcon] = useState(true);
  const toggleSideBar = useContext(Context);

  const slider = useRef<SliderCrouserl>(null);

  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    rows: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        },
      },
    ],
  };

  const leftAlignedClass = showIcons ? "" : "text-left";

  const { UpdateCraftman } = useUserRequests();
  const { userData, getLoginUser } = useAuth();
  const userService = userData[0]?.craftsman?.services || [];
  const serviceList = ServiceCards.filter(
    (i) => !userService?.includes(i.shortText)
  );

  const handleServiceUpdate = async () => {
    if (
      !(selectCard.length > 0 && selectCard.length <= 12 - userService.length)
    ) {
      toast.error(
        `No se pueden seleccionar más de 12 servicios. Por favor, deselecciona ${
          selectCard.length - (12 - userService.length)
        } servicios`
      );
      return;
    }

    const data = {
      services: [...userService, ...selectCard],
    };
    try {
      await UpdateCraftman.mutateAsync(data, {
        onSuccess(data) {
          toast.success("Servicio añadido exitosamente");
          getLoginUser();
          setSelectCard([]);
          closeModal();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [selectCard]);
  return (
    <Modal
      isOpen={isOpen ? true : false}
      onRequestClose={closeModal}
      className={`lg:ml-[200px] transition-all duration-300 ease-in-out relative my-32 p-6 rounded-md bg-white shadow-lg outline-none`}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes size={20} />
      </button>
      <div className="h-[450px] w-[300px] xl:w-[1000px] md:w-[500px]  lg:w-[700px]">
        <div className={`block ${leftAlignedClass}`}>
          {/* Close Modal Button */}

          {/* Slider */}
          <SliderCrouserl {...settings} ref={slider}>
            {serviceList?.map(({ id, icon, shortText, slug }: any) => (
              <div key={id}>
                <Service
                  showIcons={showIcons}
                  icon={icon && icon}
                  shortText={shortText}
                  slug={slug}
                  selectCard={selectCard}
                  setSelectCard={setSelectCard}
                  setSelectCardError={setSelectCardError}
                  selectedServices="Select Service"
                />
              </div>
            ))}
          </SliderCrouserl>
          {/* Left and Right Buttons */}
          <div
            className="text-4xl flex justify-between items-center top-[45%] absolute  left-0 right-0 "
            aria-hidden="true"
          >
            <button
              onClick={() => slider.current?.slickPrev()}
              aria-label="Left shift"
            >
              <IoIosArrowBack className="sm:text-[30px]" />
            </button>
            <button
              onClick={() => slider.current?.slickNext()}
              aria-label="right shift"
            >
              <IoIosArrowForward className="sm:text-[30px]" />
            </button>
          </div>
        </div>
      </div>
      <button
        disabled={UpdateCraftman.isPending || selectCard.length === 0}
        onClick={handleServiceUpdate}
        className={`bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
                font-medium focus:outline-none float-right disabled:cursor-not-allowed 
                disabled:opacity-50`}
      >
        Speichern
      </button>
    </Modal>
  );
};

export default AddServices;
