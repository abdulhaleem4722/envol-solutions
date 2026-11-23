import LegalPage from "../components/LegalPage";
import { privacyPolicy } from "../legalData";

export default function PrivacyPolicy() {
  return <LegalPage doc={privacyPolicy} />;
}
