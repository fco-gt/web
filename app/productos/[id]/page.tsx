"use client";

import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

import PageBreadCrums from "@/components/breadCrums";
import { productos } from "@/config/productos-catalogo";
import Image from "next/image";

import { FaExclamation, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiTwitterXLine } from "react-icons/ri";

export default function Page({ params }: { params: { id: string } }) {
  const [producto, setProducto] = useState<any | null>(null);
  const [selectedButton, setSelectedButton] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const idNumerico = parseInt(params.id);

  useEffect(() => {
    const productoEncontrado = productos.find((p) => p.id === idNumerico);

    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [idNumerico]);

  const formatNumberToCLP = (number: number): string => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(number);
  };

  return (
    <div className="mt-9">
      {producto && <PageBreadCrums name={producto.name} />}

      <Divider className="mt-5" />

      <article className="mt-11 flex flex-col md:flex-row">
        <div className="flex-1">
          <Image
            src={`/imgs/catalog/${idNumerico}.png`}
            alt={producto?.name}
            width={500}
            height={500}
          />

          <p className="flex flex-row items-center gap-x-1">
            Compartir:{" "}
            <Button isIconOnly variant="light">
              <FaFacebook size={35} />
            </Button>
            <Button isIconOnly variant="light">
              <FaInstagram size={35} />
            </Button>
            <Button isIconOnly variant="light">
              <RiTwitterXLine size={35} />
            </Button>
          </p>
        </div>

        <div className="flex flex-col max-w-lg w-full">
          <div className="ml-[83%]">
            <Button isIconOnly onPress={onOpen}>
              <FaExclamation />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      {producto?.name}
                    </ModalHeader>
                    <ModalBody>
                      <p>{producto?.description}</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cerrar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <h2 className="text-[45px]">{producto?.name}</h2>
          <p className="text-[39px]">
            CLP {formatNumberToCLP(producto?.price)}
          </p>
          <div className="flex items-center">
            <p className="text-[25px] mr-5 mt-2">Talla: </p>
            <div className="mt-2">
              <Button
                className={`bg-[#292929] text-white p-3 rounded-md mr-5 w-[95px] transition hover:scale-105 hover:brightness-125 ${
                  selectedButton === "adulto"
                    ? "border-1 border-[#26BCC6]"
                    : " "
                }`}
                onClick={() => handleButtonClick("adulto")}
              >
                Adulto
              </Button>
              <Button
                className={`bg-[#292929] text-white p-3 rounded-md mr-5 w-[95px] transition hover:scale-105 hover:brightness-125 ${
                  selectedButton === "niño" ? "border-1 border-[#26BCC6]" : " "
                }`}
                onClick={() => handleButtonClick("niño")}
              >
                Niño
              </Button>
            </div>
          </div>

          <div className="flex mt-5">
            <p className="flex flex-row items-center mr-5">
              <Button isIconOnly variant="light" className="mr-2">
                <FaMinus />
              </Button>
              {0}
              <Button isIconOnly variant="light" className="ml-2">
                <FaPlus />
              </Button>
            </p>
            <Button className="bg-[#292929]">Agregar al carrito</Button>
          </div>

          <Button className="mt-5 max-w-[195px]">Comprar ahora</Button>
        </div>
      </article>
    </div>
  );
}