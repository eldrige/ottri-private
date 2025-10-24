import Image from "next/image";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "@/components/ui/Button";
import { Camera, X, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  placeholderImageUrl?: string;
  image: ImageListType;
  setImage: (value: ImageListType) => void;
  error?: string;
  rounded?: boolean;
}

export function ImageUpload({
  placeholderImageUrl,
  image,
  setImage,
  error,
  rounded = false
}: ImageUploadProps) {
  const onChange = (imageList: ImageListType) => {
    setImage(imageList);
  };

  return (
    <div className="w-full space-y-2">
      <div
        className={`w-full ${error ? "ring-2 ring-error ring-offset-1 rounded-xl" : ""}`}
      >
        <ImageUploading value={image} onChange={onChange} dataURLKey="data_url">
          {({
            imageList,
            onImageUpload,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            <div className={rounded ? "flex justify-center" : ""}>
              {imageList.length === 0 ? (
                placeholderImageUrl ? (
                  <div className="relative rounded-xl overflow-hidden group">
                    <div
                      className={`${rounded ? "aspect-square size-52" : "aspect-video"} relative`}
                    >
                      <Image
                        src={placeholderImageUrl}
                        alt="Uploaded image"
                        fill
                        className={`object-cover ${rounded ? "rounded-full" : ""}`}
                      />
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${rounded ? "" : "bg-black/20"}`}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className={`bg-white/90 hover:bg-white ${rounded ? "flex self-end mb-2 items-center p-2 px-3" : ""}`}
                          size="sm"
                          onClick={onImageUpload}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border border-dashed rounded-xl p-8 cursor-pointer transition-all hover:bg-gray-50 ${
                      isDragging
                        ? "border-secondary-700 bg-secondary-700/5"
                        : error
                          ? "border-error"
                          : "border-gray-200"
                    }`}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div
                        className={`p-3 rounded-full ${error ? "bg-error/10" : "bg-primary/10"}`}
                      >
                        <Camera
                          className={`h-6 w-6 ${error ? "text-error" : "text-primary"}`}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        Click or drag to upload an image
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="relative rounded-xl overflow-hidden group">
                  <div
                    className={`${rounded ? "aspect-square size-52" : "aspect-video"} relative`}
                  >
                    <Image
                      src={imageList[0]["data_url"]}
                      alt="Uploaded image"
                      fill
                      className={`object-cover ${rounded ? "rounded-full" : ""}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 w-full p-4 flex justify-between items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-white/90 hover:bg-white"
                        onClick={onImageUpload}
                      >
                        Replace
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => onImageRemove(0)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
