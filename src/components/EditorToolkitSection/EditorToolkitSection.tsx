/* eslint-disable jsx-a11y/label-has-associated-control */

import Image from "next/image";
import {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";

import useEditor, {
  editorDeleteAtom,
  editorImageAtom,
  editorPricingAtom,
  editorToolkitAtom,
  editorSubtitleAtom,
} from "@/hooks/useEditor";
import Article from "@/types/Article";
import {getImageUrl} from "@/utils/image";

export type Props = Pick<Article.Get, "image" | "pricing">;

export default function EditorToolkitSection({
  image,
  pricing,
}: Props): JSX.Element {
  const {editorImage, editorPricing, editorSubtitle} = useEditor();

  const setEditorDelete = useSetRecoilState(editorDeleteAtom);
  const setEditorImage = useSetRecoilState(editorImageAtom);
  const setEditorToolkit = useSetRecoilState(editorToolkitAtom);
  const setEditorPricing = useSetRecoilState(editorPricingAtom);
  const setEditorSubtitle = useSetRecoilState(editorSubtitleAtom);

  const hiddenFileInput = useRef(null);

  const handleClick = (): void => {
    if (!hiddenFileInput.current) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    hiddenFileInput.current.click();
  };

  const handleFile = async (file: File) => {
    const imageUrl = await getImageUrl(file);
    setEditorImage(imageUrl);
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {register, handleSubmit, reset, formState} = useForm<
    Partial<Article.Fields>
  >({
    defaultValues: {
      pricing: editorPricing,
      subtitle: editorSubtitle,
    },
  });

  useEffect(() => {
    setEditorImage(image);
  }, [setEditorImage, image]);

  useEffect(() => {
    setEditorPricing(pricing);
  }, [setEditorPricing, pricing]);

  useEffect(() => {
    if (!formState.isDirty) {
      reset({
        pricing: editorPricing,
        subtitle: editorSubtitle,
      });
    }
  }, [reset, editorPricing, editorSubtitle, formState.isDirty]);

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async (data: Article.Fields) => {
    setEditorPricing(data.pricing);
    setEditorSubtitle(data.subtitle);
    setEditorToolkit(false);
  };

  return (
    <div className="md:col-span-2 sm:w-96 md:w-128 xl:w-192">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="shadow-2xl sm:rounded-md sm:overflow-hidden">
          <div className="px-4 pb-3 bg-white ">
            <fieldset>
              <legend className="block text-sm font-medium leading-5 text-gray-700">
                Pricing
              </legend>
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    ref={register}
                    id="pricing_free"
                    name="pricing"
                    value="free"
                    type="radio"
                    className="w-4 h-4 text-pink-600 transition duration-150 ease-in-out form-radio"
                  />
                  <label htmlFor="pricing_free" className="ml-3">
                    <span className="block text-sm font-medium leading-5 text-gray-700">
                      Free
                    </span>
                  </label>
                </div>
                <div className="flex items-center mt-4">
                  <input
                    ref={register}
                    id="pricing_subscription"
                    name="pricing"
                    value="subscription"
                    type="radio"
                    className="w-4 h-4 text-pink-600 transition duration-150 ease-in-out form-radio"
                  />
                  <label htmlFor="pricing_subscription" className="ml-3">
                    <span className="block text-sm font-medium leading-5 text-gray-700">
                      Premium Subscription
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="mt-4">
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Subtitle
              </label>
              <div className="rounded-md shadow-sm">
                <textarea
                  ref={register}
                  name="subtitle"
                  id="subtitle"
                  rows={3}
                  className="block w-full p-2 mt-1 transition duration-150 ease-in-out border form-textarea sm:text-sm sm:leading-5"
                  placeholder="My awesome subtitle"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium leading-5 text-gray-700">
                Cover photo
              </label>
              <input
                ref={hiddenFileInput}
                type="file"
                accept="image/*"
                style={{display: "none"}}
                onChange={e => {
                  if (!e.target.files) {
                    return;
                  }
                  // eslint-disable-next-line no-void
                  void handleFile(e.target.files[0]);
                }}
              />
              {editorImage ? (
                <div className="relative">
                  <div
                    role="button"
                    tabIndex={0}
                    className="w-full bg-gray-400 h-30 sm:h-64"
                    onKeyPress={handleClick}
                    onClick={handleClick}
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={editorImage}
                      alt="Editor image"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline"
                        onClick={handleClick}
                      >
                        Upload a file
                      </button>{" "}
                      or drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <div className="flex items-center justify-between py-2">
              <button
                type="button"
                className="flex justify-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-pink active:bg-pink-700"
                onClick={() => setEditorDelete(true)}
              >
                Delete
              </button>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-pink-400 transition duration-150 ease-in-out bg-white border border-pink-400 rounded-md hover:bg-pink-100 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700"
                  onClick={() => setEditorToolkit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-pink-600 border border-transparent rounded-md hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
