type Props = {
  text: string;
};

export const ErrorMessageForForm = ({ text }: Props) => {
  return <p className="text-red-400">{text}</p>;
};
