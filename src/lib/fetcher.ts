export const fetcher = (url: string) => fetch(`http://192.168.0.7:4201${url}`).then((res) => res.json())
