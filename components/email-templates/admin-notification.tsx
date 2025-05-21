import * as React from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface AdminNotificationProps {
  name?: string;
  email?: string;
  message?: string;
}

export const AdminNotificationEmail = ({
  name = 'Client',
  email = 'client@example.com',
  message = 'Je suis intéressé par vos produits et services.',
}: AdminNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message de contact - {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="max-w-[600px] mx-auto">
            <Section className="bg-white rounded-[8px] overflow-hidden">
              <Section className="bg-[#F3653D] px-[24px] py-[24px] text-center">
                <Heading className="text-[24px] font-bold text-white m-0">
                  Nouveau message de contact
                </Heading>
              </Section>

              <Section className="px-[24px] py-[32px]">
                <Text className="text-[16px] text-gray-700 mb-[24px]">
                  Vous avez reçu un nouveau message de contact sur le site LN FOOT:
                </Text>

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
                        <strong>Message :</strong>
                      </Text>
                      <Text className="text-[14px] text-gray-700 mt-[8px] mb-0">
                        {message}
                      </Text>
                    </Column>
                  </Row>
                </Section>

                <Text className="text-[16px] text-gray-700">
                  N&apos;oubliez pas de répondre au client dans les plus brefs délais.
                </Text>
              </Section>

              <Hr className="border-solid border-[1px] border-gray-200 my-0 mx-0 w-full" />
              <Section className="px-[24px] py-[16px] text-center bg-gray-50">
                <Text className="text-[12px] text-gray-400 m-0">
                  © {new Date().getFullYear()} LN FOOT. Tous droits réservés.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdminNotificationEmail;
