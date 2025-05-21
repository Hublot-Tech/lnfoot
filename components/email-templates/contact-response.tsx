import * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ContactResponseEmailProps {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
}

export const ContactResponseEmail = ({
  name = 'Client',
  email = 'client@example.com',
  message = 'Je suis intéressé par vos produits et services.',
  subject = 'Demande d\'information',
}: ContactResponseEmailProps) => {
  const companyName = 'LN FOOT';
  const companyAddress = 'DOUALA, CMR';
  const companyEmail = 'CONTACT@LNFOOT.COM';
  const companyPhone = '+237 6715254727';
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Merci de nous avoir contacté {companyName}. Nous avons bien reçu votre message.</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="max-w-[600px] mx-auto">
            <Section className="bg-white rounded-[8px] overflow-hidden">
              {/* Header */}
              <Section className="bg-[#F3653D] px-[24px] py-[32px] text-center">
                <Heading className="text-[28px] font-bold text-white m-0">
                  Nous avons reçu votre message
                </Heading>
                <Text className="text-[16px] text-white m-0">
                  Merci de nous avoir contacté
                </Text>
              </Section>

              {/* Main Content */}
              <Section className="px-[24px] py-[32px]">
                <Text className="text-[16px] text-gray-700 mb-[16px]">
                  Bonjour {name},
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[16px]">
                  Merci d&apos;avoir contacté {companyName}. Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais, généralement sous 24 à 48 heures ouvrables.
                </Text>
                <Text className="text-[16px] text-gray-700 mb-[24px]">
                  Voici un récapitulatif des informations que vous nous avez fournies :
                </Text>

                {/* Contact Information Summary */}
                <Section className="bg-gray-50 rounded-[8px] px-[16px] py-[16px] mb-[24px] border-solid border-[1px] border-gray-200">
                  <Row>
                    <Column>
                      <Text className="text-[14px] text-gray-500 m-0">
                        <strong>Nom :</strong> {name}
                      </Text>
                      <Text className="text-[14px] text-gray-500 m-0">
                        <strong>Email :</strong> {email}
                      </Text>
                      <Text className="text-[14px] text-gray-500 m-0">
                        <strong>Sujet :</strong> {subject}
                      </Text>
                      <Text className="text-[14px] text-gray-500 m-0">
                        <strong>Message :</strong>
                      </Text>
                      <Text className="text-[14px] text-gray-700 italic mt-[8px] mb-0">
                        &quot;{message}&quot;
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Text className="text-[16px] text-gray-700 mb-[24px]">
                  Si vous avez besoin d&apos;une assistance immédiate, n&apos;hésitez pas à nous appeler directement au {companyPhone}.
                </Text>

                <Section className="text-center mb-[32px]">
                  <Button
                    href="https://lnfoot.com"
                    className="bg-[#F3653D] rounded-[4px] text-white font-bold px-[24px] py-[12px] no-underline text-center box-border"
                  >
                    Visiter notre site web
                  </Button>
                </Section>
              </Section>

              {/* Footer */}
              <Hr className="border-solid border-[1px] border-gray-200 my-0 mx-0 w-full" />
              <Section className="px-[24px] py-[32px] text-center bg-gray-50">
                <Text className="text-[14px] text-gray-500 mb-[8px]">
                  {companyName}
                </Text>
                <Text className="text-[14px] text-gray-500 m-0">
                  {companyPhone} | {companyEmail}
                </Text>
                <Text className="text-[14px] text-gray-500 m-0">
                  {companyAddress}
                </Text>
                <Hr className="border-solid border-[1px] border-gray-200 my-[16px] mx-0 w-full" />
                <Text className="text-[12px] text-gray-400 m-0">
                  © {currentYear} {companyName}. Tous droits réservés.
                </Text>
                <Text className="text-[12px] text-gray-400 m-0">
                  <Link href="https://lnfoot.com/privacy" className="text-gray-400">
                    Politique de confidentialité
                  </Link>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactResponseEmail;
