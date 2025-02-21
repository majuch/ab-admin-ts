import Invoice from "@/features/receipt-quotation";
import { PDFViewer } from "@react-pdf/renderer";

export default function Page() {
  return (
    <div>
        <PDFViewer width="100%" height="1000">
            <Invoice />
        </PDFViewer>
    </div>
)}