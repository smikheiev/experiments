import { useEffect, useState } from 'react'

type Man = {
  name: string
  url: string
}

export default function People() {
  const [error, setError] = useState<Error | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [people, setPeople] = useState<Man[]>([])

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setPeople(result.results)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return (
    <ul>
      {people.map((man) => (
        <li key={man.name}>
          <a href={man.url}>{man.name}</a>
        </li>
      ))}
    </ul>
  )
}
