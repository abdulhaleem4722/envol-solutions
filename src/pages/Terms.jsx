import LegalPage from "../components/LegalPage";
import { termsConditions } from "../legalData";

export default function Terms() {
  return <LegalPage doc={termsConditions} />;
}
