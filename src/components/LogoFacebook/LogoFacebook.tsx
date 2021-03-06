export interface Props {
  href: string;
}

export default function LogoFacebook({href}: Props): JSX.Element {
  return (
    <a
      href={`https://facebook.com/${href}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">Facebook</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1298"
        height="2500"
        viewBox="88.428 12.828 107.543 207.085"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
          fill="#3c5a9a"
        />
      </svg>
    </a>
  );
}
