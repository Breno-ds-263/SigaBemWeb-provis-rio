export type DisabilityType = 'FISICA' | 'VISUAL' | 'AUDITIVA' | 'INTELECTUAL' | 'MULTIPLA';
export type NotificationType = 'mudanca' | 'itinerario' | 'aviso' | 'educativa';

export interface Feedback {
  id: number;
  line: string;
  date: string;
  disability: DisabilityType;
  gender: 'M' | 'F';
  message: string;
  type: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  line: string;
  date: string;
}
