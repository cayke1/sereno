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
