export interface Props {
  bio: string;
  image: string;
}

export default function BlogAuthor({bio, image}: Props): JSX.Element {
  return (
    <div className="flex justify-start mt-6 align-middle ">
      <div className="flex-initial px-4 py-2 m-2 text-center ">
        <img
          className="inline object-cover w-12 h-12 mr-2 rounded-full"
          src={image}
          alt="Blog Author"
        />
      </div>
      <div className="flex-initial w-1/3 px-4 py-2 m-2 text-center text-gray-600">
        <h4 className="text-lg text-center md:text-left ">{bio}</h4>
      </div>
    </div>
  );
}
