import { LegalPageLayout } from "@/components/LegalPageLayout";

const Refund = () => {
  return (
    <LegalPageLayout
      title="Refund Policy"
      path="/refund"
      description="MERN Academy's refund and cancellation policy for course enrollments."
      updated="January 2027"
    >
      <p>
        This Refund Policy applies to course enrollments made through MERN Academy
        ("we", "us", "our"), either online or at our Bhilai campus. By enrolling, you agree to the
        terms below.
      </p>

      <h2>1. Cancellation Before Batch Start</h2>
      <p>
        If you cancel your enrollment at least 3 days before your batch's scheduled start date,
        you are eligible for a full refund of the fees paid, minus any non-refundable registration
        or processing charges disclosed at the time of payment.
      </p>

      <h2>2. Cancellation After Batch Start</h2>
      <p>
        Once classes have begun, refunds are considered on a pro-rata basis for the remaining,
        unattended portion of the course, after deducting:
      </p>
      <ul>
        <li>A one-time registration/processing fee (non-refundable)</li>
        <li>Fees for sessions already conducted or content already accessed</li>
        <li>Any costs for study material, tools, or third-party licenses already provided</li>
      </ul>
      <p>
        No refund will be issued once more than 30% of the course duration has elapsed.
      </p>

      <h2>3. Non-Refundable Cases</h2>
      <ul>
        <li>Withdrawal due to personal reasons unrelated to course quality, after the eligibility window above</li>
        <li>Enrollment under promotional or discounted offers explicitly marked as non-refundable</li>
        <li>Suspension or termination due to violation of our Terms of Service or code of conduct</li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <p>
        Send a written request to <a href="mailto:info@mernacademy.com">info@mernacademy.com</a>{" "}
        with your name, enrolled course, and reason for the refund request. We will acknowledge
        your request within 2 business days and process eligible refunds within 7–10 business days
        to the original payment method.
      </p>

      <h2>5. Program-Specific Terms</h2>
      <p>
        Certain programs (such as "Zero Upfront Fee" or pay-after-placement tracks) may have
        separate payment and refund terms disclosed at the time of enrollment; those terms take
        precedence over this general policy for that specific program.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Refund Policy from time to time. The policy in effect at the time of
        your enrollment will apply to that enrollment.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        For refund-related queries, reach us at{" "}
        <a href="mailto:info@mernacademy.com">info@mernacademy.com</a>, call{" "}
        <a href="tel:+918770800807">+91 8770800807</a> / <a href="tel:+919200732962">+91 9200732962</a>,
        or write to us at Arya Nagar, Kohka, Bhilai, Chhattisgarh (CG) – 490023, Near Soni Palace, IIT Bhilai Road.
      </p>
    </LegalPageLayout>
  );
};

export default Refund;
