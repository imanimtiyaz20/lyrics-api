# Lyrics API — v2

**Lyrics API v2** is a Java-based API that fetches and serves song lyrics from multiple sources.

## Features
- **Multiple Sources**:
    - YouTube
    - Musixmatch
- **Fast & Lightweight**: Fully implemented in Java for speed and stability.
- **Easy Integration**: Simple REST endpoints for quick adoption into any app or service.

## Installation & Setup
1. **Download the Latest Release**
    - Go to the [Releases](../../releases) page.
    - Download the latest `LyricsApi.jar` file.

2. **Run the API**
   ```bash
   java -jar LyricsApi.jar
   ```
   **Run the API with custom port**
    ```bash
   java -jar LyricsApi.jar --server.port={port}
   ```

**Parameters**:

| Name             | Type    | Required  | Description                                           |
|------------------|---------|-----------|-------------------------------------------------------|
| `platform`       | String  | Yes       | Platform to fetch from (`youtube` or `musixmatch`)    |
| `title`          | String  | No        | Title of the song                                     |
| `trackid`        | String  | No        | TrackId of the song                                   |
| `artist`         | String  | No        | Artist name                                           |
| `translate`      | String  | No        | Language Code (Only for Musixmatch)                   |
| `recommendation` | boolean | No        | Search for recommendation track (Only for Musixmatch) |
| `country`        | String  | No        | Search for recommendation track (Only for Musixmatch) |                                               

> ⚠️ **Note:** At least one of `title` or `trackid` must be provided. Both cannot be null or empty.

## `Endpoint: /api/v2/lyrics`
### **Get Lyrics**
Without trackId paramater
```http
GET http://localhost:8888/api/v2/lyrics?platform={platform}&title={title}&artist={artist}
```
With trackId parameter
```http
GET http://localhost:8888/api/v2/lyrics?platform={platform}&trackid={trackId}
```

### **Get Translated Lyrics**

**⚠️ Note: Translation features are currently available only on Musixmatch.**

**Support for other platforms may be added in future updates.**

**Can use trackId, title, and artist parameters.**

Without trackId (Can be only the title, and both the title and artist)
```http
GET http://localhost:8888/api/v2/lyrics?platform=musixmatch&title={title}&artist={artist}&translate={lang_code}
```
With trackId
```http
GET http://localhost:8888/api/v2/lyrics?platform=musixmatch&trackid={trackId}&translate={lang_code}
```
**Available language codes**

<details>
<summary>Click to expand full list</summary>

| Language Name    | ISO-1 | ISO-3 |
|------------------|----|-----|
| Afar             | aa | aar |
| Abkhazian        | ab | abk |
| Afrikaans        | af | afr |
| Akan             | ak | aka |
| Albanian         | sq | sqi |
| Amharic          | am | amh |
| Arabic           | ar | ara |
| Aragonese        | an | arg |
| Armenian         | hy | hye |
| Assamese         | as | asm |
| Asturian         | a3 | ast |
| Avaric           | av | ava |
| Avestan          | ae | ave |
| Aymara           | ay | aym |
| Azerbaijani      | az | aze |
| Bashkir          | ba | bak |
| Bambara          | bm | bam |
| Basque           | eu | eus |
| Belarusian       | be | bel |
| Bengali          | bn | ben |
| Bihari Languages | bh | bh0 |
| Bislama          | bi | bis |
| Bosnian          | bs | bos |
| Breton           | br | bre |
| Bulgarian        | bg | bul |
| Burmese          | my | mya |
| Catalan          | ca | cat |
| Cebuano          | c2 | ceb |
| Chamorro         | ch | cha |
| Chechen          | ce | che |
| Chinese (Simplified) | zh | zho |
| Church Slavic    | cu | chu |
| Chuvash          | cv | chv |
| Cornish          | kw | cor |
| Corsican         | co | cos |
| Czech            | cs | ces |
| Danish           | da | dan |
| Divehi           | dv | div |
| Dutch            | nl | nld |
| Dzongkha         | dz | dzo |
| English          | en | eng |
| Esperanto        | eo | epo |
| Estonian         | et | est |
| Fijian           | fj | fij |
| Filipino         | f1 | fil |
| Finnish          | fi | fin |
| French           | fr | fra |
| German           | de | deu |
| Greek            | el | ell |
| Gujarati         | gu | guj |
| Hebrew           | he | heb |
| Hindi            | hi | hin |
| Hungarian        | hu | hun |
| Icelandic        | is | isl |
| Indonesian       | id | ind |
| Italian          | it | ita |
| Japanese         | ja | jpn |
| Japanese (Romanized) | rj | rja |
| Korean**         | ko | kor |
| Korean (Romanized) | rk | rkr |
| Khmer, Central   | km | khm |
| Lao              | lo | lao |
| Latin            | la | lat |
| Lithuanian       | lt | lit |
| Macedonian       | mk | mkd |
| Malay            | ms | msa |
| Malayalam        | ml | mal |
| Malayalam (Romanized) | m8 | ma8 |
| Marathi          | mr | mar |
| Marathi (Romanized) | m9 | ma9 |
| Mongolian        | mn | mon |
| Nepali           | ne | nep |
| Nepali (Romanized) | n5 | ne5 |
| Norwegian        | no | nor |
| Oriya            | or | ori |
| Oriya (Romanized) | o1 | or1 |
| Panjabi          | pa | pan |
| Panjabi (Romanized) | p5 | pa5 |
| Persian          | fa | fas |
| Polish           | pl | pol |
| Portuguese       | pt | por |
| Romanian         | ro | ron |
| Russian       | ru | rus |
| Russian (Romanized) | r2 | ru2 |
| Sanskrit         | sa | san |
| Sanskrit (Romanized) | s4 | sa4 |
| Serbian          | sr | srp |
| Sinhala          | si | sin |
| Slovak           | sk | slk |
| Slovenian        | sl | slv |
| Spanish          | es | spa |
| Swahili          | sw | swa |
| Swedish          | sv | swe |
| Tamil            | ta | tam |
| Tamil (Romanized) | t2 | ta2 |
| Telugu           | te | tel |
| Telugu (Romanized) | t3 | te3 |
| Thai             | th | tha |
| Thai (Romanized) | t4 | tr1 |
| Turkish          | tr | tur |
| Ukrainian        | uk | ukr |
| Urdu             | ur | urd |
| Urdu (Romanized) | u1 | ur1 |
| Uzbek            | uz | uzb |
| Vietnamese       | vi | vie |
| Welsh            | cy | cym |
| Xhosa            | xh | xho |
| Yoruba           | yo | yor |
| Zulu             | zu | zul |

</details>

## `Endpoint: /api/v2/metadata`
This endpoint returns only track metadata (no lyrics).  
Currently, it is only supported by Musixmatch.

### **Get Track Recommendation**
- **Without country**
```http
GET http://localhost:8888/api/v2/metadata?platform=musixmatch&recommendation=true
```
- **With country**

Refer to [ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for full country codes.
```http
GET http://localhost:8888/api/v2/metadata?platform=musixmatch&recommendation=true&country={country}
```

### **Search Track**
This endpoint searches for tracks and returns up to 5 results.
```http
GET http://localhost:8888/api/v2/metadata?platform=musixmatch&title={title}
```

## **Sample Response**:
```json
{
  "data": {
    "artistName": "Sombr",
    "trackName": "Back to Friends",
    "trackId": "dbEY-JVHJWg",
    "searchEngine": "YouTube",
    "artworkUrl": "https://example.com/art.jpg",
    "lyrics": "Touch my body tender\n'Cause the feeling makes me weak..."
  },
  "metadata": {
    "apiVersion": "2.0"
  }
}
```

## **Enable Rate Limit and IP Block**:
Rename `application.yml.example` to `application.yml`.

```yaml
settings:
  # Enable IP blocking to allow requests only from specific IP addresses.
  ip-block: false
  # List of IP addresses allowed to access the API when IP blocking is enabled.
  allowed-ip:
  - 127.0.0.1
  # Rate limiting configuration
  # Set 'enabled' to true to limit the number of requests per IP.
  # 'req-per-minute' defines how many requests an IP can make per minute.
  rate-limit:
    enabled: false
    req-per-minute: 10
```