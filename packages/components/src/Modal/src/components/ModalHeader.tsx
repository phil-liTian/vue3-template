import { FunctionalComponent } from "vue";

interface ModalHeaderProps {
  title: string;
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = (props) => {
  return <p-basic-title>{props.title}</p-basic-title>;
};

ModalHeader.displayName = "BasicModalHeader";