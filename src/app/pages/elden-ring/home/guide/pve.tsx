import {styles, captionStyles } from "@/util/styles";

const PvE = ({
  isPvE,
  children,
}: {
  isPvE: boolean;
  children: React.ReactNode;
}) => {
  const className = styles(captionStyles);
  const text = `For ${isPvE ? "PvE" : "PvP"} Players`;

  return (
    <>
      <div className={className}>
        <p>{text}</p>
        <div id="multiplayer-icon">{children}</div>
      </div>
    </>
  );
};

export default PvE;