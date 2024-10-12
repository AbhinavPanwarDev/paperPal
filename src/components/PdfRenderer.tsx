"use client";

// import { useToast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



interface PdfRendererProps {
  url: string;
}
// const { width, ref } = useResizeDetector();
// const { toast } = useToast();

const PdfRenderer = ({ url }: PdfRendererProps) => {



  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-300 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">pdf Options bar</div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div >
          <Document file={url} className="max-h-full">
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
