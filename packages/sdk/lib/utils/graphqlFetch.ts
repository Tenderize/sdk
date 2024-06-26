// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const graphqlFetch = async (url: string, query: string, variables: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: variables ? JSON.stringify({ query, variables }) : JSON.stringify({ query }),
        });
        return (await response.json()).data;
    } catch (err) {
        console.log(err)
        throw err;
    }
}