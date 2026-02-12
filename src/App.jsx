import { useEffect, useState } from 'react'
import './App.css'

function App() {

  /************
      HOOK
  *************/
  const [query, setQuery] = useState("");                       // Hook di stato che contiene l'input dell'utente
  const [suggestionsList, setsuggestionsList]= useState([])     // Hook di stato che contiene la lista di suggerimenti
  console.log(suggestionsList);

  /* Hook di effetto che viene eseguito ogni volta che cambia la query
  e richiama la funzione per recuperare i suggerimenti */
  useEffect( () => {
    fetchSuggestions(query);
  }, [query]);

  /************
      RENDER
  *************/
  return (

      <div className="container">

        {/* Input di ricerca */}
        <input
          type="text"
          placeholder='Cerca un prodotto...'
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input"
        />

        {/* Lista suggerimenti */}
        {suggestionsList.length > 0 && (
        <div className="suggestions-container">
            <ul>
              {suggestionsList.map(suggestion => (
                <li key={suggestion.id} className="suggestion-item">
                  <span className="icon">🔍</span>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
  )

  /**************
      FUNZIONI
  ***************/

  // Funzione che recupera i suggerimenti in base al testo digitato
  async function fetchSuggestions(query) {

    // Se l'input non è vuoto, aggiorna lo stato con i risultati
    if (query.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:3333/products?search=${query}`)
        const data = await response.json()
        setsuggestionsList(data);
      }
      catch (error) {
        console.error(error)
      }
    }

    // Se l'input è vuoto, svuota la lista dei suggerimenti    
    else {
      setsuggestionsList([]);
    } 
  }
}
  
export default App;
