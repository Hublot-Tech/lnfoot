import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from '@react-email/components';

const Email = () => {
  return (
    <Html lang="fr">
      <Tailwind>
        <Head>
          <title>Bienvenue à la newsletter LNFoot</title>
          <Preview>Merci de vous être inscrit à la newsletter LNFoot</Preview>
        </Head>
        <Body className="font-sans py-[40px]" style={{ backgroundColor: '#f5f5f5' }}>
          <Container className="mx-auto bg-white rounded-[8px] p-[20px] max-w-[600px]">
            <Section className="border-b-[1px] border-solid border-[#e6e6e6] pb-[20px] mb-[20px]">
              <Heading className="text-[28px] font-bold text-[#0047AB] m-0">
                Bienvenue chez LNFoot !
              </Heading>
            </Section>
            
            <Section className="mb-[24px]">
              <Text className="text-[16px] leading-[24px] text-[#333] m-0">
                Bonjour,
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333] mt-[16px] mb-[24px]">
                Nous sommes ravis de vous confirmer votre inscription à la newsletter de <span className="font-bold">LNFoot</span>. Vous recevrez désormais toutes nos actualités, conseils et offres exclusives directement dans votre boîte mail.
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333] mb-[24px]">
                Voici ce que vous pouvez attendre de notre newsletter :
              </Text>
              <ul className="pl-[20px] m-0">
                <li className="text-[16px] leading-[24px] text-[#333] mb-[8px]">
                  Les dernières tendances du football
                </li>
                <li className="text-[16px] leading-[24px] text-[#333] mb-[8px]">
                  Des conseils d'experts pour améliorer votre jeu
                </li>
                <li className="text-[16px] leading-[24px] text-[#333] mb-[8px]">
                  Des offres exclusives sur nos produits
                </li>
                <li className="text-[16px] leading-[24px] text-[#333]">
                  Des invitations à nos événements spéciaux
                </li>
              </ul>
            </Section>
            
            <Section className="mb-[32px] text-center">
              <Button
                className="bg-[#FF8C00] text-white font-bold py-[12px] px-[24px] rounded-[4px] no-underline text-center box-border"
                href="https://lnfoot.com"
              >
                Visiter notre site
              </Button>
            </Section>
            
            <Section className="bg-[#f0f8ff] p-[16px] rounded-[8px] mb-[24px]">
              <Text className="text-[14px] leading-[20px] text-[#0047AB] m-0 font-bold">
                Restez connecté avec nous !
              </Text>
              <Text className="text-[14px] leading-[20px] text-[#333] mt-[8px] mb-0">
                Suivez-nous sur les réseaux sociaux pour ne rien manquer de nos actualités.
              </Text>
            </Section>
            
            <Section className="border-t-[1px] border-solid border-[#e6e6e6] pt-[20px] text-center">
              <Text className="text-[12px] leading-[16px] text-[#666] m-0">
                © {new Date().getFullYear()} LNFoot. Tous droits réservés.
              </Text>
              <Text className="text-[12px] leading-[16px] text-[#666] mt-[8px] mb-0">
                123 Avenue du Football, Douala, Cameroun
              </Text>
              <Text className="text-[12px] leading-[16px] text-[#666] mt-[8px] mb-0">
                <a href="mailto:contact@lnfoot.com" className="text-[#0047AB] underline">
                  contact@lnfoot.com
                </a>
              </Text>
              <Text className="text-[12px] leading-[16px] text-[#666] mt-[16px] mb-0">
                <a href="https://lnfoot.com/unsubscribe" className="text-[#666] underline">
                  Se désabonner
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;