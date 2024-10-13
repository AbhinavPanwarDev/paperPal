"use client";

import { useToast } from "@/hooks/use-toast";
// import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import {useForm} from 'react-hook-form'

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { width, ref } = useResizeDetector();
  // const { toast } = useToast();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const {} = useForm({})

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-300 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          
          {/* <div className="flex items-center gap-1.5">
            <Input className="w-12 h-8" />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages}</span>
            </p>
          </div> */}

          <Button
            disabled={numPages === undefined || currPage == numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp />
          </Button>

          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDown />
          </Button>

        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={url}
            className="max-h-full"
          >
            <Page width={width ? width : 1} pageNumber={currPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
