import React from 'react'

export default function TermsPage() {
  return (
    <main className='max-w-3xl mx-auto py-12 px-4'>
      <h1 className='text-3xl font-bold mb-6'>Conditions Générales d&apos;Utilisation</h1>
      <p className='mb-4'>
        Bienvenue sur <strong>Luvnation Football application (LN Foot)</strong> !
        Veuillez lire attentivement ces conditions générales d&apos;utilisation avant d&apos;utiliser notre application de football.
      </p>
      <p className='mb-4'>
        En accédant ou en utilisant <strong>LN Foot</strong> (« l&apos;Application »), vous acceptez d&apos;être lié par ces conditions. Si vous n&apos;êtes pas d&apos;accord, veuillez ne pas utiliser l&apos;Application.
      </p>
      <hr className='my-6' />
      <h2 className='text-xl font-semibold mt-8 mb-2'>1. Utilisation de l&apos;Application</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>L&apos;Application est destinée à un usage personnel et non commercial uniquement.</li>
        <li>
          Vous devez avoir au moins <strong>13 ans</strong> pour utiliser l&apos;Application.
        </li>
        <li>
          Vous vous engagez à ne pas faire un usage abusif de l&apos;Application ou à tenter d&apos;y accéder de manière non autorisée.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-8 mb-2'>2. Comptes Utilisateurs</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>Vous pouvez être amené à créer un compte pour accéder à certaines fonctionnalités.</li>
        <li>Vous êtes responsable de la sécurité de vos identifiants de connexion.</li>
        <li>
          Vous devez fournir des informations exactes et complètes lors de la création d&apos;un compte.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-8 mb-2'>3. Contenu et Propriété</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>
          Tout le contenu fourni via l&apos;Application (scores, actualités, vidéos, statistiques, etc.) est à titre informatif uniquement.
        </li>
        <li>
          Nous ne garantissons pas l&apos;exactitude ou l&apos;exhaustivité du contenu.
        </li>
        <li>
          Toutes les marques, logos et contenus de l&apos;application nous appartiennent ou appartiennent à nos partenaires et sont protégés par les lois sur le droit d&apos;auteur.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-8 mb-2'>4. Activités Interdites</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>Utiliser l&apos;Application à des fins illégales.</li>
        <li>
          Copier, modifier ou distribuer toute partie de l&apos;Application sans autorisation.
        </li>
        <li>Tenter de pirater, endommager ou perturber l&apos;Application.</li>
      </ul>
      <h2 className='text-xl font-semibold mt-8 mb-2'>5. Confidentialité</h2>
      <p className='mb-4'>
        Nous respectons votre vie privée. Veuillez lire notre{' '}
        <a href='/privacy' className='text-blue-600 underline'>
          Politique de Confidentialité
        </a>{' '}
        pour comprendre comment nous collectons, utilisons et protégeons vos informations personnelles.
      </p>
      <h2 className='text-xl font-semibold mt-8 mb-2'>6. Limitation de Responsabilité</h2>
      <ul className='list-disc pl-6 mb-4'>
        <li>Nous fournissons l&apos;Application « en l&apos;état » sans aucune garantie de quelque nature que ce soit.</li>
        <li>Nous ne sommes pas responsables des erreurs ou des informations manquantes.</li>
        <li>
          Nous ne sommes pas responsables des dommages résultant de votre utilisation de l&apos;Application.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-8 mb-2'>7. Résiliation</h2>
      <p className='mb-4'>
        Nous pouvons suspendre ou résilier votre accès à l&apos;Application à tout moment si vous violez ces conditions.
      </p>
      <h2 className='text-xl font-semibold mt-8 mb-2'>8. Modifications des Conditions</h2>
      <p className='mb-4'>
        Nous pouvons mettre à jour ces conditions de temps à autre. Nous vous informerons des changements importants, mais il est de votre responsabilité de les consulter régulièrement.
      </p>
      <h2 className='text-xl font-semibold mt-8 mb-2'>9. Contact</h2>
      <p className='mb-4'>
        Si vous avez des questions concernant ces conditions, veuillez {' '}
        <a
          href='mailto:luvnationdev@gmail.com'
          className='text-blue-600 underline'
        >
          nous contacter
        </a>
      </p>
      <div
        className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-8'
        role='alert'
      >
        <p className='font-bold'>Note :</p>
        <p>
          Ceci est un exemple de base et peut nécessiter des ajustements pour se conformer aux lois locales ou aux exigences des boutiques d&apos;applications.
        </p>
      </div>
    </main>
  )
}
