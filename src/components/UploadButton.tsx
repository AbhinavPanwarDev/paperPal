"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File, Plus, Upload, Sparkles, FileUp, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const UploadDropzone = () => {
  const router = useRouter();

  const { toast } = useToast();

  const { startUpload } = useUploadThing("pdfUploader");

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        console.log(acceptedFile);

        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: "Something went wrong, but not so much!!!",
            description: "Please try later...",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: "Something went wrong, but not so much!!!",
            description: "Please try later...",
            variant: "destructive",
          });
        }

        // Polling for the file every 500ms
        startPolling({ key });
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 h-72 m-4 border-dashed rounded-xl transition-all duration-300 overflow-hidden",
            isDragging 
              ? "border-indigo-400/70 bg-indigo-600/5" 
              : "border-indigo-500/30 hover:border-indigo-400/50 bg-indigo-950/40"
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,77,145,0.15),rgba(1,6,19,0.4))]"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
          <div className={cn(
            "absolute inset-0 bg-indigo-500/10 opacity-0 transition-opacity duration-300",
            isDragging && "opacity-100"
          )}></div>
          
          <div className="flex-items-center justify-center h-full w-full relative z-10">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="relative mb-5">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600/10 border border-indigo-500/30 mb-1">
                    <FileUp className="h-7 w-7 text-indigo-300" />
                    <div className="absolute inset-0 rounded-full bg-indigo-600/5 animate-pulse opacity-60"></div>
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-indigo-300" />
                </div>
                
                <p className="mb-2 text-md text-indigo-200 font-medium">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-indigo-300/70 text-center max-w-xs">
                  Upload your PDF document to chat with it and extract insights using our AI
                </p>
                <p className="text-xs text-indigo-400/60 mt-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30">
                  PDF files up to 4MB
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-indigo-600/20 backdrop-blur-sm flex items-center rounded-lg overflow-hidden border border-indigo-500/40 shadow-md">
                  <div className="px-3 py-2 h-full grid place-items-center bg-indigo-500/20">
                    <File className="h-4 w-4 text-indigo-300" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate text-indigo-100 flex-1">
                    {acceptedFiles[0].name}
                  </div>
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <X className="h-4 w-4 text-indigo-300 hover:text-indigo-100 cursor-pointer transition-colors" />
                  </div>
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

interface UploadButtonProps {
  variant?: 'default' | 'cosmic';
}

const UploadButton = ({ variant = 'default' }: UploadButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {variant === 'cosmic' ? (
          <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-white font-medium shadow-lg shadow-indigo-500/30 border border-indigo-500/50 hover:shadow-indigo-500/40 transition-all duration-300">
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            
            <div className="relative z-10 flex items-center gap-1">
              <span className="relative">
                <Upload className="h-4 w-4 mr-1" />
                <span className="absolute inset-0 animate-ping opacity-60">
                  <Upload className="h-4 w-4 mr-1 text-indigo-200" />
                </span>
              </span>
              <span>Upload PDF</span>
            </div>
          </Button>
        ) : (
          <Button className="flex items-center gap-1.5">
            <Upload className="h-4 w-4" />
            Upload PDF
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-slate-950 border border-indigo-500/30 shadow-xl shadow-indigo-500/5 max-w-md rounded-xl">
        <div className="text-center mb-2">
          <h3 className="font-semibold text-lg text-white">Upload Document</h3>
          <p className="text-xs text-indigo-300/70">Begin your document conversation</p>
        </div>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
