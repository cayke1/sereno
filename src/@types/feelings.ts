export enum emotion {
  JOY = "JOY",
  SADNESS = "SADNESS",
  ANGER = "ANGER",
  FEAR = "FEAR",
  ANXIETY = "ANXIETY",
  CALM = "CALM",
  FRUSTRATION = "FRUSTRATION",
  SURPRISE = "SURPRISE",
  NON_SPECIFIC = "NON_SPECIFIC",
}
export const emotionLabels: Record<emotion, string> = {
  [emotion.JOY]: "Alegria",
  [emotion.SADNESS]: "Tristeza",
  [emotion.ANGER]: "Raiva",
  [emotion.FEAR]: "Medo",
  [emotion.ANXIETY]: "Ansiedade",
  [emotion.CALM]: "Calma",
  [emotion.FRUSTRATION]: "Frustração",
  [emotion.SURPRISE]: "Surpresa",
  [emotion.NON_SPECIFIC]: "Não incluso",
};

export interface CreateFeelingDto {
  emotion: emotion;
  description?: string;
  createdAt: Date | string;
  intensity: number;
  userId: string;
  trigger?: string;
}

export interface Feeling {
  id: string;
  emotion: emotion;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  trigger?: string;
  intensity: number;
  userId: string;
}
