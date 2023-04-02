export default interface Sample {
    name: string
    id: string
    file_url: string
    color: string
    mode: "oneshot" | "start/stop"
    clicks: number
}