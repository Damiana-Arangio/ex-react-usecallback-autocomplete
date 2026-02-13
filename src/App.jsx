import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {

  /************
      HOOK
  *************/
  const [query, setQuery] = useState("");                       // Hook di stato che contiene il testo digitato dall’utente nell’input
  const [suggestionsList, setsuggestionsList] = useState([])    // Hook di stato che contiene la lista di suggerimenti restituiti dall’API

  /* Hook di effetto che richiama la funzione debouncedFetchSuggestions 
     ogni volta che cambia la query */
  useEffect(() => {
    debouncedFetchSuggestions(query);
  }, [query]);


  /************
     FUNZIONI
  *************/
  // Memorizza la funzione restituita da debounce
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300)
    , []);

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
          onChange={(e) => setQuery(e.target.value)}
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

  // Recupera i suggerimenti dall’API in base alla query
  async function fetchSuggestions(query) {

    // Se l'input è pieno, aggiorna lo stato con i risultati ottenuti
    if (query.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:3333/products?search=${query}`)
        const data = await response.json()
        setsuggestionsList(data);
        console.log("Chiamata API effettuata!")
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

  /* Funzione debounce generica.
     Ritarda l’esecuzione della callback finché non trascorre il delay
     senza ulteriori chiamate. */
  function debounce(callback, delay) {
    let timer;

    return (value) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }
}
  
export default App;
