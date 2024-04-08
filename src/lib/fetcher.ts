export const fetcher = (url: string) => fetch(`http://localhost:4200${url}`).then((res) => res.json())
