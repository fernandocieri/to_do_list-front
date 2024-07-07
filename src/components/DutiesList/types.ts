export interface DutyProps {
  id: string;
  name: string;
  done: boolean;
}

export interface DutiesListItemProps extends DutyProps {
  updateDutyCompletion: (id: string, done: boolean) => void;
  updateDutyName: (id: string, name: string) => void;
  removeDuty: (id: string) => void;
}
