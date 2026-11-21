import { LegalPageLayout } from "@/components/LegalPageLayout";

const Terms = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      path="/terms"
      description="The terms and conditions governing use of MERN Academy's website and courses."
      updated="January 2027"
    >
      <p>
        These Terms of Service ("Terms") govern your access to and use of mernacademy.in and the
        courses, programs, and services offered by MERN Academy ("we", "us", "our"). By enrolling
        in a course or using our website, you agree to these Terms.
      </p>

      <h2>1. Enrollment & Eligibility</h2>
      <p>
        Enrollment in any MERN Academy course is subject to availability, fee payment, and
        fulfillment of any stated prerequisites. We reserve the right to accept or decline any
        enrollment at our discretion.
      </p>

      <h2>2. Fees & Payment</h2>
      <p>
        Course fees, payment schedules, and installment options are communicated at the time of
        enrollment. Fees must be paid as per the agreed schedule for continued access to classes
        and course material. Refunds, where applicable, are governed by our{" "}
        <a href="/refund">Refund Policy</a>.
      </p>

      <h2>3. Code of Conduct</h2>
      <p>
        Students are expected to attend classes regularly, engage respectfully with faculty and
        peers, and refrain from sharing course material, recordings, or login credentials with
        third parties. Violation of this conduct may result in suspension or termination of
        enrollment without refund.
      </p>

      <h2>4. Placement Assistance</h2>
      <p>
        Where a program includes placement support, we provide guidance, mock interviews, resume
        reviews, and referrals on a best-effort basis. MERN Academy does not guarantee a job offer
        unless explicitly stated in writing for a specific program, and outcomes depend on the
        student's own performance and the hiring decisions of third-party employers.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All course content, videos, notes, and materials provided by MERN Academy are our
        intellectual property (or licensed to us) and are provided solely for your personal,
        non-commercial learning use. Reproduction, redistribution, or resale without our written
        consent is prohibited.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        MERN Academy strives to provide accurate and up-to-date course content but makes no
        warranty, express or implied, regarding specific outcomes such as job placement, salary,
        or certification acceptance by any particular employer or institution.
      </p>

      <h2>7. Changes to These Terms</h2>
      <p>
        We may revise these Terms from time to time. Continued use of our Services after changes
        are posted constitutes acceptance of the updated Terms.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India, and any disputes will be subject to the
        jurisdiction of the courts in Bhilai / Durg, Chhattisgarh.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For any questions about these Terms, reach us at{" "}
        <a href="mailto:info@mernacademy.com">info@mernacademy.com</a>, call{" "}
        <a href="tel:+918770800807">+91 8770800807</a> / <a href="tel:+919200732962">+91 9200732962</a>,
        or write to us at Arya Nagar, Kohka, Bhilai, Chhattisgarh (CG) – 490023, Near Soni Palace, IIT Bhilai Road.
      </p>
    </LegalPageLayout>
  );
};

export default Terms;
