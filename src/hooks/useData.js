import {  useQuery } from "@tanstack/react-query"
import { fetchPhotos } from "../api"

const useData = ({ perPage = 30, page = 1 }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["query", `${page}`],
        queryFn: () => queryData({ perPage: perPage, page: page }),
        enabled: true,
    })

    return { data, isLoading, isError } 
}

const queryData = async ({ perPage, page }) => {
    const data = await fetchPhotos({ perPage: perPage, page: page })
    return data
}

export default useData