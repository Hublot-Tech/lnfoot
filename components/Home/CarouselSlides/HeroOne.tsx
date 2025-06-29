import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

const HeroOne = () => {
  return (
    <section className='border-b border-muted bg-gradient-to-br from-blue-900 to-orange-500 px-4 lg:px-24 h-full flex flex-col justify-center'>
      <Image
        width={0}
        height={0}
        src='/lions-indomptables.jpg'
        alt='Lions Indomptables'
        className='absolute inset-0 w-full h-full object-cover opacity-6'
      />
      <div className=''>
        <div className='grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2'>
          <div className='flex w-full max-w-[31.25rem] flex-col gap-9 lg:max-w-[37.5rem]'>
            <p className='font-mono text-[clamp(0.875rem,_0.875vw,_1rem)] text-muted'>
              Votre Source Ultime
            </p>
            <h1 className='font-bebas_neue text-[clamp(3.5rem,_calc(6.5vw+2.3rem),_9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground'>
              <span className='text-blue-900'>Luvnation</span>
              <br />
              <span className='font-bold text-orange-400'>Foot</span>
              <span className='text-white'>ball</span>
            </h1>
            <p className='text-[clamp(1.125rem,_1.125vw,_1.4rem)] leading-normal text-muted'>
              Plongez au cœur de l&apos;action avec les dernières actualités,
              scores en direct et analyses exclusives. Découvrez aussi notre
              boutique pour les fans et passionnés de foot!
            </p>
          </div>
          <div>
            <div className='relative ml-8 z-10 aspect-square w-full max-w-[56.25rem] overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2'>
              <div className='absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg'>
                <AspectRatio ratio={0.918918919 / 1}>
                  <Image
                    width={0}
                    height={0}
                    src='/lions.jpg'
                    alt=''
                    className='block size-full  object-cover object-left-top'
                  />
                </AspectRatio>
              </div>
              <div className='absolute right-0 bottom-0 w-[93%] overflow-hidden rounded-tl-lg'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroOne }
