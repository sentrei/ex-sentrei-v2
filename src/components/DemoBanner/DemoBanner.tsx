export default function DemoBanner(): JSX.Element {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-pink-400">
      <div className="max-w-screen-xl py-1 mx-auto sm:py-2 md:py-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 ">
            <span className="items-center flex-1 font-medium text-center text-white truncate">
              <div className="inline-flex ">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
                &nbsp;
                <p className="md:hidden">This is a demo screen!</p>
                <p className="hidden md:inline">
                  Attention! This is a demo screen!
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
