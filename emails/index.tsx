import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Brand = {
  name: string;
  url: string;
  color: string;
};

/**
 * Data model for rendering the email signature.
 */
export type SignatureEmailProps = {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  logoUrl: string;
  brands: readonly Brand[];
};

const defaultBrands: readonly Brand[] = [
  {
    name: "Distribuovaná Klinika",
    url: "https://www.distribuovana-klinika.cz",
    color: "#008bd2",
  },
  {
    name: "Místní Lékárna",
    url: "https://www.mistnilekarna.cz",
    color: "#00c940",
  },
  {
    name: "Rychlé Berle",
    url: "https://www.rychleberle.cz",
    color: "#3fbfad",
  },
];

const defaultProps: SignatureEmailProps = {
  fullName: "Jakub Takáč",
  jobTitle: "Marketing & Obchod",
  phone: "+420 777 364 446",
  email: "takac@rychleberle.cz",
  logoUrl:
    "https://cdn.vadura.dev/rychleberle/identity/sdruzeni-identit/logo_sdruzene_vlevo@2x.png",
  brands: defaultBrands,
};

/**
 * Modernized HTML email signature compatible with common clients.
 *
 * @param props Signature values used to render personal and brand details.
 * @returns Email signature markup prepared for React Email rendering.
 */
export const SignatureEmail = ({
  fullName = defaultProps.fullName,
  jobTitle = defaultProps.jobTitle,
  phone = defaultProps.phone,
  email = defaultProps.email,
  logoUrl = defaultProps.logoUrl,
  brands = defaultProps.brands,
}: SignatureEmailProps) => (
  <Html lang="cs">
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no, url=no"
      />
      <meta name="x-apple-disable-message-reformatting" />
      <style>{compatibilityStyles}</style>
      <Font
        fontFamily="Rubik"
        fallbackFontFamily={["Arial", "Helvetica", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UA.ttf",
          format: "truetype",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Rubik"
        fallbackFontFamily={["Arial", "Helvetica", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-2Y-1UA.ttf",
          format: "truetype",
        }}
        fontWeight={600}
        fontStyle="normal"
      />
    </Head>
    <Preview>{`${fullName} | ${jobTitle}`}</Preview>
    <Body id="body" style={body}>
      <Container style={container}>
        <Section>
          <Text style={greeting}>S přátelským pozdravem</Text>
          <Text style={fullNameText}>{fullName}</Text>
          <Text style={jobTitleText}>{jobTitle}</Text>

          <Section style={brandsSection}>
            {brands.map((brand) => (
              <Text key={brand.name} style={brandNameText}>
                <span style={{ ...slashMark, color: brand.color }}>/</span>{" "}
                {brand.name}
              </Text>
            ))}
          </Section>

          <Text style={contactLine}>Telefon: {phone}</Text>
          <Text style={contactLine}>
            e-mail:{" "}
            <Link
              href={`mailto:${email}`}
              style={contactLink}
              className="signature-link"
            >
              {email}
            </Link>
          </Text>

          <Section style={brandsSection}>
            {brands.map((brand) => (
              <Text key={brand.url} style={brandUrlLine}>
                <Link
                  href={brand.url}
                  style={{ ...brandUrl, color: brand.color }}
                  className="signature-link signature-link-brand"
                >
                  {brand.url.replace(/^https?:\/\//, "")}
                </Link>
              </Text>
            ))}
          </Section>

          <Img src={logoUrl} alt="Rychlé Berle" width="350" style={logo} />
        </Section>
      </Container>
    </Body>
  </Html>
);

export default SignatureEmail;

SignatureEmail.PreviewProps = defaultProps;

const fontStack = '"Rubik", Tahoma, "Segoe UI", Arial, Helvetica, sans-serif';
const compatibilityStyles = `
  a,
  a:link,
  a:visited {
    text-decoration: none !important;
  }

  .signature-link {
    text-decoration: none !important;
    font-family: ${fontStack} !important;
  }

  a[x-apple-data-detectors]:not(.signature-link-brand),
  #MessageViewBody a:not(.signature-link-brand),
  u + #body a:not(.signature-link-brand) {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }
`;

const body = {
  margin: "0",
  padding: "0",
  backgroundColor: "#ffffff",
  fontFamily: fontStack,
  color: "#000000",
  lineHeight: "1.35",
  WebkitTextSizeAdjust: "100%",
  msTextSizeAdjust: "100%",
};

const container = {
  margin: "0",
  padding: "0",
  width: "100%",
  maxWidth: "640px",
  fontFamily: fontStack,
};

const greeting = {
  margin: "0 0 10px",
  fontSize: "12px",
  lineHeight: "16px",
  fontFamily: fontStack,
};

const fullNameText = {
  margin: "0 0 2px",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 600,
  color: "#3fbfad",
  fontFamily: fontStack,
};

const jobTitleText = {
  margin: "0 0 6px",
  fontSize: "12px",
  lineHeight: "16px",
  fontFamily: fontStack,
};

const brandsSection = {
  margin: "0 0 10px",
};

const brandNameText = {
  margin: "0",
  fontSize: "12px",
  lineHeight: "18px",
  fontFamily: fontStack,
};

const slashMark = {
  fontWeight: 700,
};

const contactLine = {
  margin: "0 0 2px",
  fontSize: "14px",
  lineHeight: "20px",
  fontFamily: fontStack,
};

const contactLink = {
  color: "#000000",
  textDecoration: "none",
  fontFamily: fontStack,
};

const brandUrlLine = {
  margin: "0",
  fontSize: "14px",
  lineHeight: "20px",
  fontFamily: fontStack,
};

const brandUrl = {
  display: "block",
  textDecoration: "none",
  fontFamily: fontStack,
};

const logo = {
  display: "block",
  width: "350px",
  maxWidth: "100%",
  height: "auto",
  border: "0",
  outline: "none",
  textDecoration: "none",
  marginTop: "12px",
};
