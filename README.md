# Lyrics API

A simple lyrics API that fetches lyrics from sources like Musixmatch and YouTube Music.

## Getting Started

### Requirements

- Node.js 18 or higher

### Installation

```bash
git clone https://github.com/lewdhutao/lyrics-api
cd lyrics-api
npm install
```

### Running

```bash
npm run dev
```

Once running, open: `http://localhost:3000`

---

## API Endpoints

### `/v2/musixmatch/lyrics`

Search for lyrics using Musixmatch.

**Method:** `GET`

**Query Parameters:**
- `trackId` (optional): Track Id
- `title` (optional): Song title
- `artist` (optional): Artist name
> ⚠️ **Note:** At least one of `title` or `trackid` must be provided. Both cannot be null or empty.

**Examples:**

```
GET /v2/musixmatch/lyrics?trackid=349001048
GET /v2/musixmatch/lyrics?title=back%20to%20friends
GET /v2/musixmatch/lyrics?title=back%20to%20friends&artist=sombr
```

### `/v2/musixmatch/recommendation`

Search for song recommendations.

**Method:** `GET`

**Query Parameters:**
- `country` (optional): Country code.

**Examples:**

```
GET /v2/musixmatch/recommendation
GET /v2/musixmatch/recommendation?country=us
```
Refer to [ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for full country codes.

### `/v2/musixmatch/metadata`

Retrieve metadata for up to five songs matching the given title.

**Method:** `GET`

**Query Parameters:**
- `title` (required): Song title.

**Examples:**

```
GET /v2/musixmatch/metadata?title=Maps
```

---

### `/v2/youtube/lyrics`

Search for lyrics using YouTube Music.

**Method:** `GET`

**Query Parameters:**
- `trackId` (optional): Track Id
- `title` (optional): Song title
- `artist` (optional): Artist name
> ⚠️ **Note:** At least one of `title` or `trackid` must be provided. Both cannot be null or empty.

**Examples:**

```
GET /v2/youtube/lyrics?trackid=dbEY-JVHJWg
GET /v2/youtube/lyrics?title=back%20to%20friends
GET /v2/youtube/lyrics?title=back%20to%20friends&artist=sombr
```

---

## Example JSON Response

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

---

## Translated Lyrics
### Note: Translated lyrics are only available for Musixmatch

**Examples:**

```
GET /v2/musixmatch/lyrics?trackid={trackId}&translate={lang_code}
GET /v2/musixmatch/lyrics?title={title}&translate={lang_code}
GET /v2/musixmatch/lyrics?title={title}&artist={artist}&translate={lang_code}
```

**Supported Languages**

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

---

## Status Codes

| Code | Description            |
|------|------------------------|
| 200  | OK                     |
| 400  | Bad Request            |
| 404  | Not Found              |
| 429  | Too Many Requests      |
| 500  | Internal Server Error  |

## Public API Demo

https://lyrics.lewdhutao.my.eu.org

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/LewdHuTao/lyrics-api&env[API_URL]=http://localhost:8888&env[NODE_ENV]=production&env[RATELIMIT]=false)

---

## License
ISC © 2025
