import { LegalPageLayout } from "@/components/LegalPageLayout";

const Privacy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      path="/privacy"
      description="How MERN Academy collects, uses, and protects your personal information."
      updated="January 2027"
    >
      <p>
        MERN Academy ("we", "us", "our") operates mernacademy.in and the courses, placement
        programs, and related services offered through it (the "Services"). This Privacy Policy
        explains what information we collect, how we use it, and the choices you have.
      </p>

      <h2>1. Information We Collect</h2>
      <p>When you enquire about a course, register, or contact us, we may collect:</p>
      <ul>
        <li>Name, email address, and phone number</li>
        <li>Educational background and course preferences</li>
        <li>Payment details processed securely through our payment partners (we do not store full card details)</li>
        <li>Messages you send us through forms, email, phone, or WhatsApp</li>
        <li>Basic usage data such as pages visited and device/browser information</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to course enquiries and process registrations</li>
        <li>To deliver course content, schedules, and placement support</li>
        <li>To send important updates about your enrollment or batch</li>
        <li>To improve our website and course offerings</li>
        <li>To comply with legal and regulatory requirements</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share it with trusted service providers
        (such as payment gateways, email, and hosting providers) strictly to operate our Services,
        and when required by law.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your information
        against unauthorized access, alteration, or loss. No method of transmission over the
        internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>5. Your Choices</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information by
        contacting us at{" "}
        <a href="mailto:info@mernacademy.com">info@mernacademy.com</a>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website may use cookies and similar technologies to improve your browsing experience
        and understand how visitors use our site. You can control cookies through your browser
        settings.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with an updated "Last updated" date.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, reach us at{" "}
        <a href="mailto:info@mernacademy.com">info@mernacademy.com</a>, call{" "}
        <a href="tel:+918770800807">+91 8770800807</a> / <a href="tel:+919200732962">+91 9200732962</a>,
        or write to us at Arya Nagar, Kohka, Bhilai, Chhattisgarh (CG) – 490023, Near Soni Palace, IIT Bhilai Road.
      </p>
    </LegalPageLayout>
  );
};

export default Privacy;
