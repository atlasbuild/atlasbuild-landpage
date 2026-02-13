import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  company: string;
  phone?: string;
  description: string;
}

export function ContactNotificationEmail({
  name,
  email,
  company,
  phone,
  description,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Novo contato de {name} - {company}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            <span style={gradient}>AtlasBuild</span>
          </Heading>
          <Heading style={h2}>Novo Contato Recebido</Heading>

          <Section style={section}>
            <Text style={label}>Nome:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>E-mail:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Empresa:</Text>
            <Text style={value}>{company}</Text>

            {phone && (
              <>
                <Text style={label}>Telefone / WhatsApp:</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            <Hr style={hr} />

            <Text style={label}>Descrição do Projeto:</Text>
            <Text style={descriptionStyle}>{description}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Recebido através do formulário de contato da landing page AtlasBuild
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;

const main = {
  backgroundColor: "#0D0D12",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#1a1a24",
  margin: "0 auto",
  padding: "40px 20px",
  borderRadius: "8px",
  maxWidth: "600px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 20px",
  padding: "0",
  textAlign: "center" as const,
};

const gradient = {
  background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #06B6D4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const h2 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 30px",
  padding: "0",
};

const section = {
  padding: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const label = {
  color: "#9ca3af",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "16px 0 4px",
};

const value = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0 0 8px",
};

const descriptionStyle = {
  color: "#e5e7eb",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "20px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "20px 0 0",
};
