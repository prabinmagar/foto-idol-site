const PolicyScreen = () => {
  return (
    <div className="min-h-screen mt-20 py-12 font-inter bg-whitesmoke/40">
      <div className="my-12 policy-content bg-white shadow-auth p-10">
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p className="text-base font-medium font-inter my-5">
          Last Updated: September 28, 2023{" "}
        </p>

        <div className="bg-gray-50 p-6">
          <p className="text-base text-gray-800 tracking-[1.5]">
            Welcome to Foto Idol Studio! At Foto Idol Studio, we understand
            the importance of your privacy, and we are committed to protecting
            the personal information you share with us. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you use our website and services. By accessing or using our website
            and services, you consent to the practices described in this Privacy
            Policy. Please take a moment to carefully read this policy to
            understand how we handle your personal information.
          </p>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">
            1. Information We Collect
          </h3>
          <p className="my-2 font-medium">1.1. Personal Information</p>
          <p>
            We collect personal information that you provide directly to us when
            you create an account or use our services. This may include but is
            not limited to:
          </p>
          <ul className="list-disc ms-4 my-5">
            <li>Your name</li>
            <li>Email address</li>
            <li>Password</li>
            <li>Profile photo</li>
            <li>Contact information (e.g., phone number)</li>
            <li>
              Billing information (e.g., credit card details, billing address)
            </li>
          </ul>

          <p className="my-2 font-medium">1.2. User Content</p>
          <p>
            When you use our services, you may upload photos and other content.
            We collect and store this content to provide you with our services.
          </p>

          <p className="my-2 font-medium">
            1.3. Automatically Collected Information
          </p>
          <p>
            We may collect certain information automatically when you access our
            website, including:
          </p>
          <ul className="list-disc ms-4 my-5">
            <li>IP address</li>
            <li>Email address</li>
            <li>Device information (e.g., device type, operating system)</li>
            <li>Browser information (e.g., browser type, version)</li>
            <li>
              Cookies and similar technologies (for more details, see our Cookie
              Policy)
            </li>
          </ul>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">
            2. How We Use Your Information
          </h3>
          <p>We use the information we collect for the following purposes:</p>

          <ul className="list-disc ms-4 my-5">
            <li>
              To provide and improve our services, including personalized
              features.
            </li>
            <li>To process your transactions and requests.</li>
            <li>
              To communicate with you about your account and our services.
            </li>
            <li>
              To send you marketing and promotional materials (you can opt out
              at any time).
            </li>
            <li>To investigate and prevent fraud and abuse.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">
            3. Sharing Your Information
          </h3>
          <p>We may share your personal information with:</p>

          <ul className="list-disc ms-4 my-5">
            <li>
              Service providers and partners who assist us in delivering our
              services.
            </li>
            <li>
              Law enforcement, government agencies, or authorized third parties
              when required by law.
            </li>
            <li>
              Third parties in connection with a merger, acquisition, or sale of
              assets.
            </li>
          </ul>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">4. Security</h3>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, no data transmission over the internet is completely
            secure, and we cannot guarantee the security of your information.
          </p>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">5. Your Choices</h3>
          <p>
            Access and update your personal information in your account
            settings.
          </p>
          <p>Opt out of marketing communications.</p>
          <p>Delete your account (subject to our data retention policies).</p>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">6. Children's Privacy</h3>
          <p>
            Our services are not intended for children under the age of 13. We
            do not knowingly collect or solicit personal information from
            children under 13. If you believe a child under 13 has provided us
            with personal information, please contact us immediately.
          </p>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">
            7. Changes to this Privacy Policy
          </h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the updated policy on our
            website.
          </p>
        </div>

        <div className="my-5">
          <h3 className="font-semibold text-lg my-2">8. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <address className="mt-2">
            Foto Idol Studio <br /> 123 Main Street City, State ZIP <br /> <a href="mailto:contact@photo-idolstudio.com "> Email:
            contact@photo-idolstudio.com </a> <br /> Phone: (123) 456-7890
          </address>
        </div>

        <p>
          Thank you for trusting Foto Idol Studio with your personal
          information. We are dedicated to ensuring the privacy and security of
          your data.
        </p>
      </div>
    </div>
  );
};

export default PolicyScreen;
