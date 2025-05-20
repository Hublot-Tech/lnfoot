import React from 'react'
import { Button } from "@/components/ui/button";

export default function GetApp() {
	return (
		<section className="py-20">
			<div className='flex items-center justify-center bg-[url("https://shadcnblocks.com/images/block/patterns/circles.svg")] bg-cover bg-center py-20 text-center md:p-20'>
				<div className="container">
					<div className="mx-auto max-w-screen-md">
						<h1 className="mb-4 text-3xl font-semibold text-balance md:text-5xl">
							Votre boutique de foot est desormais dans votre poche
						</h1>
						<p className="md:text-lg">
							Découvrez notre collection d'articles de foot et de sport directement depuis 
							votre smartphone. Maillots, chaussures, équipements... Commandez facilement 
							et profitez de nos offres exclusives sur l'application !
						</p>
						<div className="mt-11 flex flex-col justify-center gap-2 sm:flex-row">
							<a href="https://lnfoot-img.hublots.co/app-release/app-release.apk">
								<Button size="lg">Télécharger l'application</Button>
							</a>
							<Button size="lg" variant="outline">
								Voir notre catalogue
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>)
}
