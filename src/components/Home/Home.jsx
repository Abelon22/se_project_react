// components/Home/Home.jsx
import { Main } from "../Main/Main";
import { useModalContext } from "../../context/useModalContext";

export default function Home() {
  const { openItemView } = useModalContext();

  return <Main onCardClick={openItemView} />;
}
