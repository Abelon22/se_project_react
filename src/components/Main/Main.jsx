import { MainGallery } from "../MainGallery/MainGallery";
import { useModalContext } from "../../context/useModalContext";

export default function Main() {
  const { openItemView } = useModalContext();

  return <MainGallery onCardClick={openItemView} />;
}
