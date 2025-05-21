"use client";

import React, { useState } from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6'

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi');
      }

      // Réinitialiser le formulaire
      setName('');
      setEmail('');
      setMessage('');
      setSuccess(true);

      // Masquer le message de succès après quelques secondes
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="min-h-screen">
        <div className="">
          <h1 className='text-center text-[#F3653D] text-4xl mt-[5rem] font-bold'>CONTACTEZ-NOUS</h1>
          <p className='md:mx-[15rem] mx-[5rem] text-justify mt-8'>
            Bienvenue sur la page de contact de LN FOOT. Pour toute question concernant nos produits,
            délais de livraison, ou assistance pour votre commande, n&lsquo;hésitez pas à nous contacter.
            Notre équipe est disponible pour vous conseiller sur le choix de votre équipement sportif
            et vous aider à trouver les articles de football qui correspondent à vos besoins.
          </p>
        </div>

        <section className="flex flex-col md:flex-row justify-center items-center md:space-x-12 px-4 md:px-0 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">                <h2 className="text-2xl font-bold mb-4">NOUS CONTACTER</h2>
            <p className="text-gray-600 mb-4">
              Besoin d&lsquo;assistance pour votre commande d&lsquo;équipement sportif ? Notre équipe est à votre disposition pour vous aider à trouver les meilleures options pour vos besoins en matière d&lsquo;articles de football.
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
          </div>
          <div className="bg-[rgba(187,187,187,0.2)] p-6 rounded-lg shadow-md w-full md:w-1/3 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">ENVOYER UN MESSAGE</h2>

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded border border-green-200">
                Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="NOM"
                  className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="ADRESSE E-MAIL"
                  className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="MESSAGE"
                  className="w-full p-3 bg-[rgba(187,187,187,0.2)] border-b border-gray-500 rounded min-h-[120px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className='mb-4 text-xs text-gray-600'>
                En soumettant ce formulaire, vous acceptez d&lsquo;être contacté par notre équipe concernant nos produits et services d&lsquo;équipement sportif.
              </div>
              <div className='flex justify-end'>
                <button
                  type="submit"
                  className={`w-1/3 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded flex items-center justify-center transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'ENVOI...' : 'ENVOYER'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}