# *Ashley's Spotify Recs* API Documentation
*This API provides artists and songs that Ashley would recommend across a variety of genres*

## *Genre*
**Request Format:** *http:/localhost/8000/genre*

**Request Type:** *GET*

**Returned Data Format**: Plain Text

**Description:** *Provides all available genres names.*

**Example Request:** *http:/localhost/8000/genre*

**Example Response:**

```
Pop
Rap
EDM
R&B
Throwback
```

**Error Handling:**
- Possible 500 error (server error) error
  - If occurs returns an error with the message: 'Server error. Please try again later.'
  
## *Get Recommendation Genre*
**Request Format:** *http:/localhost/8000/getRecs/genre*

**Request Type:** *GET*

**Returned Data Format**: JSON

**Description:** *Provides information about specific genre including artists, songs, and description.*

**Example Request:** *http:/localhost/8000/getRecs/:genre*

**Example Response:**

```json
{
  "name": "Throwback",
  "artist": ["Usher", "Chris Brown", "Tamia", "Ne-Yo", "Kanye West", "Mariah Carey", "50 Cent"],
  "song": ["Confessions Part II", "Forever", "Into You", "Because of You", "All of the Lights", "We Belong Together", "21 Questions"],
  "description": "My personal fav. You can't go wrong with throwbacks especially from the early 2000s. Trust that these songs will be an instant hit once played."
}
```
**Error Handling:**
- Possible 400 (invalid request) error
  - If passed in an invalid genre, returns an error with the message: 'Invalid request. Genre not found please try another.'
- Possible 500 error (server error) error
  - If occurs returns an error with the message: 'Server error. Please try again later.'

