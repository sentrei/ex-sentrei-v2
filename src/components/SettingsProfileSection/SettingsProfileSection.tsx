/* eslint-disable jsx-a11y/label-has-associated-control */

import {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {mutate} from "swr";

import ImageProfile from "@/components/ImageProfile";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import {updateProfile} from "@/services/Profile";
import Profile from "@/types/Profile";
import {getImageUrl} from "@/utils/image";

export default function SettingsProfileSection(): JSX.Element {
  const {authState} = useAuth();

  const {profile} = useProfile();

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
    if (!authState?.uid) {
      return null;
    }

    const imageUrl = await getImageUrl(file);

    await mutate(
      `profiles/${authState.uid}`,
      {...profile, image: imageUrl},
      false,
    );

    await updateProfile(authState?.uid, {image: imageUrl})
      .then(() =>
        toast.success("Success", {
          autoClose: 1500,
          draggable: false,
          hideProgressBar: true,
        }),
      )
      .catch((err: Error) => {
        toast.error(err.message);
      });

    await mutate(`profiles/${authState.uid}`);

    return null;
  };

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {register, handleSubmit, reset, formState} = useForm<
    Partial<Profile.Fields>
  >({
    defaultValues: {
      bio: profile?.bio,
      name: profile?.name,
      namespaceId: profile?.namespaceId,
    },
  });

  const onSubmit = async (data: Profile.Fields) => {
    if (!authState?.uid) {
      return null;
    }

    await mutate(`profiles/${authState.uid}`, data, false);

    await updateProfile(authState?.uid, data)
      .then(() =>
        toast.success("Success", {
          autoClose: 1500,
          draggable: false,
          hideProgressBar: true,
        }),
      )
      .catch((err: Error) => {
        toast.error(err.message);
      });
    await mutate(`profiles/${authState.uid}`);

    return null;
  };

  useEffect(() => {
    if (profile && !formState.isDirty) {
      reset({
        bio: profile?.bio,
        name: profile?.name,
        namespaceId: profile?.namespaceId,
      });
    }
  }, [reset, profile, formState.isDirty]);

  return (
    <div className="px-1 sm:px-2 md:px-3 md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h3>
          <p className="mt-1 text-sm leading-5 text-gray-600">
            This information will be public so be careful what you share!
          </p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-lg sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="profile_username"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Username
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                      https://sentrei.com/
                    </span>
                    <input
                      ref={register}
                      id="profile_username"
                      name="namespaceId"
                      className="flex-1 block w-full px-3 py-1 transition duration-150 ease-in-out border border-gray-300 rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
                      placeholder="shunkakinoki"
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="profile_name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <input
                      ref={register}
                      name="name"
                      id="name"
                      className="flex-1 block w-full px-3 py-1 transition duration-150 ease-in-out border border-gray-300 rounded-none form-input rounded-l-md rounded-r-md sm:text-sm sm:leading-5"
                      placeholder="Shun Kakinoki"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Bio
                </label>
                <div className="rounded-md shadow-sm">
                  <textarea
                    ref={register}
                    name="bio"
                    id="bio"
                    rows={3}
                    className="block w-full p-2 mt-1 transition duration-150 ease-in-out border form-textarea sm:text-sm sm:leading-5"
                    placeholder="you@example.com"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile.
                </p>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Photo
                </label>
                <div className="flex items-center mt-2">
                  <ImageProfile
                    image={profile?.image ?? null}
                    name={profile?.name ?? ""}
                  />
                  <span className="ml-5 rounded-md shadow-sm">
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
                    <button
                      type="button"
                      className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-pink-300 focus:shadow-outline-pink active:bg-gray-50 active:text-gray-800"
                      onClick={handleClick}
                    >
                      Change
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-pink-600 border border-transparent rounded-md hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
