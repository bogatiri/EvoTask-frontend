export const fetcher = (url: string) => fetch(`http://localhost:4201${url}`).then((res) => res.json())
