import {ChatWindow} from "@papercups-io/chat-widget";

export interface Props {
  isSales?: boolean;
}

export default function PapercupsWindow({isSales = false}: Props): JSX.Element {
  return (
    <div className="h-32 shadow-lg md:h-96 lg:h-128 xl:h-192 9 m-9 md:m-8 lg:m-10 xl:m-12">
      <ChatWindow
        accountId={process.env.NEXT_PUBLIC_PAPERCUPS_ID ?? ""}
        title={`Welcome to Sentrei ${isSales ? "Sales" : "Support"}`}
        subtitle="Ask us anything in the chat window below 😊"
        newMessagePlaceholder="Start typing ..."
        primaryColor="#ffa7d7"
        greeting="Hi there! How can we help you?"
        requireEmailUpfront={isSales}
      />
    </div>
  );
}
