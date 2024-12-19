import { FunctionalComponent } from "vue";

interface ModalHeaderProps {
  title: string;
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = () => {
  return <div>ModalHeader</div>;
};

ModalHeader.displayName = "BasicModalHeader";