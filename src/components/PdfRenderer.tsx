"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useState } from "react";
import PdfFullscreen from "./PdfFullscreen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { width, ref } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-slate-950/90 backdrop-blur-sm border border-indigo-500/30 shadow-xl flex flex-col relative">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,94,255,0.15),rgba(10,10,35,0.4))] opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-[size:20px_20px] opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)' }}></div>
      
      {/* PDF Controls */}
      <div className="h-14 w-full border-b border-indigo-500/20 flex items-center justify-between px-4 relative z-10 bg-slate-900/70 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="text-sm text-indigo-200/90 font-medium">
            Page {currPage} of {numPages || '...'}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={currPage <= 1}
              onClick={() => setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))}
              className="h-8 w-8 p-0 text-indigo-300 hover:bg-indigo-500/20"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={numPages === undefined || currPage >= numPages}
              onClick={() =>
                setCurrPage((prev) =>
                  prev + 1 > numPages! ? numPages! : prev + 1
                )
              }
              className="h-8 w-8 p-0 text-indigo-300 hover:bg-indigo-500/20"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <PdfFullscreen fileUrl={url} />
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full max-h-[calc(100vh-10rem)] overflow-auto relative z-10 bg-slate-900/80 backdrop-blur-lg px-1 pt-2">
        <div ref={ref} className="h-full">
          <Document
            loading={
              <div className="flex justify-center">
                <div className="my-24 flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" />
                  <p className="text-indigo-300/80 text-sm animate-pulse mt-2">Loading document...</p>
                </div>
              </div>
            }
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setIsLoading(false);
            }}
            onLoadError={() => {
              setIsLoading(false);
            }}
            file={url}
            className="max-h-full"
          >
            {isLoading ? null : (
              <div className="relative mx-auto rounded-lg overflow-hidden shadow-xl shadow-indigo-900/20">
                <Page
                  width={width ? width - 2 : 1}
                  pageNumber={currPage}
                  className="max-w-full"
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            )}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
