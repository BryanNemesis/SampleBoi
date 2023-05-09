export default interface Sample {
    name: string
    id: string
    file_url: string
    color: string
    mode: "ONESHOT" | "START_STOP"
    clicks: number
}