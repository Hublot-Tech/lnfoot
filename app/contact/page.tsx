import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6'

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen">
        <div className="">
          <h1 className='text-center text-[#F3653D] text-4xl mt-[5rem] font-bold'>CONTACTEZ-NOUS</h1>
          <p className='md:mx-[15rem] mx-[5rem] text-justify mt-8'>
            Bienvenue sur la page de contact de LN FOOT. Pour toute question concernant nos produits,
            délais de livraison, ou assistance pour votre commande, n'hésitez pas à nous contacter.
            Notre équipe est disponible pour vous conseiller sur le choix de votre équipement sportif
            et vous aider à trouver les articles de football qui correspondent à vos besoins.
          </p>
        </div>

        <section className="flex flex-col md:flex-row justify-center items-center md:space-x-12 px-4 md:px-0 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">                <h2 className="text-2xl font-bold mb-4">NOUS CONTACTER</h2>
            <p className="text-gray-600 mb-4">
              Besoin d'assistance pour votre commande d'équipement sportif ? Notre équipe est à votre disposition pour vous aider à trouver les meilleures options pour vos besoins en matière d'articles de football.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaLocationDot className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />                        <div>
                  <p className="font-bold">ADRESSE</p>
                  <p>DOUALA, CMR</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />
                <div>
                  <p className="font-bold">TÉLÉPHONE</p>
                  <p>+237 6715254727</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white bg-orange-600 rounded-full p-2 mr-4 w-8 h-8" />
                <div>
                  <p className="font-bold">E-MAIL</p>
                  <p>CONTACT@LNFOOT.COM</p>
                </div>
              </div>
            </div>                <div className="mt-6">
              <p className="font-bold">SUIVEZ-NOUS</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Facebook">
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Twitter">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="YouTube">
                  <FaYoutube className="w-6 h-6" />
                </a>
                <a href="#" className="text-white bg-orange-600 p-2 rounded-full" aria-label="Instagram">
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>            <div className="bg-[rgba(187,187,187,0.2)] p-6 rounded-lg shadow-md w-full md:w-1/3 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">ENVOYER UN MESSAGE</h2>
            <form>
              <div className="mb-4">
                <input type="text" placeholder="NOM" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="ADRESSE E-MAIL" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded" />
              </div>
              <div className="mb-4">
                <textarea placeholder="MESSAGE" className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"></textarea>
              </div>
              <div className='mb-4 text-xs text-gray-600'>
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe concernant nos produits et services d'équipement sportif.
              </div>
              <div className='flex justify-end'>
                <button type="submit" className="w-1/4 bg-orange-600 text-white p-3 rounded">ENVOYER</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}