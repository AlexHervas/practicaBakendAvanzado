# Nodepop Fundamentos

## Deploy

### Install dependencies

```sh
npm install
```

### Configure

Copy .env.example to .env and review your config.

### Init database

**Only** on first deploy:

```sh
npm run initDB
```

## Start

To start a single instance:

```sh
npm start
```

To start in development mode:

```sh
npm run dev
```

## References

### UI fragments

- https://getbootstrap.com/docs/5.3/examples/
- https://getbootstrap.com/docs/5.3/examples/headers/
- https://getbootstrap.com/docs/5.3/forms/form-control/
- https://icons.getbootstrap.com/#install

## API

Base url: http://localhost:3000/api

### Product list

GET /api/products

``` json
{
  "result": [
    {
      "_id": "67895ebafad0445cbc354eab",
      "name": "Bicicleta",
      "owner": "67895ebafad0445cbc354ea5",
      "price": 23015,
      "image": "bici.jpg",
      "tags": [
        "lifestyle",
        "motor"
      ],
      "__v": 0
    },
    // ...
  ],
  "count": 6
}
```