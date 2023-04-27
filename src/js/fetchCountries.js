const searchParams = new URLSearchParams({
    fields: ["name","capital","population","flags","languages"],
  });
export default function fetchCountries(name){
    const url = `https://restcountries.com/v3.1/name/${name}?${searchParams}`
    return fetch(url)
        .then((response)=>{
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        // .catch(e => console.log(e))
}