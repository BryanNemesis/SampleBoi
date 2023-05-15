type SampleBase = {
  name: string
  color: string
  mode: "ONESHOT" | "START_STOP"
}

export type SampleStub = SampleBase & {
  file?: File
}

export type Sample = SampleBase & {
  id: string
  file_url: string
  clicks: number
}
