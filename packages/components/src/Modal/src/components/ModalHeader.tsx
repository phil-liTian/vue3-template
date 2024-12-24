import { propTypes } from "@phil/types";
import { FunctionalComponent } from "vue";

interface ModalHeaderProps {
  title: string | string[]
  helpMessage: string;
}

export const ModalHeader: FunctionalComponent<ModalHeaderProps> = (props) => {

  return <p-basic-title helpMessage={props.helpMessage}>
    {props.title || '标题'}
  </p-basic-title>;
};

ModalHeader.displayName = "BasicModalHeader";